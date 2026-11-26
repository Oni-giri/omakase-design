# Page patterns

Start from one of these before inventing a layout. All pages sit in `Shell` (sidebar, main, optional rail) on the bloomed canvas, with content on white cards.

## List page (the default screen)

Reference: `examples/app.html`, `docs/screenshots/list-page.png`.

1. Header row: page title (20px) left; search/⌘K trigger and the one primary button ("New …") right.
2. "Needs you": a section title with a muted hint, then a grid of cards (min 320px) for items that wait on the person. Each card: StatusGlyph + mono ID, title, one line or a RatioBar, one or two buttons. If nothing waits, an `EmptyState` sentence. Optional `Segmented` switch to an Activity feed.
3. One card holding the list: `StatusTabs` → filter bar (Filter button, active `FilterCondition`s, dashed "Save as view", Sort/Group on the right) → `om-table` → a footer strip of keyboard shortcuts on `surface-sunken`.
4. Rows: checkbox, priority glyph, mono ID, title (500 weight), up to two Marks; then status, ratio bar with numbers, other plain-text columns, relative time. The whole row is clickable.
5. Selecting rows shows the `BulkBar` floating at the bottom centre.

## Detail page

Reference: `examples/react/DetailPage.tsx`, `docs/screenshots/detail-page.png`.

1. Breadcrumb, then a 22px title, then a status line (StatusGlyph, priority, marks, progress text).
2. If the item needs a decision, an action bar card under the title: one line on the situation, then the buttons for this state only.
3. Cards stacked by importance: the current thing first (current round, current run), then the content (spec, description), history, discussion last.
4. Right rail (300px, glass): Properties (`Prop` rows), relations, health or stats, checks. No actions that change the main content live only in the rail.
5. Discussion: comments mixed with history events in one list; each comment can carry its audience as a `Mark`; composer at the bottom with the primary "Comment" button.

## Settings page

1. Title and one sentence on what the page controls; connection status as a small white box top right (green dot + "Connected · name · seen 12 s ago").
2. One card per topic. Choices between options: large radio cards in a grid (2px accent ring on the selected one). Fields in a 2 or 3 column grid. "Test connection" button with a pending → result line; "Save" as the primary button bottom right.
3. Rules: a card of `Switch` rows (title + one-line explanation); rules that cannot be turned off stay visible, disabled, "Always on".
4. Explanations of how something works: a numbered row of 3 to 5 small step cards, not a diagram image.
5. History: a table of recent runs/jobs with ratio bars and status glyphs.

## Dashboard

1. A row of `StatTile`s (3 to 4): label, big number, a ratio bar when there is a proportion, one line of context.
2. Below, cards with tables or feeds. Charts: thin lines and bars in `--accent` and the status colours on white, no gridline clutter, numbers labelled directly.

## Phone

1. Large 30px title, then cards with 16px radius stacked in one column, 16px side padding.
2. Primary actions in a glass dock at the bottom (`om-dock`), 44px buttons; a one-line reason above a locked action.
3. Bottom tab bar with four destinations max; the inbox-like screen first.
