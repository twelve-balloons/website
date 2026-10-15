# Twelve Balloons: design system

Read this before any UI change, by hand or by AI. It describes the site as built (October 2026), not a wish list. If something here and the code disagree, fix one of them in the same change.

**Mood in one line:** a calm watercolour of the Swiss Alps, balloons drifting in the sky, a meadow that blooms as you scroll. Quiet, warm, hand-made. Nothing glossy, nothing neon.

---

## 1. Colour

Sampled from the painting and the balloon logo. Defined in `tailwind.config.ts`.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F6F1E4` | Surfaces, panels (at 85 %), header once scrolled |
| `ink` | `#1F2A25` | Headlines, strongest text, text on orange |
| `deep` | `#2F4A3F` | Body text, links, icons, active toggle |
| `sage` | `#99AFA0` | Tints (icon circles at 25 %), "in progress" dot |
| `gold` | `#CEBD8C` | Hairlines, borders (30 to 50 %) |
| `balloon` | `#E89B52` | **The only accent.** Primary buttons, "live" dot, nothing else |
| `balloon-dark` | `#D9853A` | Button border and hover |

Rules:
- One accent. Orange marks the one thing to do on screen. Never a second accent colour.
- No gradients as decoration, no gradient text. The only gradient is the light on the primary button.
- Text on orange is `ink`, never white (white fails contrast).
- Body text contrast at least 4.5:1. Never grey text on the painting; put it on a `paper` surface.
- Icons are monochrome in `deep`. No emoji anywhere in the UI.

## 2. Typography

One family: **Montserrat** (`next/font`), several weights. No second sans, no serif.

| Role | Classes |
|---|---|
| Hero `h1` (one per page) | `text-4xl md:text-6xl font-black tracking-[-0.03em] leading-[1.05]` |
| Section `h2` | `text-2xl md:text-3xl font-extrabold tracking-[-0.02em]` |
| Card / item `h3` | `text-xl font-bold` |
| Body | `text-lg leading-relaxed text-deep`, regular weight |
| Label / eyebrow | `text-xs` or `text-sm`, `font-semibold uppercase tracking-[0.08em]` |
| Numbers, dates, step counters | `font-mono text-xs` |

Rules:
- Body text is regular (400). Bold is for headings and short emphasis only.
- `text-wrap: balance` on h1 to h3, `text-wrap: pretty` on paragraphs (set globally in `globals.css`).
- Long paragraphs max `max-w-3xl`, about 65 to 75 characters per line.
- Titles wrap, never truncate.

## 3. Layout and spacing

- Content column `max-w-5xl`, page gutters `px-6 md:px-16 lg:px-24`.
- Sticky header `h-16` (64 px): logo + wordmark, section anchors (desktop), language toggle.
- Hero fills the first screen (`min-h-[92svh]`): balloons above, headline, subline, one primary CTA, one quiet text link.
- Sections are `panel`s: `bg-paper/85 backdrop-blur-md rounded-2xl border-gold/30 p-8 md:p-12`, `mb-12` apart, `scroll-mt-24` for anchors.
- **Feature row** (text + product image): text left, image right, columns about 60/40 (`3fr 2fr`), image centred in its column and about as tall as the text block. On phones the image comes first. One main action per row, placed at the end of the text.
- **No cards inside panels.** Group inside a panel with hairlines (`divide-gold/50`) and space.
- Spacing on a 4 px grid (Tailwind default scale).

**Radius**

| Element | Radius |
|---|---|
| Panel | `rounded-2xl` (16 px) |
| Anything inside a panel | `rounded-md` (6 px) or less; outer radius = inner radius + padding |
| Buttons, chips, toggles | `rounded-full` |

## 4. Components

**Prompt field** (`PromptLink`): 48 px tall, about 352 px wide (full width on phones), 15 px text, 36 px orange lit arrow button inside. Labelled by a short question above it.

**Primary button** (`PrimaryButton`, class `btn-lit` in `globals.css`). Lit from above:
1. 1 px light inset on the top edge
2. darker inset line at the bottom
3. tight contact shadow underneath
4. soft glow in the button's own colour

Plus a gentle top-to-bottom gradient. Pressed: the light flips and the button scales to 0.97. Label = verb + object ("Try the Badge Generator"). External links carry the `ExternalLink` icon. At most one primary button per screen.

**Secondary button** (`SecondaryButton`): outline `border-deep/25`, `rounded-full`, hover `bg-sage/20`. Never two primary buttons side by side.

**Buttons follow status.** Orange means "you can use this right now":
| Status | Main action | Extra links |
|---|---|---|
| Live | orange `PrimaryButton` ("Try …") | `TextLink` |
| Prototype / in progress | `TextLink` ("Read how it works"), or an outline button if there is a demo to try | |
| Open resource (template, repo) | outline `SecondaryButton` ("Use the template on v0") | `TextLink` |
| Idea / research | no button | `TextLink` at most |
One button per entry; further links are text links, never a second button.

**Text link** (`TextLink`): `deep`, semibold, arrow that nudges right on hover, underline on hover.

**Status label** (`StatusChip`): no pill, just a dot + small caps (`text-xs uppercase tracking-[0.1em]`). Orange dot = live, sage = in progress, deep green = open resource. The only pill in an entry is its action.

**Focus:** every interactive element shows `focusRing` (2 px `deep` outline, 2 px offset) on keyboard focus.

**Language:** EN and DE for every string, in the `content` object of `landing-page.tsx`. `<html lang>` follows the toggle.

## 5. Motion

Purpose first: feedback, continuity, or the brand idea ("let ideas fly"). Never motion for its own sake.

| What | How |
|---|---|
| Easing | `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out); springs for toggles. Never linear, never ease-in on UI |
| UI feedback | 150 to 200 ms, `transform` and `opacity` only |
| Section reveal | 500 to 600 ms, y 16 to 24 px, children stagger 60 ms, once |
| Hero headline | words rise from a mask, CSS only, 70 ms apart; subline and CTA fade up after |
| Balloons | 11 separate layers (`public/images/balloons`): drift 9 px + sway ±1.3° over 7.6 to 12 s each; rise 240 px × own factor over the first 1600 px of scroll; pointer follow ±14/8 px (desktop) |
| Meadow | desktop: 8 s video scrubbed by page scroll (`public/media/meadow-bloom.mp4`); touch: start and end stills crossfade |

Rules:
- Content is visible without JavaScript. Never render text at `opacity: 0` on the server; only sections that start below the fold may hide after mount.
- Animate only `transform` and `opacity`, never `top`/`left`/`width`/`height`.
- `prefers-reduced-motion`: no drift, no parallax, no video, no word rise; the start still shows.
- The bloom only ever grows. Any new background video must change monotonically, with no camera move.

## 6. Imagery

- The painting is the identity: watercolour, pencil outlines, paper texture, soft pastel light.
- Generated assets (Nano Banana / Veo, see `docs/nano-banana/`) keep the composition, trees and mountains; prompts are written as PRESERVE / CHANGE / NO.
- Palette for anything added to the painting: muted orange, pale yellow, sage, dusty blue, cream. No purple, no saturated colours.
- Social preview: `app/opengraph-image.jpg` (painting + balloons, 1200 × 630).
- Product examples keep their own colours. Badges (`public/images/badges/`) are cut out with their cord, no background, layered shadow in ink colour (tight contact shadow + small mid shadow + large soft drop, all `drop-shadow` so the cord casts too); one at a time, crossfading every ~3 s and swinging ±1.6° on the cord (`.badge-sway`); reduced motion shows the first, still.

## 7. Copy

- Short sentences. No em dashes; use commas, colons or full stops.
- No buzzwords (seamless, empower, supercharge, world-class).
- Buttons say what happens. Links make sense out of context.
- No links to pages that don't exist yet; leave the link out instead.

## 8. Don'ts

- A second accent colour, gradients, gradient text, glow effects beyond the button.
- Emoji or multicolour icons.
- Cards inside panels, identical card grids.
- Bold or centred long paragraphs.
- Content hidden until JavaScript runs.
- Balloons behind the header or the headline (they start below the 64 px header and end above the `h1` on every screen size).

## 9. Before you ship a UI change

1. `npx tsc --noEmit` and `npx next lint` pass.
2. Screenshot at 375 × 667, 390 × 844, 918 × 820 and 1440 × 900 (playwright-cli) and look at them.
3. Check both languages and the reduced-motion view.
4. Restyles touch every section, the footer and the 404 page, not only the one you looked at.

Sources: `docs/UI_Playbook_2026-10-15.md` (rules from Mike's AI-Links notes and a 15-site benchmark), `docs/nano-banana/` (image and video pipeline).
