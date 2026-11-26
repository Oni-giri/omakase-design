# Roadmap

## v0.1 (now)
Tokens, `omakase.css`, about 40 React components, agent instructions, examples for a list and a detail page.

## v0.2: covering more of a typical web app
- Components: date picker, combobox with search, pagination, file drop zone, tooltip (for non-essential hints only), toggle group, tree list, diff viewer, code block.
- Settings page and dashboard examples, plus a phone example.
- Simple charts in the style: line, bar and sparkline helpers on top of tokens.
- A `check` script that flags pills (`rounded-full` + background + text), raw hex values and grey strips in an app's code.

## v0.3: themes and packaging
- A dark theme for the same tokens (calm, not black: deep navy surfaces, the blooms as dim glows).
- Publish as an npm package with compiled React components (ESM + types), so copying stops being needed.
- Storybook-style gallery page generated from `react/`.

## v1: one system across all projects
- Per-project accent and bloom presets (one accent each, same rules).
- Figma or Penpot library generated from `tokens.json`.
- Visual regression tests on the examples.
