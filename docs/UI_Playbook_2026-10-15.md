# Twelve Balloons: UI Playbook from your AI-Links

Stand 15.10.2026. Sources: 184 UI notes from the AI-Links vault (your self-sent caddor.com mails, transcripts included), read in full. About 115 had usable content; the rest were failed transcripts or off-topic. Matched against the live page at localhost:3010 and `app/landing-page.tsx`.

Source tags in brackets are note filenames in `~/Documents/AI-Links/Links/`.

---

## 1. Top 12 fixes for this site (ranked by impact)

| # | What I see on the page | Fix | Source |
|---|---|---|---|
| 1 | **52 elements are rendered with `opacity:0` in the server HTML.** Without JS, on slow phones, for crawlers and for link previews, the page is blank. While scrolling, sections show as empty glass boxes until the animation fires. | Content visible by default. Animate only `transform` (y 16 to 24px), not opacity from 0. The hero must never start invisible. | own check (`curl`), [2026-07-29 animation-style-of-menu-in-website] |
| 2 | **Hero has no button.** First screen = headline + paragraph only. | Primary CTA in the hero ("Try the Badge Generator"), secondary ("Read on Substack"). Button text starts with a verb and names the benefit. | [2026-06-10 button-on-first-screen-ux], [2026-02-12 headline-landing-page], [2025-05-23 modern-design] |
| 3 | **Five colour systems compete:** emerald text, purple to pink gradient, amber pill, green pill, emoji colours. | One leading accent (e.g. the balloon orange or a deep teal), neutrals everywhere else. Primary colour only on the main CTA. Hover and pressed derived via `color-mix(in oklab, var(--accent), black 12%)` / `20%`. | [2026-08-13 ux-design-tips], [2025-11-07 ui-fewer-colours], [2026-04-28 ui], [2026-07-26 css-colour-mix] |
| 4 | **Emojis as feature icons** next to Lucide icons elsewhere. | Lucide only (already installed), one stroke weight, same size grid (20px icon on 20px line height, 8px gap). | [2026-07-18 libraries-ui-icons], [how-i-make-apps-feel-10x-better-5-design-secrets], [2025-10-23 ui-design-icon] |
| 5 | **Almost everything is bold and centred.** Body text is `font-medium`/`font-bold`, long paragraphs are centred. | Body 400, headings 700 to 800, labels 500. Left-align text inside cards and long paragraphs. Headlines: line height about 1.0 to 1.1, letter spacing -2% to -5%. Add `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. | [2025-10-27 typography-ui-letter-spacing], [2025-12-01 design-ui-ux], [2025-10-23 numbers-ui], [2026-07-05 css-text-wrap-pretty-and-balance] |
| 6 | **Seven identical glass boxes stacked**, so there is no rhythm and no focal point. | Vary the sections. Hero full bleed without a box, "What we're building" as a bento grid, Mission as a plain list on a left key line, Community as three cards. Fewer card backgrounds, more white space. | [2025-11-07 ui-fewer-colours], [2025-10-05 figma-ui-design], [2026-08-13 ux-design-tips] |
| 7 | **Dead links look unfinished:** "Join on GitHub", "View Calendar", footer "GitHub" are grey with `cursor-not-allowed`. | Link them or remove them. If they must stay, use a small "Soon" chip, not a disabled link. | [2026-09-17 ai-built] ("nothing that looks abandoned") |
| 8 | **The Badge Generator appears twice** (own section and project card), and "About the Collective" has a redundant "Who We Are" subheading. | One appearance each. Every element must earn its place. | [2026-02-12 headline-landing-page], [2026-10-07 ui-improvement] |
| 9 | **The background is a 1024 × 1024 PNG, 1.6 MB**, stretched to full desktop width, so it is soft and heavy. | Export at 2560px wide as AVIF/WebP (about 200 to 300 KB). Separate the balloons onto their own layer (see animation plan). | [2026-02-12 headline-landing-page] ("compress images, fast") |
| 10 | **Contrast:** green text on `white/40` glass over a busy watercolour. Glass only reads well on calm backgrounds. | Panels at `white/75` or more, or a solid surface. Check WCAG AA (4.5:1 body). | [2025-10-13 top-2025-app-design-trends], [2025-10-13 ui-card], [primary-colours-colour-wheels] |
| 11 | **Missing basics:** no nav or sticky header, no Open Graph image or tags, the language toggle does not change the URL (no `/de`, no `hreflang`), no contact or imprint in the footer. | Sticky header with logo, 3 to 4 anchors and CTA (blur on scroll). OG image and meta. `/en` + `/de` routes. Footer with contact and legal. One `h1` describing the page. | [2026-09-17 ai-built], [2026-08-01 seo-for-ai-website] |
| 12 | **The "▲ v0" button** links to a neumorphic design system on v0, and the label says nothing. | Label by outcome ("See the prototype"), or drop it. | [2025-05-23 modern-design] |

---

## 2. Animation plan (on brand: "Let ideas fly")

Framer Motion is already in the project. Every rule below comes from your notes.

1. **Balloons as a live layer.** Cut the 12 balloons out of the background into SVG/PNG layers.
   - Slow, individual float: sine drift of 4 to 10px, 6 to 12s per cycle, different phase per balloon.
   - Slight parallax on scroll: balloons rise faster than the mountains.
   - Very subtle mouse follow on desktop.
   - This is the "object that moves subtly with the mouse" + "subtle background movement" pattern. [2025-08-06 beautiful-website], [pro-level-shadcn-cursor-landing-page-in-20-minutes-animation]
2. **Headline reveal.**
   - Words rise from behind a clipping mask (`overflow:hidden` per word), staggered, spring easing.
   - Add about 10px blur-in.
   - The sub-headline starts a beat later. [2025-11-02 design], [pro-level-shadcn-cursor-landing-page-in-20-minutes-animation]
3. **Never linear easing.** Springs everywhere (`type: "spring"`). [2025-11-02 design]
4. **Only `transform` and `opacity`, never `top`/`left`/`width`,** otherwise it stutters on phones. Test on a real phone. [2026-07-29 animation-style-of-menu-in-website]
5. **Scroll reveal, but visible by default.** Cards come in from y 24 to 0, staggered, `once: true`, and are already visible in the server HTML. If row 2 lags, chain it directly after row 1. [pro-level-shadcn-cursor-landing-page-in-20-minutes-animation]
6. **Badge Generator section = show the product moving.** A looping 5 to 8s capture of a badge morphing between styles instead of four emoji cards. Hero video or loop beats text. [2025-05-23 modern-design], [2025-10-27 website-mid-journey-and-4x3-aspect]
7. **Micro-interactions.** Raised buttons:
   - darker stroke;
   - tinted drop shadow;
   - soft inner highlight on top, darker inner shadow at the bottom;
   - press scales to 0.97.

   Icons animate on hover (Animate UI). [2025-11-12 buttons-ui], [2026-07-18 libraries-ui-icons]
8. **Respect `prefers-reduced-motion`.** Switch off float and parallax, keep the fades. Remove the JS that forces `scroll-behavior: smooth`. Use CSS with a reduced-motion guard instead.
9. **Optional "wow" layer** (pick one, not all):
   - Shader Gradient in the hero sky;
   - React Bits "Split Text";
   - a marquee of community logos and quotes.

   Watch GPU cost. [2026-10-07 ui-ux], [you-can-now-build-awesome-shadcn-animations-copy-paste]

---

## 3. Skills and tools: what to install

| Tool | Status | Why |
|---|---|---|
| **design-taste** skill | Installed (`~/.claude/skills/design-taste`) | It already bundles **impeccable + Emil Kowalski + taste-skill**, the three skills your notes recommend most. [2026-07-26 design-skill-with-claude], [2026-08-27 frontend-skill-taste-impeccable-and-awesome-design-md] |
| **21st.dev Magic MCP** | Connected in Claude Code | Ready-made hero, pricing and testimonial blocks. [2026-07-26 ai-website-framer-21sr-dev-and-claude-skills] |
| **Framer Motion** | In `package.json` | Animations. |
| **playwright-cli** skill | Installed | Screenshot and verify after every change. [2026-09-05 strix-and-skill-ui] |
| **UI UX Pro Max** skill | To install | 97 palettes, 57 font pairings, 50+ styles. Fills the colour and type gap. [2026-06-20 claude-code-ui-websites], [2026-05-25 claude-code-framer] |
| **Apple design audit** skill | Optional | Audits an existing site against Apple's HIG and fixes colour, responsiveness and motion. The note has no repo link, so it has to be found first. [2026-08-13 apple-design-audit-website-skill], [2026-09-08 apple-design-repo] |
| **shadcn MCP** + **tweakcn** | Optional | The repo already has `components.json`. Pull shadcn components plus a theme from tweakcn instead of hand-built classes. [pro-level-shadcn-cursor-landing-page-in-20-minutes-animation] |
| **`design.md`** in the repo root | To create | One file with tokens, type, spacing and motion rules, so every future AI edit stays on style. Google's open spec. [2026-06-20 open-source-design], [2026-05-26 google-design-and-md-and-framework] |

Not needed for this site: Figma MCP (you don't design in Figma here), Remotion, Claude Design (paid, slide-oriented), Stitch (good for new apps, not for polishing an existing one).

---

## 4. Rulebook from the notes (condensed)

**Typography**
- Max two fonts. [2026-08-13 ux-design-tips]
- Hierarchy through weight + colour, not size alone. [2025-12-01 design-ui-ux]
- Headlines: tight line height and negative tracking. [2025-10-27 typography-ui-letter-spacing]
- Line heights on a 4px grid. [2025-10-23 ui-design-icon]
- No ALL CAPS labels. [2025-07-07 designer]

**Colour**
- One leading colour; the brand colour is not automatically the UI primary if it fails contrast. [2026-08-13 ux-recommendations], [primary-colours-colour-wheels]
- Semantic tokens (surface, fill, border, text, icon) over primitives. [2025-11-07 ui-token-range], [2026-09-05 figma-colors]
- Never colour alone for errors; add an icon. [2025-09-27 ui-design]
- Check light and dark. [2025-11-12 buttons-ui]

**Spacing & layout**
- Spacing is optical, not mathematical. [2025-05-23 ui-feel-right]
- Proximity: related things close together. [2026-08-13 ux-recommendations]
- Inner and outer radius matched. [2025-12-01 design-ui-ux]
- One focal point per screen. [2026-08-13 ux-design-tips]

**Landing & copy**
- Headline stops and promises an outcome; sub-headline clarifies; hero image proves it. [2026-02-12 headline-landing-page]
- Three objection bullets, then social proof. [2026-02-12 headline-landing-page]
- Removing distractions around the CTA: nav removal, shorter forms and calmer backgrounds gave 2x to 15x more clicks in the cited cases. [2026-10-07 ui-improvement]
- Forms: one question at a time. [2026-07-04 contact-us-website]
- Landing page ≠ home page: decide which this is. A collective's site is a home page with one hero CTA. [2026-07-24 landing-page-vs-home-page]

**Components**
- Never two primary buttons side by side. [2025-12-01 design-ui-ux]
- Input labels outside the field. [2025-09-27 ui-design]
- Empty states designed. [7-new-shadcn-components-are-here]
- `:has()` for conditional styling without JS. [2026-07-26 css-has-if-statements-now]

**Working with AI**
- Feed real references (Godly, Awwwards, Mobbin, Cosmos), then ask for an original that combines the feeling. [2026-07-28 website-webdesign-ai-references]
- Max 2 to 3 changes per prompt. [how-i-built-a-full-app-in-one-week-using-ai-my-actual-workfl]
- Polish and animation last. [how-i-built-a-full-app-in-one-week-using-ai-my-actual-workfl]
- Make a shadcn site not look like shadcn: theme, custom hero, custom sections. [design-in-v0-finish-in-cursor-ai-coding-tutorial]

**Inspiration sources named in the notes:** Godly, Awwwards, Mobbin, Cosmos, Pinterest, yolk.com/best-design-websites, Name That UI, Free Faces, Gradient Supply, Unicorn Studio, React Bits, Animate UI.

---

## 5. Notes worth re-watching (content didn't transcribe)

These look relevant, but the transcript failed. The idea only lives in the video or on-screen text:
- `2026-07-18 claude-code-motion`, `2026-07-30 motion-in-claude-code`, `2026-09-12 liquid-fill-animation` (animation)
- `2026-08-08 pdf-guide-to-building-websites-with-claude-code` (Drive PDF behind login)
- `2026-08-08 claude-web-design-killer-setup-notion-guide` (Notion not fetchable)
- `2026-06-13 awesome-design-md`, `2026-06-20 motion-so`, `2026-10-08 design-fur-webseiten`, `2026-09-25 website-design`

---

## 6. Benchmark: 15 similar sites (AI labs, design studios, painted heroes)

Researched by a separate agent via web fetch. Layout and colour claims are partly inferred from page text; marked where unverified.

| Site | Does especially well | Steal for Twelve Balloons |
|---|---|---|
| [Google Labs](https://labs.google) | Experiment cards with filters, "Try It Now", "Life beyond the Lab" | Projects as identical experiment cards with status chip + "Try it" |
| [Hugging Face Spaces](https://huggingface.co/spaces) | Status badge, tags, likes, last updated | "Updated 3 days ago" on each experiment, proves activity |
| [Rive](https://rive.app) | One-line hero, trust line, named designer quotes | Named quote cards in Community |
| [tldraw](https://tldraw.dev) | GitHub star count in nav, community numbers, showcase | Live star count, one stat row |
| [Linear](https://linear.app) | "New: ..." badge over hero, dated changelog, figure numbering | "Recently flown" changelog; number experiments "Balloon 01" |
| [Vercel](https://vercel.com) | Short hero, two CTAs, "Recently shipped" strip | One CTA per section |
| [Every](https://every.to) | Hero is a product demo, not a statement | Hero shows a looping prompt-to-UI demo |
| [Are.na](https://are.na) | Manifesto as numbered statements, colophon in footer | Mission as numbered lines; footer credits font + illustrator |
| [Cosmos](https://cosmos.so) | Search/prompt box as hero object | "Describe your balloon..." prompt box |
| [Rauno Freiberg](https://rauno.me) | Short imperatives, no nav, click-to-copy email | Mission voice; copy-to-clipboard contact |
| [Emil Kowalski](https://emilkowal.ski) | Projects as plain list, one line each | Projects without heavy cards |
| [Paco Coursey](https://paco.me) | "Now" section, sign-off line | "This month we are building..." block |
| [Pentagram](https://pentagram.com) | Evocative section headlines | Headlines instead of labels ("About the Collective") |
| [Sky](https://thatskygame.com) | Painted sky hero with looping video, gentle copy, one sign-up | Closest mood match: the painting as a living background |
| [Anthropic](https://anthropic.com) | One warm paper tone + one accent, sparing illustration (unverified) | Colour discipline |

### Recurring patterns
- **Nav:** logo + 3 to 4 anchors + one button, or none.
- **Hero:** one statement under ~10 words, one primary CTA, one quiet link, proof of the product inside the hero (demo, snippet, poster).
- **CTA:** verb + object, repeated in a closing CTA block.
- **Rhythm:** dense block, airy block, alternating. Few card backgrounds.
- **Proof:** status, date, tags, named quotes, numbers, changelog.
- **Community:** one stat row, one newsletter field, a few clear links.
- **Footer:** links, socials, colophon, one tagline.
- **Type:** large tight-tracked sans headlines, regular left-aligned body, monospace for metadata.
- **Colour:** one accent on a neutral ground; the imagery carries the rest.
- **Motion:** gentle ambient (Sky) plus precise micro-interactions (Emil, Rive).

### Recommended direction

**Section order**
1. Hero: "Let ideas fly." Sub: "A collective building conversational interfaces." CTA "Try the Badge Generator", quiet link "Read the Substack". Painting full bleed, no box.
2. Prompt demo: live prompt box morphing a badge, 6s loop.
3. Mission: five imperatives on a left key line.
4. Featured projects: two experiment cards with status chips.
5. What we're building: list or bento grid.
6. Now / Recently flown: 3 to 4 dated entries.
7. About: two short paragraphs, team as small balloon avatars.
8. Community: GitHub stars, next event, Substack signup, LinkedIn in one row.
9. Closing CTA + footer (new balloon logo, colophon, contact).

**Typography:** Montserrat 700 to 800 for headlines (tracking -2% to -4%), Inter or Source Sans 3 at 400 for body, JetBrains Mono for chips and dates.

**Palette (sampled from the background and new logo)**

| Role | Hex |
|---|---|
| Paper | `#F6F1E4` |
| Sage surface | `#99AFA0` |
| Deep sage (text) | `#2F4A3F` |
| Ink | `#1F2A25` |
| Muted gold (dividers) | `#CEBD8C` |
| **Accent: balloon orange** | `#E89B52`, primary CTA and active states only; dark ink text on orange (orange fails AA as small text on paper) |

**Motion concept**
1. Balloons as separate layers, sine drift 4 to 10px, 6 to 12s, different phase.
2. Parallax: balloons rise faster than mountains.
3. CTA press: scale 0.97 + soft ring.
4. Prompt demo: a balloon inflates and changes colour as you type.
5. Headline words rise from a mask; content visible without JS.
All guarded by `prefers-reduced-motion`.

**Five don'ts**
1. No content hidden at `opacity:0` on load.
2. No second accent, no gradients.
3. No stack of identical glass cards.
4. No emoji icons, no links to pages that aren't ready.
5. No bold body text, no centred long paragraphs.

**Mood references for designer/AI:** Google Labs (project structure), Sky (hero mood), Rauno Freiberg (Mission voice, restraint).

---

## 7. Addendum: the remaining 212 notes (16.10.2026)

The first pass read 184 notes selected by title. This pass read the 212 notes that mention UI terms only inside the transcript. About 77 were UI-related; roughly 40 added something new. Only what is new compared to sections 1 to 6:

**Typography**
- Type scale from one body size × 1.618 (golden ratio) for subheads and headlines. [2025-07-10 type-sizes]
- Long titles wrap inside cards, never truncate; shorten at the source. [2026-08-08 nick-saraev-mobile-apps-with-claude-code-course]

**Colour**
- Monochrome icons in the palette colour; mixed-colour emojis look scattered. [nick-saraev course]
- Typical AI bug: icon or text colour equal to its background (invisible ticks, selectors). Run a pass for it. [nick-saraev course]
- CSS blend modes for paper texture or grain over the painting: `multiply` on light grounds, a contrast mode for film grain. [2025-05-26 blending-modes]

**Layout**
- Nested radius: outer radius = inner radius + padding. Matching radii leave an awkward gap. [2025-12-01 corner-radius]
- "Bookshelf" pattern for an archive page (posts as books, hover to pick). Useful later for Substack posts. [2026-08-27 newsletter-archive]

**Components**
- Confirmation dialogs: title = verb + noun ("Delete folder"), one line saying it is irreversible, confirm button = plain verb, secondary = "Cancel". [2025-11-08 are-you-sure-modal]
- Skeleton loaders only with a slow left-to-right shimmer, matching the final layout, only for waits under 3 s; beyond that a progress indicator. [2026-07-27 skeleton-screens]
- Error fallback with reset button, loading/empty/error state for every async call, forms keep input after a failed submit, custom 404, no dead links or broken images. [2026-06-04 vibe-code-error-boundary]
- Sliders: drag, arrow keys, clickable items inside slides (Swiper JS, GSAP). [2025-10-13 smoothie-slider]

**Motion & scroll**
- Pinned image over scrolling video, which then transforms into another atmosphere ("Herstory"). This is what the meadow transition now does. [2025-09-12 herstory]
- Randomise the opening variant per reload so the page feels different each visit. [2025-09-12 herstory]
- Describe motion concretely ("a button that snaps into a green tick", "lines that draw themselves"); "make it nice" yields nothing. One style file (colours, fonts, how things move) + one described moment. [2026-10-15 motion-for-style]
- Lottie via the LottieFiles MCP in Claude Code. [2026-09-25 lottiefiles]
- scroll-world: open-source repo for scroll-driven motion sites; the notes give no URL. [2026-09-05 scroll-world-repo]

**Landing & copy**
- Make 3 to 5 landing-page mockups with an image model first, pick one, then have the coding agent rebuild it and compare against the image in a test browser until they match. [2026-10-06 vibecoded-app-suggestions]
- Copy in your own voice: interview to extract the voice, strip AI phrasing, write three reference pieces yourself. [2026-03-07 claude-code-copy]

**SEO, AI visibility, analytics**
- AEO check: ask ChatGPT and others what Twelve Balloons does, for whom, why choose it. Publish clear answers to everything you dislike; re-check after 30 days (HubSpot AEO grader is free). [2026-06-20 agent-webseite-ai]
- Server-render the first view for speed and SEO, then hydrate. Confirms fix 1. [2025-10-23 server-side-and-client-side-rendering]
- Competitor outlines with the "Detailed SEO" extension; `site:chatgpt.com/share <keyword>` shows real user questions. [2025-07-07 seo-extension], [2025-07-31 index-search-from-gpt]
- PostHog (free) with a Claude connector to ask where visitors drop off. [2026-05-08 posthog]

**AI workflow**
- Separate function from design: build first, then a dedicated design pass, then "audit the design with your own testing flow" across every page; restyles often miss pages. [nick-saraev course]
- Lock the style into one file (design.md or master prompt) and screenshot-verify after each change. [2026-02-02 vibe-code-apps-instructions], [2026-05-21 mastering-claude-code]
- Hallmark skill: extracts formatting from reference sites and removes AI-slop trends; similar to impeccable. Not installed. [2026-08-13 hallmark-skill-a-bit-like-impeccable-skills]

**Considered and not applied**
- "Serif display font looks more premium" [nick-saraev course]: conflicts with the design-taste rule against serif as a reflex default. Montserrat in several weights stays.
- Dark-mode toggle [2026-07-18 crm-dashboard-good-example]: for dashboards; the painted sky is the identity here.

---

## 8. Gap check: the site against the full rulebook (16.10.2026)

**Done**
- Content visible without JS (0 hidden elements in the server HTML, was 52).
- Hero with primary CTA and secondary link, headline rise animation.
- One accent colour, palette from the painting, no gradients or gradient text.
- No emoji icons; numbered steps; monochrome Lucide icons.
- Body text at regular weight, `text-wrap: balance` / `pretty`.
- Balloons as live layers: drift, sway, per-balloon parallax, pointer follow, reduced motion.
- Meadow bloom tied to scroll (take 2: only grows); phones get a crossfade instead of the video.
- One `h1`, focus-visible on buttons, no em dashes in copy.

**Missing, ranked by impact**

| # | Gap | Fix | Effort |
|---|---|---|---|
| 1 | Greyed-out "Join on GitHub", "View Calendar", footer "GitHub" look unfinished | Link them or remove them | S |
| 2 | No navigation | Small header: logo, 3 anchors, CTA; blur on scroll | S |
| 3 | Badge Generator appears twice (section + project card) | Keep one | S |
| 4 | No Open Graph image or social meta | `opengraph-image`, title, description | S |
| 5 | Nested cards inside panels (Projects, Community); radii break outer = inner + padding | Drop the outer panel on those sections, or apply the formula | S |
| 6 | Seven panels with the same treatment, the bloom is hidden behind them | Vary rhythm: Mission and "What we're building" as open text without panel; let the meadow show | M |
| 7 | Language switch doesn't change the URL; `<html lang>` stays "en" in German | `/en` and `/de` routes, `hreflang`, correct `lang` | M |
| 8 | No custom 404, no contact or imprint in the footer | `not-found.tsx`; footer with contact and legal | S |
| 9 | No proof of activity | "Recently flown" (3 to 4 dated entries) or a "Now" block | M (content from Mike) |
| 10 | Mission as plain centred lines | Five short imperatives on a left key line | S |
| 11 | No analytics, no AEO check | PostHog or Vercel Analytics; one AEO check before launch | S |
| 12 | Language toggle buttons have no visible focus style | `focus-visible` ring like the CTAs | XS |
