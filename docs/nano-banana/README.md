# Nano Banana CLI

`nb.py` makes the scroll-transition assets in this folder via the Gemini API: Nano Banana for the images, Veo for the video. It needs only the Python standard library (run it with `uv`) plus `ffmpeg`. `PROMPTS.md` describes the manual route through the Gemini app; this CLI does the same thing in one command.

## One-time setup

1. Create a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). The project behind it needs billing enabled, because these models have no free tier. New keys start with `AQ.` and are 53 characters long (older ones: `AIza`, 39). The key of this project is called «Twelve Balloons nb.py», in project Social-Media of michele@romano.ch.
2. Copy it, then run `uv run docs/nano-banana/nb.py key`. The script reads the clipboard, stores the key in `~/.config/gemini/api_key` (chmod 600, outside the repo), clears the clipboard and checks the key with a free call.

## Run

```bash
uv run docs/nano-banana/nb.py all
```

This makes three files, and asks y/N with the price before anything is sent:

| File | What | Default | Price |
|---|---|---|---|
| `A_wide.png` | `A_sky-without-balloons.png` extended to 16:9 | Nano Banana 2.1, 2K | $0.05 |
| `B_meadow-in-bloom.png` | `A_wide` in bloom | Nano Banana 2.1, 2K | $0.05 |
| `transition.mp4` | first frame A_wide, last frame B, no audio | Veo 3.1 Fast, 1080p, 8 s | $0.96 |

Prices are the standard tier from [the pricing page](https://ai.google.dev/gemini-api/docs/pricing) on 15.10.2026, and you are charged only when a call succeeds.

**Why 16:9 and 8 s, not square and 5 s:** Veo only does 16:9 or 9:16, and only 4, 6 or 8 s. 1080p needs 8 s. The background is `object-cover` across the viewport anyway, so 16:9 fits desktop better. Veo always adds audio, and the script strips it with ffmpeg.

## Single steps and retakes

```bash
uv run docs/nano-banana/nb.py image docs/nano-banana/prompts/B_meadow-in-bloom.txt docs/nano-banana/A_wide.png docs/nano-banana/B_meadow-in-bloom.png
uv run docs/nano-banana/nb.py video docs/nano-banana/prompts/transition.txt docs/nano-banana/A_wide.png docs/nano-banana/B_meadow-in-bloom.png docs/nano-banana/transition.mp4
```

Options: `--size 1K|2K|4K` and `--model gemini-3-pro-image` for images; `--model fast|standard|lite` and `--res 720p|1080p|4k` for video; `-y` skips the price prompt.

- **Regenerate, don't correct.** Every edit re-renders the whole picture. If a result is off, change the prompt file and run again. The script never overwrites a file. A new take lands next to the old one as `….v2.png`, so you pick the best one and rename it.
- **Prompts are PRESERVE / CHANGE / NO** (`prompts/*.txt`). Too many flowers? Add *"fewer flowers, smaller, more delicate, like dots of watercolour"* to CHANGE.
- **If a video job gets interrupted,** don't start a new one, because that pays again. Run the same `video` command with `--resume` instead. Veo keeps the result for 2 days.
- **Cost log:** every successful (= billed) call appends one line to `costs.jsonl` (time, model, size, list price, output file, prompt). `uv run docs/nano-banana/nb.py costs` lists them with the total. The actual bill is under AI Studio → Spend.
- `uv run docs/nano-banana/nb.py check` shows for free whether the key works and which models it can see.
- **Take 2 (16.10.2026):** timeline and prompts in `SCRIPT.md`. `transition_reveal.mp4` is a free alternative from ffmpeg (a soft wipe from A to B rising from the bottom, strictly monotonic):
  `ffmpeg -loop 1 -t 8 -framerate 24 -i A_wide.png -loop 1 -t 8 -framerate 24 -i B_meadow-in-bloom.png -filter_complex "[0]scale=1920:1080,format=yuv420p[a];[1]scale=1920:1080,format=yuv420p[b];[a][b]xfade=transition=smoothup:duration=8:offset=0" -c:v libx264 -crf 18 -an transition_reveal.mp4`
- **Veo REST pitfalls (the docs are wrong here):** frames as `{"bytesBase64Encoded", "mimeType"}` (not `inlineData`), `durationSeconds` as a number, no `numberOfVideos`.
