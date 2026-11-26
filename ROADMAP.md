# Roadmap

## v0.1 (done)
Tokens, `omakase.css`, about 40 React components, agent instructions, a drop-in agent skill with an installer and a style check, examples for a list and a detail page.

## v0.2 (now)
Dark theme, comfortable density, label shapes so meaning never rests on colour alone, inline icons, catalogue components (tile, code block, sparkline, search, top bar, prose) from the Brewhunt field test.

## v0.3: covering more of a typical web app
- Components: date picker, combobox with search, pagination, file drop zone, tooltip (for non-essential hints only), toggle group, tree list, diff viewer.
- Settings page and dashboard examples, plus a phone example.
- Simple charts in the style: line and bar helpers on top of tokens.
- Smarter style check: parse JSX instead of lines, count primary buttons per view.

## v0.4: packaging
- Guidance and components for real images (screenshots, avatars) and a landing page, from the next field test.
- Publish as an npm package with compiled React components (ESM + types), so copying stops being needed.
- Storybook-style gallery page generated from `react/`.

## v1: one system across all projects
- Per-project accent and bloom presets (one accent each, same rules).
- Figma or Penpot library generated from `tokens.json`.
- Visual regression tests on the examples.
