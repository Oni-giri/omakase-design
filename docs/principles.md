# Omakase — principles

*The chef chooses.* An opinionated interface style for developer tools and personal apps: light, joyous and quiet, with the decisions already made (one accent, drawn glyphs, ratio bars, centred pop-ups) so a new app starts from a finished taste instead of a blank page. First drawn for Holdout, an issue tracker for coding agents; reused for every app after it. It should feel like a clean SF-style SaaS tool, never "vibecoded": no pastel pills, no grain, no heavy dark blocks, no side sheets.

## Principles

1. **Light canvas, colour at the corners.** The page is `canvas` (#F7F8FC) with four soft radial blooms in the corners: `bloom-sky` top-left, `bloom-pink` top-right, `bloom-sun` bottom-right, `bloom-mint` bottom-left, at 38 to 50% alpha (class `om-canvas`). Content always sits on crisp white `surface` cards. No texture of any kind: no grain, dots, grids or topographic lines.
2. **Drawn glyphs, not pills.** Status is a 14px circle that fills as work moves forward, followed by plain text (`om-st`). Kinds and labels are a 16×5 colour bar plus text (`om-mark`). Counts and proportions are ratio bars (`om-ratio`). If you are about to draw a rounded box with text in it, use one of these instead.
3. **Ratio bars scale.** A 6px bar shows proportions (passed vs failed, public vs sealed, done vs left) and works the same for 3 or 300 items. The numbers follow in plain text.
4. **One accent.** Ultramarine `accent` (#3B5BFD) for the primary action, focus, selection and progress. Everything else is ink on white. Green `success` is reserved for Accept, rose for failure and urgent.
5. **Colour lives in small marks.** Status glyphs, label bars, project squares, role glyphs. Text stays ink. No tinted row backgrounds per status, no coloured cards.
6. **Centered, never sideways.** Pop-ups open centered over a scrim. No side sheets or drawers.
7. **Glass only for chrome.** The sidebar, properties rail and phone dock are 58% white with a 16px blur over the blooms. Cards are never glass.
8. **Not grey.** Avoid large grey fills: strips, tab bars and footers are white or `surface-sunken` at most; hover is a faint blue wash (`accent-wash`), not grey.

## Colour

- Grounds: `canvas` (page), `surface` (cards), `surface-sunken` (footers, inner panels), `glass` (chrome).
- Lines: `line` for card borders, `line-soft` for dividers inside cards, `line-strong` for field borders.
- Text: `ink` (titles, main text), `ink-2` (table cells), `ink-muted` (supporting), `ink-subtle` (IDs, times, counts). All pass 4.5:1 on white and on the canvas.
- Accent: `accent` fills, `accent-strong` for links and accent text, `accent-tint` and `accent-wash` for selection and hover.
- Status: `status-spec` (slate, dashed), `status-open`, `status-progress` (blue), `status-review` (amber), `status-returned` (rose), `status-done` (emerald). Progress and returned differ in lightness as well as hue.
- Data: `ratio-pass`, `ratio-fail`, `ratio-sealed` hatched with `ratio-sealed-light`, on `ratio-track`.
- Labels: `label-bug`, `label-feature`, `label-perf`, `label-security`; chore uses `mark-advisory`.
- Projects get a bright 8px square: `project-sky`, `project-pink`, `project-amber`.
- There are no dark surfaces. Toasts and the bulk-action bar are white (`toast`) and float on `shadow-toast`.

## Type

Inter for everything, JetBrains Mono for machine things (IDs, agent names, branches, commits, paths, diffs, keyboard keys). Both load from Google Fonts.

- Page title 20px semibold (22px on detail pages), section 15px, card title 14px, body 13.5px, small 12.5px, caption 12px, overline 11.5px uppercase.
- Weights: 400 and 500 for text, 600 for titles. Tight tracking (−0.01 to −0.02em) only on titles 20px and up.
- Numbers in tables and bars use tabular figures.

## Space, radius, depth

- Spacing on a 2px rhythm with named steps: 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 48. Cards pad 18px; table cells 14px; main column 28px.
- Radius: 3 for bars, 7 for tabs, 8 for buttons and fields, 10 for panels and toasts, 12 for cards, 16 for modals and phone cards. Text never sits in a fully rounded pill.
- Depth: `shadow-card` on every card (hairline plus a long soft fall), `shadow-menu` for menus, `shadow-modal` for dialogs, `shadow-toast` for toasts. Active tabs and nav items use a 1px ring (`shadow-ring`) instead of a border.

## Layout

- Desktop: a 220px glass sidebar (logo, main pages, projects, saved views, workspace settings at the bottom), a flexible main column, and on detail pages a 300px glass properties rail on the right.
- Lists: a "Needs you" row of cards on top (with an Activity switch), then one card holding status tabs, a filter bar and the table, ending in a strip of keyboard shortcuts.
- Detail pages: breadcrumb, title, status line, an action bar for the current state, then cards stacked by importance.
- Phone: one column, 16px cards, a large 30px title, actions docked at the bottom in a glass bar, a four-item tab bar.

## Iconography

Single-weight stroke icons on a 16px grid, 1.5px stroke, round joins, drawn in `ink` (or the role colour for role glyphs). They sit 16px in navigation and 14px inline. Status, priority and marks are drawn in CSS, not icons. No emoji anywhere. The SVGs are in `icons/`; the example logo is in `logos/`.

## Voice

- Plain, short sentences in sentence case. Say what will happen and who it goes to: "Send back for round 4", "This is a problem with the tests, so it comes to you."
- Name things by behaviour, not mechanism. Errors give the cause in one bold line, then the next action.
- Buttons start with a verb. Empty states are one calm sentence ("Nothing waiting on you. The agents are working on the rest.").
- Agent names in mono, lowercase (impl-claude, reviewer-opus).

## Motion

Short and functional: 150ms colour and transform transitions, an 0.8s spinner, a 1.2s fill on hold-to-confirm buttons. Respect reduced motion (slower spinners, no movement).

