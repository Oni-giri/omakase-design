---
name: omakase
description: Use for any web UI work in this project (new pages, components, restyling, reviewing UI). Installs the Omakase design system (light, quiet, drawn glyphs and ratio bars, never pills) from github.com/Oni-giri/omakase-design and follows its rules.
---

# Omakase

This project's UI follows the Omakase design system. "The chef chooses": the design decisions are made; your job is to apply them, not to redesign.

## 1. Make sure it is installed

Look for an `omakase/` folder (usually `src/omakase/` or `./omakase/`) containing `AGENTS.md` and `VERSION`.

- Missing: run `bash <this skill's folder>/install.sh` from the project root (pass a target folder as the first argument to choose where it goes). It clones the repo, copies the CSS, tokens, icons, docs, the style check and, if the project uses React, the React components, and records the commit in `VERSION`.
- Present and the user asks to update the design system (or the UI to "the latest Omakase"): follow "Updating" below.
- No network or git: tell the user, and ask them to run the script themselves or to add the folder by hand.

## Updating

1. Note the current version: first word of `omakase/VERSION`.
2. Run `bash <this skill's folder>/install.sh` (same target folder). It installs the latest release and prints the old and new versions.
3. Open `omakase/CHANGELOG.md`. For every version newer than the old one, oldest first, apply its **Upgrade steps** to the app's code. Patch releases usually need nothing.
4. Run `node omakase/scripts/check.mjs src`, fix what it finds, and look at the app (both themes if it offers dark).
5. Tell the user: old → new version, what changed for them, which upgrade steps you applied, anything you skipped and why.

## 2. Wire it up once

Follow section 1 of `omakase/AGENTS.md` for the stack the script reported:

- React: import `omakase/css/omakase.css` once in the entry file and wrap the app in `<AppRoot>` from `omakase/react`.
- Plain HTML or another framework: link `omakase/css/omakase.css` and put `class="om-app om-canvas"` on `<body>`.
- Tailwind v3: add `presets: [require('./<path>/omakase/tokens/tailwind.preset.cjs')]`. Tailwind v4: import `omakase/tokens/tailwind-v4.css` after `omakase/css/omakase.css`.

Then pick, without asking unless it is unclear:
- Density: dense (default) for tools and dashboards used all day; comfortable (`om-comfy`, `<AppRoot density="comfortable">`) for public sites, stores, docs and consumer apps.
- Theme: light by default; `data-theme="auto"` when the user wants dark mode to follow the system, `"dark"` to force it.

Do not copy token values into the app's own CSS; always reference the variables.

## 3. Before building any screen

1. Look at the images in `omakase/docs/screenshots/`: that is the target look and density.
2. Read `omakase/AGENTS.md` fully: the "Never" list, the "I need… → use" table, the words rules.
3. Find the matching recipe in `omakase/docs/patterns.md` (list, detail, settings, dashboard, phone) and the components in `omakase/docs/components.md`.

Prefer existing components. If something is missing, build it from the same tokens and classes, keep the `om-` look, and mention it in your summary so it can be added to the system.

## 4. Before you finish

1. Run `node omakase/scripts/check.mjs src` (or the folders that hold UI code). Fix every hit, or mark a line that is genuinely fine with an `omakase-ignore` comment and say why.
2. Go through the checklist in section 7 of `omakase/AGENTS.md`, including the dark-theme look if the app offers it.
3. If you can run the app and take a screenshot, compare it with `omakase/docs/screenshots/`.
4. In your summary, list anything where a request forced you to break a rule, and which rule.
