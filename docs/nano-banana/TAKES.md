# Takes log: meadow in bloom

One entry per take: what we asked for, what came out, what it cost, and the verdict. The exact prompt wording of each take is in `takes/takeN/`. From take 3 on, `nb.py` also writes it into every line of `costs.jsonl` (`prompt_text`). Check images are in `checks/<date>/`.

## Where everything lives

| What | Where |
|---|---|
| Tool | `nb.py` (+ `README.md`) |
| Key | `~/.config/gemini/api_key` (outside the repo) |
| Plan / timeline of the animation | `SCRIPT.md` |
| Current prompts (edited for each take) | `prompts/*.txt` |
| Prompt wording per take (frozen) | `takes/take1/`, `takes/take2/` |
| Cost log (one line per billed call) | `costs.jsonl`, summary: `uv run nb.py costs` |
| Results | `A_wide.png`, `B_meadow-in-bloom.png`, `transition.mp4` (current) · `*.v1.*` (take 1) · `transition_reveal.mp4` (free ffmpeg variant) |
| On the site | `public/media/meadow-bloom.mp4` (720p re-encode), `meadow-start.jpg`, `meadow-end.jpg` |
| Checks (frame grids, Playwright screenshots) | `checks/2026-10-16/` |

---

## Take 1: 15.10.2026, $1.06

- **Input:** `A_sky-without-balloons.png` (1024², balloons removed).
- **Steps:** `A_wide.png` (extended to 16:9) → `B_meadow-in-bloom.png` → `transition.mp4` (Veo 3.1 Fast, 1080p, 8 s).
- **Result:** A_wide good (style kept, mountains slightly re-painted wider, trees added). B with balloon ghost smudges in the upper sky centre.
- **Video verdict: rejected.** From 2 to 5 s large saturated purple and pink lupins grow, which vanish into dots at about 6 s; from 6 to 8 s almost nothing changes. On the site this read as "blooms, goes back, stops". Evidence: `checks/2026-10-16/take1_frames.png`.
- **Lessons:** with first and last frame alone, Veo invents its own intermediate content. The prompt has to forbid shrinking explicitly, name a palette and require pacing until the end. Veo REST deviates from the docs: `bytesBase64Encoded` instead of `inlineData`, `durationSeconds` as a number, no `numberOfVideos`; this cost three free 400s.
- Kept as: `B_meadow-in-bloom.v1.png`, `transition.v1.mp4`.

## Take 2: 15./16.10.2026, $1.01 (total $2.07)

- **Brief (from Mike via the website session):** keep the trees, mountains, sky and composition; bloom only grows; no lupins, nothing purple or pink; palette orange #E89B52, pale yellow, sage, dusty blue, cream; even pacing to the end; camera still; clean sky. Also: clouds should move.
- **Plan:** `SCRIPT.md` (timeline per layer, rules per frame), approved by Mike before generating.
- **Steps:** new B from A_wide (clouds moved right, clean sky) → new video with Veo 3.1 Fast → free comparison `transition_reveal.mp4` (ffmpeg smoothup).
- **Result B:** trees and composition identical; clouds moved right (~5–10 %); delicate dabs of flowers within the palette; a faint trace of the sky smudges remains.
- **Result video: accepted.** Grows strictly, orange and cream dabs from the bottom edge upwards, clouds drift right, trees and mountains still, still changing between 6 and 8 s. Evidence: `checks/2026-10-16/take2_frames_0-8s.png`, `take2_meadow_crops.png`.
- **Reveal variant:** grows monotonically, but the clouds cross-dissolve (visible double image around 6 s). Not used.

### Site check, 16.10.2026 (Playwright, localhost:3010, branch `design/ui-polish-balloons`)

- **Desktop 1440×900:** video time follows the scroll linearly (0 % → 0.00 s · 25 % → 1.98 · 50 % → 3.98 · 75 % → 5.98 · 100 % → 7.95). No console errors. `checks/2026-10-16/desktop_scroll_0-100.png`.
- **Reduced motion:** no video, still image `meadow-start.jpg`. Open question: the plan was the bloomed B as the still image.
- **Mobile 390×844: bug.** Horizontal overflow (scrollWidth 406 > 390), at the end of the page the layout is shifted right and the cards are clipped on the left. Cause: the hero text backdrop `-inset-x-10` (right edge 406 px). `checks/2026-10-16/mobile_top_end.png`. **Fixed 16.10.:** `overflow-x-clip` on the hero section (`app/landing-page.tsx`); afterwards scrollWidth = 375 at 375.
- **Balloons:** rise with the scroll, each at its own speed (parallax in `app/sky-background.tsx`).

### Phone version, 16.10.2026 (decision Mike: "fade two images")

- **Problem:** on Mike's phone the background was missing. iOS Safari ignores `preload` and does not paint a video that is only seeked but never played.
- **Solution** (`app/sky-background.tsx`): touch devices or width < 768 px get no video. `meadow-start.jpg` stays put and `meadow-end.jpg` fades in with the scroll (opacity 0 → 1 over 0–90 % of the scroll). Desktop keeps the scroll video. Reduced motion and the first render before detection: still image `meadow-start.jpg`.
- **Check:** mobile emulation 375×812 shows no video; opacity 0 → 0.52 → 1 at 0/50/100 %; no horizontal scroll. Desktop 1440×900: video, readyState 4, no console errors. Typecheck and lint clean. Not committed.
- **Follow-up after Mike's iPhone screenshot (12:29):** (1) the glow behind the hero text had hard vertical edges, because `overflow-x-clip` on the section cut through the blur. The clip moved to the page root (`landing-page.tsx`, outermost div). (2) The button sat under Safari's toolbar: on phones the hero is now `pt-[33svh] pb-[7svh]`, the subtitle `text-base`, smaller gaps (desktop unchanged). Measured with the button / link bottom edge: 402×710 → 620/656, 375×667 → 622/658, 430×780 → 679/715. (3) The painting is cropped deep on phones and reads loud: light paper wash `bg-paper/35` over the background, balloons stay vivid on top. `checks/2026-10-16/phone_402x710_after.png`.
