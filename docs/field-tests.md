# Field tests

Building a real screen of a different app is how the system finds out which rules are general and which were just Holdout's.

## Brewhunt (public Homebrew package store), November 2026

Page: a package detail page with "New this week" (`examples/brewhunt.html`), light and dark.

What held up:
- Glyphs, marks and ratio bars worked unchanged for a catalogue: categories as marks, "installed on request" as a ratio bar.
- Cards on the bloomed canvas, the status tabs strip (as page tabs) and the property rows carried over directly.

What was missing, now added:
- A layout without a sidebar: `TopBar` and `Container`.
- Something to stand in for app or package icons: `Tile`.
- An install command with copy: `CodeBlock`. A trend next to a number: `Sparkline`. A big search: `SearchField`.
- Styling for long rendered text (a README): `om-prose`.
- A roomier size for public pages: comfortable density (`om-comfy`).

What broke, now fixed:
- In the dark theme, icons used as `<img>` with black strokes disappeared. Icons are now inline and use `currentColor`; `<img>` icons are forbidden in `AGENTS.md`.
- A long placeholder in the top-bar search was cut off: keep search placeholders under about 25 characters.

Still open:
- Real images (screenshots, avatars, photos): no guidance yet on frames, ratios or placeholders.
- A landing page with marketing copy has not been tried.
