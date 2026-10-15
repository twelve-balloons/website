# Nano Banana: scroll transition for the Twelve Balloons background

Idea from your AI-Links note `2026-04-25 website-custom`: two images (start + end state), turned into a short transition video that plays as you scroll. Here: the meadow blooms as you scroll down.

**Which image to upload:** `A_sky-without-balloons.png` (same painting, balloons removed).
The balloons are already separate, drifting layers on the site. If the video contained them too, they would appear twice. So the video only changes the landscape, and the live balloons keep floating on top.

---

## Step 1: Image B in Nano Banana (Gemini)

Upload `A_sky-without-balloons.png`, then paste:

```
Edit this watercolour painting. Keep it the exact same painting, only later in spring.

PRESERVE: the exact composition, framing and square format; the mountain shapes, snow and their position; the sky, clouds and their position; the paper texture, pencil outlines and soft watercolour wash; the overall pastel palette.

CHANGE: the green meadow in the foreground and the lower hills burst into bloom. Small wildflowers in soft balloon colours (muted orange #E89B52, pale yellow, sage green, dusty blue) spread across the grass, densest at the bottom edge and thinning out towards the mountains. The light becomes slightly warmer, like late afternoon.

NO: balloons, people, animals, buildings, text, logos. No new objects in the sky. No photographic realism, no sharp digital edges, no saturated colours. Do not move or redraw the mountains.
```

Save the result as `B_meadow-in-bloom.png`, ideally at 2048 × 2048 or larger. The current painting is only 1024 px and looks soft on wide screens, so a higher resolution helps.

If the flowers come out too loud, regenerate with: *"fewer flowers, smaller, more delicate, like dots of watercolour"*. Generate again instead of asking it to correct, because every edit re-renders the whole picture.

## Step 2: transition video (Veo in Gemini, or Kling)

Use **first frame = A_sky-without-balloons.png**, **last frame = B_meadow-in-bloom.png**:

```
A slow, calm transition between the two frames of this watercolour painting. The camera stays completely still. Wildflowers gradually bloom across the meadow from the bottom edge upwards, as if painted in by soft watercolour washes. The light warms slightly. The sky and mountains do not move. No camera motion, no zoom, no new objects, no balloons. Duration 5 seconds, smooth and even pacing.
```

Export as MP4, square, at least 1080 × 1080, 5 seconds, no audio.

## Step 3: give it to me

Put `B_meadow-in-bloom.png` and the MP4 in this folder (`docs/nano-banana/`). I'll then:
- compress the video for the web (H.264 + WebM, a few hundred KB);
- tie playback to the scroll position (frame by frame, like the Framer scroll-video note `2025-08-06 website-framer`);
- show the still image B as a fallback for `prefers-reduced-motion` and slow connections.
