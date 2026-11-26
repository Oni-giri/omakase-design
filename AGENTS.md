# Omakase — instructions for coding agents

Omakase is an opinionated UI style for web apps: light, joyous and quiet. "The chef chooses": the decisions are already made, so **do not redesign, follow them**. When a choice is not covered here, pick the quietest option that fits the rules below.

Look at `docs/screenshots/` first to see the target, then read this file. `docs/principles.md` explains the why, `docs/components.md` lists every component, `docs/patterns.md` gives page recipes.

## 1. Install (pick one)

| Stack | Do this |
| --- | --- |
| Any HTML | `<link rel="stylesheet" href="css/omakase.css">`, put `class="om-app om-canvas"` on `<body>`. Use the `om-` classes. See `examples/app.html`. |
| React | Copy `react/` into the app (e.g. `src/omakase/`), import `css/omakase.css` once at the root, wrap the app in `<AppRoot>`. See `examples/react/DetailPage.tsx`. No other dependency. |
| Tailwind v3 | Also add `presets: [require('./omakase/tokens/tailwind.preset.cjs')]`. Utilities like `bg-surface`, `text-ink-muted`, `rounded-om-xl`, `shadow-om-card` map to the same tokens. |
| Tailwind v4 | `@import "tailwindcss"; @import "./omakase/css/omakase.css"; @import "./omakase/tokens/tailwind-v4.css";` |
| npm | `npm i github:Oni-giri/omakase-design`, then import `omakase-design/css` (and `omakase-design/tailwind` for the v3 preset). |

**Theme and density.** Light is the default. Put `data-theme="dark"` (or `"auto"` to follow the OS) on `<html>`; in React use `<AppRoot theme="dark">`. Tools used all day stay dense (the default); consumer-facing or public pages add `om-comfy` next to `om-app` (`<AppRoot density="comfortable">`): 15px text, roomier rows. Never hard-code colours, so both themes keep working.

`css/omakase.css` already contains the fonts (Inter, JetBrains Mono via Google Fonts), the tokens and every component. It is generated: edit `tokens/tokens.json` or `css/components.css`, then run `node scripts/build.mjs`.

## 2. Never

- **No pills, badges or tags**: no text inside a rounded coloured box (`rounded-full bg-*-100 text-*-700` and the like). Use a `Mark` (16×5 colour bar + plain text), a `StatusGlyph` or a `RatioBar`.
- **No count pills**: show proportions with a `RatioBar` and the numbers in plain text ("7 of 9", "5 public + 8 sealed").
- **No grey look**: no grey tab strips, grey selected tabs, grey toolbars or grey page backgrounds. Strips are white; hover is `accent-wash` (faint blue).
- **No side sheets or drawers.** Every pop-up is a centered `Modal` (or the ⌘K palette near the top).
- **No dark surfaces at all**: no dark sidebars, headers, cards, hero sections, toasts or floating bars. Floating bars (toast, bulk actions) are white, lifted by `--shadow-toast`.
- **No texture**: no grain, noise, dot grids, line grids, topographic patterns. The only background decoration is the four corner blooms (`om-canvas`).
- **One accent**: ultramarine `--accent` for the main action, focus, selection and progress. Do not introduce purple, orange-brown or extra brand colours. Green `--success` is only for the final Accept/approve.
- **No gradients** other than the corner blooms and the sealed hatch already defined.
- **No coloured card backgrounds, no left-border accent stripes, no emoji, no icons inside buttons unless they carry meaning.**
- **No raw values**: never hard-code hex colours, radii or shadows. Use `var(--token)` or the Tailwind preset names.
- **Do not hide essential information in tooltips.**
- **Labels never differ by colour alone.** Each label kind gets a colour and a bar shape (`solid`, `split`, `dots`, `hollow`, `short`). At most 8 label kinds per app; beyond that, show plain text.
- **No icons as `<img>`.** Use the inline icons (`react/icons.tsx`, or the SVG markup from `icons/`): they use `currentColor`, so they follow the text colour in both themes.

## 3. "I need…" → use

| I need… | Use | Not |
| --- | --- | --- |
| a status (draft, running, done, failed) | `StatusGlyph` (`om-st om-st-*`) + text | a coloured pill |
| a priority | `Priority` (`om-pri-*`) | a red "HIGH" badge |
| a category, label, visibility or severity | `Mark` (`om-mark om-l-*` / `om-m-*`, or `color`) | a tag/chip |
| a count, progress, pass/fail, quota | `RatioBar` + text | a number in a bubble |
| a KPI | `StatTile` | a coloured card |
| an owner, agent, file, commit, ID | plain mono text (`om-mono`) | an avatar chip |
| the main action of a screen | `Button variant="primary"` (one per view) | several blue buttons |
| a destructive action | `Button variant="danger"`; for irreversible ones `HoldButton` | a solid red button, a confirm pop-up |
| filtering a list by state | `StatusTabs` above the table | a grey segmented bar |
| switching views of one thing | `Segmented` | tabs |
| extra filters | Filter button + `Menu` + `FilterCondition`, "Save as view" | pill filters |
| a setting | `Switch` with title and one-line description | a bare checkbox |
| a form | `Field` + `Input`/`Select`/`Textarea` in a `Modal` or `Card` | floating labels |
| confirming an action | `Toast` (pending → done, with Undo) | an alert() or a modal |
| an error | `InlineAlert` where it happened | a toast for errors that need action |
| nothing to show | `EmptyState`: one calm sentence + maybe one action | an illustration |
| a long job | `RunSteps` with the cleanup step at the end | a lone spinner |
| hidden or not-allowed content | `Redaction` + a line saying what is hidden | blurring |
| a feed of events | `ActivityItem` rows in a `Card flush` | a timeline with avatars |
| actions on selected rows | `BulkBar` (white, floating) | a dark bar, or a toolbar that appears above the table |
| quick navigation | `CommandPalette` on ⌘K | a mega menu |
| loading | `Skeleton` lines | shimmer sweeps |
| an app, package or project icon you don't have | `Tile` (monogram with a colour strip) | a random gradient avatar |
| an install command or snippet | `CodeBlock` (with Copy) | a dark terminal block |
| a trend | `Sparkline` + the number in text | a full chart for one number |
| a public site header | `TopBar` + `Container`, no sidebar | a dark navbar |
| long text (README, docs) | `om-prose` inside a `Card` | raw unstyled HTML |
| a big search | `SearchField` | a search inside a coloured hero |

## 4. Layout

- App shell: `Shell` = 220px glass `Sidebar` | main column (28px side padding) | optional 300px glass right rail for properties.
- Sidebar: brand, main pages, projects (8px colour squares), saved views, then workspace settings pushed to the bottom (`NavGroup end`). Only alerts get a filled count bubble.
- Content is always on white `Card`s with `--shadow-card`, gap 12 to 22px, on the bloomed canvas.
- Page recipes (list, detail, settings, dashboard, phone) are in `docs/patterns.md`. Follow them before inventing a layout.
- Public pages (a store, docs, a landing): `TopBar` + `Container` (1160px), comfortable density, a two-column layout with a 360px side column for install/stats/details. See `examples/brewhunt.html`.
- Mobile: one column, 16px cards, actions docked at the bottom in a glass bar (`om-dock`), 44px touch targets.

## 5. Words

- Sentence case everywhere. Buttons start with a verb and say what happens: "Send back for round 4", not "Submit".
- Say who something goes to and why: "This is a problem with the tests, so it comes to you."
- Errors: the cause in one bold line, then the next action. Empty states: one calm sentence.
- Agent and machine names in mono, lowercase. Numbers in tables use tabular figures (already set on `om-tline`, `om-stat-v`).
- No exclamation marks, no emoji, no marketing tone.

## 6. Accessibility minimums

- Text contrast is already ≥ 4.5:1 for every text token on white and on the canvas. Do not put text on bloom colours.
- Every glyph or bar that stands alone needs a text label or `aria-label`; the components do this when you pass a label.
- Keep the focus ring (`:focus-visible` uses `--accent`). Tabs are `role="tab"`, switches `role="switch"`, dialogs `aria-modal`.
- Respect `prefers-reduced-motion` (spinners slow down, skeletons stop).

## 7. Before you finish, check

Run `node scripts/check.mjs src` (from an installed copy: `node omakase/scripts/check.mjs src`). It flags pills, grey fills, dark blocks, side sheets, gradients, hard-coded colours and emoji. Then:

1. No element looks like a pill/badge/tag. Search your code for `rounded-full`, `badge`, `chip`, `pill`, `tag`.
2. Exactly one primary (ultramarine) button per view.
3. No grey strip or grey selected state; no side sheet; no dark block anywhere.
4. Every colour, radius and shadow comes from a token.
5. Counts and progress use ratio bars with plain-text numbers.
6. Copy is sentence case, verb-first, says what happens.
7. Compare your screen with `docs/screenshots/`: same calm density, white cards on the bloomed canvas.
8. Switch `data-theme` to `dark` and look again: nothing should disappear (icons, borders, marks).

## 8. Extending

New component: add its CSS to `css/components.css` with the `om-` prefix and token variables only, run `node scripts/build.mjs`, add a typed wrapper in `react/components/`, export it from `react/index.ts`, and document it in `docs/components.md` (what it replaces, when to use it). Keep it consistent with sections 2 and 3. If a request conflicts with these rules, follow the request but say which rule it breaks.
