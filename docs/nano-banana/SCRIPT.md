# Scroll animation script: meadow in bloom (take 2)

What the visitor sees while scrolling through the hero, second by second. The video runs only forward with the scroll. It must never shrink, jump or stand still.

**Layers:** the painted background is the video. The balloons are live layers on the site (code, no API). Nothing in the video may contain balloons.

## Timeline (8 s video = the full scroll distance of the hero)

| Time | Meadow / flowers | Light | Clouds | Mountains, trees, sky | Balloons (site code) |
|---|---|---|---|---|---|
| **0 s** = A_wide | bare green meadow, no flowers | cool spring light | starting position | as in A_wide | float, gentle sway |
| **0–2 s** | the first tiny dots of colour appear along the bottom edge | unchanged | begin to drift slowly to the right | still | rise slightly with the scroll (parallax) |
| **2–4 s** | dots spread upwards to the lower third, still small and sparse | warms a little | keep drifting, same speed | still | keep rising, slightly different speeds |
| **4–6 s** | the lower half of the meadow is dotted; at the bottom edge the dots get denser | warmer | keep drifting | still | |
| **6–8 s** | dots reach the foot of the hills; densest at the bottom edge | late-afternoon warmth | arrive at end position | still | |
| **8 s** = B | full bloom, exactly like B | as B | end position, about 5 % further right | identical to A_wide | |

**Rules for every frame**
- Flowers: small, delicate watercolour dots. No lupins, no tall flower spikes, no large blossoms.
- Colours only muted orange #E89B52, pale yellow, sage, dusty blue, cream. Nothing purple or pink.
- Nothing that has appeared disappears again. Each second has more flowers than the one before.
- Even pacing: something visibly changes until the last frame.
- The camera is completely still: no zoom, no pan. Mountains, trees and the composition do not move.
- The sky stays clean, without spots or ghost shapes.

## Step 1: new B (Nano Banana 2.1, 2K, $0.05)

Input `A_wide.png` → `B_meadow-in-bloom.png` (the old one stays as `.v1`).

```
Edit this watercolour painting. Keep it the exact same painting, only later in spring.

PRESERVE: the exact composition, framing and wide format; every tree, its shape and position; the mountain shapes, snow and their position; the shape of every cloud; the paper texture, pencil outlines and soft watercolour wash; the overall pastel palette.

CHANGE: the green meadow in the foreground and the lower hills are dotted with small, delicate wildflowers, painted as tiny dabs of watercolour, densest at the bottom edge and thinning out towards the hills. Colours only: muted orange #E89B52, pale yellow, sage green, dusty blue, cream. The light becomes slightly warmer, like late afternoon. All clouds have drifted slightly to the right, by about one twentieth of the image width, same shapes. The sky is clean and even.

NO: balloons, people, animals, buildings, text, logos. No lupins, no tall flower spikes, no large blossoms, no purple, no pink, no saturated colours. No spots, smudges, blotches or ghost shapes in the sky. No photographic realism, no sharp digital edges. Do not move or redraw the mountains or the trees.
```

## Step 2: new video (Veo 3.1 Fast, 1080p, 8 s, $0.96)

First frame `A_wide.png`, last frame the new `B_meadow-in-bloom.png`.

```
A static shot of a watercolour landscape painting. The camera does not move at all: no zoom, no pan.
Over the full eight seconds, tiny dabs of watercolour wildflowers appear one by one across the meadow, starting at the bottom edge and spreading steadily upwards, so that every moment has slightly more flowers than the one before. Nothing that appears ever disappears or shrinks. The flowers stay small and delicate, in muted orange, pale yellow, sage green, dusty blue and cream. The clouds drift slowly and evenly to the right. The light warms gradually. The mountains, the trees and the sky do not change.
No large flowers, no lupins, no flower spikes, no purple, no pink, no new objects, no balloons, no people.
```

## Step 3: free comparison (ffmpeg, $0)

The same A → B, as a soft-edged reveal that rises from the bottom edge to the top over 8 s. It cannot invent anything and grows strictly upwards. The clouds jump softly instead of drifting, because a fade does not move anything.

## Cost

| Step | Price |
|---|---|
| New B | $0.05 |
| New video | $0.96 |
| ffmpeg comparison | $0 |
| **Total** | **≈ $1.01** |

If Veo invents its own intermediate frames again: Veo Standard ($3.20) follows the script more closely, or take step 3.
