#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# ///
"""Nano Banana (Gemini image) + Veo (video) CLI for the Twelve Balloons background.

Standard library only. Key lives in ~/.config/gemini/api_key (never in the repo).
Every paid call shows model, size and price first and asks y/N.

  uv run docs/nano-banana/nb.py key        # store key from clipboard, then check
  uv run docs/nano-banana/nb.py check      # free: is the key valid, are the models there?
  uv run docs/nano-banana/nb.py costs      # logged paid calls + total (costs.jsonl)
  uv run docs/nano-banana/nb.py all        # A_wide -> B_meadow-in-bloom -> transition.mp4
  uv run docs/nano-banana/nb.py image  PROMPT.txt IN.png OUT.png [--size 2K] [--aspect 16:9]
  uv run docs/nano-banana/nb.py video  PROMPT.txt FIRST.png LAST.png OUT.mp4 [--model fast]
"""

import argparse
import base64
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
KEY_FILE = Path.home() / ".config" / "gemini" / "api_key"
API = "https://generativelanguage.googleapis.com/v1beta"

IMAGE_MODELS = {
    # model id -> price per image by size (USD, standard tier, ai.google.dev/gemini-api/docs/pricing, 15.10.2026)
    "gemini-nano-banana-2.1": {"1K": 0.0336, "2K": 0.0504, "4K": 0.113},
    "gemini-3-pro-image": {"1K": 0.134, "2K": 0.134, "4K": 0.24},
}
VIDEO_MODELS = {
    # alias -> (model id, price per second by resolution)
    "fast": ("veo-3.1-fast-generate-preview", {"720p": 0.10, "1080p": 0.12, "4k": 0.30}),
    "standard": ("veo-3.1-generate-preview", {"720p": 0.40, "1080p": 0.40, "4k": 0.60}),
    "lite": ("veo-3.1-lite-generate-preview", {"720p": 0.05, "1080p": 0.08}),
}
LAST_OP = HERE / ".last-video-op"
COST_LOG = HERE / "costs.jsonl"  # one line per successful (= billed) call, append-only


# ---------- plumbing ----------

def key() -> str:
    k = os.environ.get("GEMINI_API_KEY") or (KEY_FILE.read_text().strip() if KEY_FILE.exists() else "")
    if not k:
        sys.exit(f"No API key. Run: uv run {Path(__file__).name} key")
    return k


def call(method: str, url: str, body: dict | None = None, timeout: int = 300) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"x-goog-api-key": key(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        raise ApiError(e.code, e.read().decode(errors="replace")[:2000]) from None


class ApiError(Exception):
    def __init__(self, code: int, text: str):
        super().__init__(f"HTTP {code}: {text}")
        self.code = code


def b64(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode()


def mime(path: Path) -> str:
    return "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"


def free_path(p: Path) -> Path:
    """Never overwrite: regenerate instead of correct, keep every take."""
    if not p.exists():
        return p
    n = 2
    while (q := p.with_name(f"{p.stem}.v{n}{p.suffix}")).exists():
        n += 1
    return q


def confirm(lines: list[str], total: float, yes: bool) -> None:
    print("\n".join(lines))
    print(f"  ≈ ${total:.2f} total (charged only on success)")
    if yes:
        return
    if input("Run? [y/N] ").strip().lower() not in ("y", "j", "yes", "ja"):
        sys.exit("Cancelled, nothing sent.")


def find_images(obj) -> list[str]:
    """Collect base64 image payloads from either response shape
    (interactions: steps[].content[] {type:image,data} / output_image.data;
     generateContent: candidates[].content.parts[].inlineData.data)."""
    found = []
    if isinstance(obj, dict):
        d = obj.get("data")
        is_img = obj.get("type") == "image" or str(obj.get("mime_type") or obj.get("mimeType") or "").startswith("image/")
        if isinstance(d, str) and len(d) > 1000 and is_img:
            found.append(d)
        for v in obj.values():
            found += find_images(v)
    elif isinstance(obj, list):
        for v in obj:
            found += find_images(v)
    return found


def strip_b64(obj):
    if isinstance(obj, dict):
        return {k: (f"<{len(v)} chars>" if isinstance(v, str) and len(v) > 500 else strip_b64(v)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [strip_b64(v) for v in obj]
    return obj


def log_cost(kind: str, model: str, spec: str, usd: float, out: Path, prompt: Path, usage=None) -> None:
    entry = {"ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"), "kind": kind, "model": model, "spec": spec,
             "usd_est": round(usd, 4), "out": out.name, "prompt": prompt.name,
             "prompt_text": prompt.read_text().strip()}  # the exact wording of this take, files get edited later
    if usage:
        entry["usage"] = usage
    with COST_LOG.open("a") as f:
        f.write(json.dumps(entry) + "\n")
    print(f"  cost ≈ ${usd:.3f} · running total ≈ ${total_cost():.2f} ({COST_LOG.name})")


def total_cost() -> float:
    if not COST_LOG.exists():
        return 0.0
    return sum(json.loads(l)["usd_est"] for l in COST_LOG.read_text().splitlines() if l.strip())


# ---------- commands ----------

def cmd_costs(_):
    if not COST_LOG.exists():
        print("No paid calls yet.")
        return
    rows = [json.loads(l) for l in COST_LOG.read_text().splitlines() if l.strip()]
    for r in rows:
        print(f"{r['ts'][:16]}  {r['kind']:5}  {r['model']:32} {r['spec']:12} ${r['usd_est']:.3f}  {r['out']}")
    print(f"{len(rows)} calls · total ≈ ${sum(r['usd_est'] for r in rows):.2f} (list prices, standard tier; actual bill: AI Studio → Spend)")


def cmd_key(_):
    raw = subprocess.run(["pbpaste"], capture_output=True, text=True).stdout
    k = raw.strip().strip("'\"").replace("\n", "")
    if k.startswith("GOCSPX-"):
        sys.exit("That is an OAuth CLIENT SECRET (GOCSPX-…), not an API key. Copy the key from aistudio.google.com/apikey.")
    # Two shapes: classic AIza… (39 chars) and the newer AQ.… (53 chars, seen 15.10.2026).
    if not ((k.startswith("AIza") and len(k) == 39) or (k.startswith("AQ.") and 45 <= len(k) <= 80)) or " " in k:
        sys.exit(f"Clipboard does not look like a Gemini API key (expected AQ.… ~53 or AIza… 39 chars; got {len(k)} chars). Nothing stored.")
    print(f"Found: {k[:6]}…{k[-4:]} ({len(k)} chars)")
    KEY_FILE.parent.mkdir(parents=True, exist_ok=True)
    KEY_FILE.write_text(k + "\n")
    KEY_FILE.chmod(0o600)
    KEY_FILE.parent.chmod(0o700)
    subprocess.run(["pbcopy"], input="", text=True)  # clear the clipboard
    print(f"Stored in {KEY_FILE} (chmod 600), clipboard cleared.\n")
    cmd_check(None)


def cmd_check(_):
    models, token = [], ""
    while True:
        r = call("GET", f"{API}/models?pageSize=1000" + (f"&pageToken={token}" if token else ""))
        models += [m["name"].removeprefix("models/") for m in r.get("models", [])]
        token = r.get("nextPageToken")
        if not token:
            break
    print(f"Key works ✅ ({len(models)} models visible)")
    for m in list(IMAGE_MODELS) + [v[0] for v in VIDEO_MODELS.values()]:
        print(f"  {'✓' if m in models else '✗'} {m}")
    known = set(IMAGE_MODELS) | {v[0] for v in VIDEO_MODELS.values()}
    extra = sorted(m for m in models if ("image" in m or "veo" in m or "banana" in m) and m not in known)
    if extra:
        print("  other image/video models:", ", ".join(extra))
    print("Note: billing is only proven by the first paid call (no free tier for these models).")


def image_cost(model: str, size: str) -> float:
    return IMAGE_MODELS[model][size]


def gen_image(prompt: Path, src: Path, out: Path, model: str, size: str, aspect: str) -> Path:
    text = prompt.read_text().strip()
    body = {
        "model": model,
        "input": [{"type": "text", "text": text},
                  {"type": "image", "mime_type": mime(src), "data": b64(src)}],
        "response_format": {"type": "image", "aspect_ratio": aspect, "image_size": size},
    }
    print(f"→ {model} {size} {aspect}: {src.name} → {out.name} …", flush=True)
    t = time.time()
    try:
        r = call("POST", f"{API}/interactions", body)
    except ApiError as e:
        if e.code != 404:
            raise
        # Fallback: classic generateContent, in case interactions is not enabled for this key/model.
        r = call("POST", f"{API}/models/{model}:generateContent", {
            "contents": [{"parts": [{"text": text}, {"inline_data": {"mime_type": mime(src), "data": b64(src)}}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": aspect, "imageSize": size}},
        })
    imgs = find_images(r)
    if not imgs:
        sys.exit("No image in response:\n" + json.dumps(strip_b64(r), indent=2)[:3000])
    out = free_path(out)
    out.write_bytes(base64.b64decode(imgs[-1]))
    dims = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(out)], capture_output=True, text=True).stdout
    wh = "×".join(l.split()[-1] for l in dims.splitlines()[1:])
    print(f"  saved {out.relative_to(HERE.parent.parent) if out.is_relative_to(HERE.parent.parent) else out} ({wh}, {time.time() - t:.0f}s)")
    usage = r.get("usage") or r.get("usageMetadata")
    log_cost("image", model, f"{size} {aspect}", image_cost(model, size), out, prompt, usage)
    return out


def gen_video(prompt: Path, first: Path, last: Path, out: Path, alias: str, res: str, secs: str, resume: str | None) -> Path:
    model, price = VIDEO_MODELS[alias]
    if resume:
        op = resume
    else:
        body = {
            "instances": [{
                "prompt": prompt.read_text().strip(),
                # Veo REST wants bytesBase64Encoded; the docs' inlineData example returns 400 (15.10.2026).
                "image": {"bytesBase64Encoded": b64(first), "mimeType": mime(first)},
                "lastFrame": {"bytesBase64Encoded": b64(last), "mimeType": mime(last)},
            }],
            "parameters": {"aspectRatio": "16:9", "resolution": res, "durationSeconds": int(secs),  # number, despite docs saying string
                           "personGeneration": "allow_adult"},  # numberOfVideos -> 400 on Veo 3.1
        }
        print(f"→ {model} {res} {secs}s: {first.name} → {last.name} …", flush=True)
        op = call("POST", f"{API}/models/{model}:predictLongRunning", body)["name"]
        LAST_OP.write_text(op + "\n")  # if interrupted: nb.py video --resume
    t = time.time()
    while True:
        s = call("GET", f"{API}/{op}")
        if s.get("done"):
            break
        print(f"  … rendering ({time.time() - t:.0f}s)", flush=True)
        time.sleep(10)
    if "error" in s:
        sys.exit("Video failed: " + json.dumps(s["error"]))
    try:
        uri = s["response"]["generateVideoResponse"]["generatedSamples"][0]["video"]["uri"]
    except (KeyError, IndexError):
        sys.exit("No video in response (filtered?):\n" + json.dumps(strip_b64(s), indent=2)[:3000])
    out = free_path(out)
    log_cost("video", model, f"{res} {secs}s", price[res] * int(secs), out, prompt)  # billed once generated, log before download
    raw = out.with_suffix(".with-audio.mp4")
    req = urllib.request.Request(uri, headers={"x-goog-api-key": key()})
    with urllib.request.urlopen(req, timeout=300) as r, open(raw, "wb") as f:
        shutil.copyfileobj(r, f)
    # Veo always adds audio; the site needs none.
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(raw), "-an", "-c:v", "copy", str(out)], check=True)
    raw.unlink()
    LAST_OP.unlink(missing_ok=True)
    print(f"  saved {out.name} (no audio)")
    return out


def cmd_image(a):
    confirm([f"Image: {a.model} {a.size} {a.aspect} → ${image_cost(a.model, a.size):.3f}"], image_cost(a.model, a.size), a.yes)
    gen_image(Path(a.prompt), Path(a.input), Path(a.output), a.model, a.size, a.aspect)


def cmd_video(a):
    model, price = VIDEO_MODELS[a.model]
    cost = price[a.res] * int(a.secs)
    if not a.resume:
        confirm([f"Video: {model} {a.res} {a.secs}s → ${cost:.2f}"], cost, a.yes)
    gen_video(Path(a.prompt), Path(a.first), Path(a.last), Path(a.output), a.model, a.res, a.secs, a.resume)


def cmd_all(a):
    model, price = VIDEO_MODELS[a.video_model]
    ic, vc = image_cost(a.image_model, a.size), price[a.res] * int(a.secs)
    confirm([
        f"1) A_wide.png            {a.image_model} {a.size} 16:9   ${ic:.3f}",
        f"2) B_meadow-in-bloom.png {a.image_model} {a.size} 16:9   ${ic:.3f}",
        f"3) transition.mp4        {model} {a.res} {a.secs}s   ${vc:.2f}",
    ], 2 * ic + vc, a.yes)
    p = HERE / "prompts"
    wide = gen_image(p / "A_wide.txt", HERE / "A_sky-without-balloons.png", HERE / "A_wide.png", a.image_model, a.size, "16:9")
    bloom = gen_image(p / "B_meadow-in-bloom.txt", wide, HERE / "B_meadow-in-bloom.png", a.image_model, a.size, "16:9")
    gen_video(p / "transition.txt", wide, bloom, HERE / "transition.mp4", a.video_model, a.res, a.secs, None)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("key", help="store key from clipboard (AQ.… or AIza…) and check it").set_defaults(f=cmd_key)
    sub.add_parser("check", help="free call: key valid, models available").set_defaults(f=cmd_check)
    sub.add_parser("costs", help="list logged paid calls and the total").set_defaults(f=cmd_costs)

    def img_opts(p, size="--size", model="--model"):
        p.add_argument(size, default="2K", choices=["1K", "2K", "4K"])
        p.add_argument(model, default="gemini-nano-banana-2.1", choices=list(IMAGE_MODELS))

    def vid_opts(p, model="--model"):
        p.add_argument(model, default="fast", choices=list(VIDEO_MODELS))
        p.add_argument("--res", default="1080p", choices=["720p", "1080p", "4k"])
        p.add_argument("--secs", default="8", choices=["4", "6", "8"])

    i = sub.add_parser("image", help="prompt + input image → image")
    i.add_argument("prompt"); i.add_argument("input"); i.add_argument("output")
    img_opts(i); i.add_argument("--aspect", default="16:9")
    i.set_defaults(f=cmd_image)

    v = sub.add_parser("video", help="prompt + first/last frame → mp4 (no audio)")
    v.add_argument("prompt"); v.add_argument("first"); v.add_argument("last"); v.add_argument("output")
    vid_opts(v)
    v.add_argument("--resume", nargs="?", const=LAST_OP.read_text().strip() if LAST_OP.exists() else None,
                   help="fetch an interrupted job (default: the last one) instead of starting a new one")
    v.set_defaults(f=cmd_video)

    al = sub.add_parser("all", help="A_wide → B_meadow-in-bloom → transition.mp4")
    img_opts(al, model="--image-model"); vid_opts(al, model="--video-model")
    al.set_defaults(f=cmd_all)

    for p in (i, v, al):
        p.add_argument("-y", "--yes", action="store_true", help="skip the y/N cost prompt")
    a = ap.parse_args()
    if getattr(a, "res", None) and a.res != "720p" and a.secs != "8":
        sys.exit("Veo: 1080p and 4k need --secs 8.")
    if getattr(a, "model", None) == "lite" and getattr(a, "res", None) == "4k":
        sys.exit("Veo Lite has no 4k.")
    try:
        a.f(a)
    except ApiError as e:
        sys.exit(str(e))


if __name__ == "__main__":
    main()
