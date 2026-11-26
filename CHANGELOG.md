# Changelog

Every release of Omakase, newest first. Versions follow [semantic versioning](https://semver.org): a patch (0.2.**1**) changes how things look without touching app code; a minor (0.**3**.0) adds things and may ask for small code changes, listed under **Upgrade steps**; a major (**1**.0.0) can break apps.

**For agents updating an app:** read every entry newer than the version in your app's `omakase/VERSION`, oldest first, and apply each **Upgrade steps** list to the app's code. Then run `node omakase/scripts/check.mjs src` and look at the app in both themes.

## [0.2.1] — 2026-11-27

### Changed
- Dark theme is now **graphite**: a neutral near-black with no colour cast (`canvas` #0F1012, cards #18191C), replacing the navy of 0.2.0. Blooms are fainter in dark. Light theme unchanged.

### Upgrade steps
- None in app code: reinstall to get the new `tokens.css` / `omakase.css`.
- If the app copied any dark colour value instead of using `var(--token)`, replace it with the token.

## [0.2.0] — 2026-11-27

### Added
- **Dark theme**: `data-theme="dark"` forces it, `data-theme="auto"` follows the OS. React: `<AppRoot theme="dark" | "auto">`.
- **Comfortable density** for public and consumer pages: `om-comfy` next to `om-app`, or `<AppRoot density="comfortable">` (15px text, 60px rows).
- **Label shapes**: marks differ by shape as well as colour (`om-mk-split`, `om-mk-dots`, `om-mk-hollow`, `om-mk-short`; `<Mark shape="…">`). Built-in labels have one automatically. Max 8 label kinds per app.
- **Inline icons** that follow the text colour: `react/icons.tsx` (`IconIssues`, `IconSearch`, …), class `om-ic`.
- Catalogue pieces: `TopBar`, `Container`, `Tile`, `CodeBlock`, `Sparkline`, `SearchField`, `om-prose`, `om-card-link`.
- Tokens: `surface-hover`, `surface-inset`, `glass-strong`, `glass-line`, `alert`, `scrim`.
- Style check rule `icon-img`; example `examples/brewhunt.html`; `docs/field-tests.md`.

### Changed
- Every colour in the components now comes from a token (needed for dark).
- Ratio bar segments are separated by a 1px gap.
- `AppRoot` takes `theme` and `density` props.

### Upgrade steps
1. Replace every icon used as `<img src="…/icons/x.svg">` with the matching `Icon…` component (React) or the inline SVG with `class="om-ic"` (HTML). The style check flags them as `icon-img`.
2. Replace any hard-coded copies of these old values with tokens: `#E4E4E9` → `var(--line)`, `#F4F4F6` → `var(--surface-hover)`, `#63636E` / `#71717A` → `var(--ink-subtle)`, `#E11D48` → `var(--alert)`, `rgba(24,24,27,.38)` → `var(--scrim)`.
3. Custom labels: give each a `shape` so no two labels differ by colour alone; if the app has more than 8 label kinds, show the rest as plain text.
4. Public or consumer-facing pages: switch to comfortable density. Tools used all day stay dense.
5. Only if the app should offer dark mode: set `data-theme="auto"` on `<html>` (or a user setting), then check every screen in dark.

## [0.1.0] — 2026-11-26

First release.

### Added
- Tokens (`tokens.json`, CSS variables, Tailwind v3 preset and v4 theme), `css/omakase.css`, about 40 React components.
- `AGENTS.md` rules and checklist, component catalogue, page patterns, list and detail examples.
- Drop-in agent skill (`skill/omakase/`), installer and style check (`scripts/check.mjs`).
- Floating bars (toasts, bulk actions) are white; the system has no dark surfaces in the light theme.
