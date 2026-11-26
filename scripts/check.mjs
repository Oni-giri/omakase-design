#!/usr/bin/env node
// Omakase style check: flags things the system forbids in an app's UI code.
// Usage: node check.mjs [dir ...]   (default: src)   Exit code 1 if anything is found.
// It is a heuristic: read each hit and fix it, or leave it if it is genuinely fine (say why).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const dirs = process.argv.slice(2).length ? process.argv.slice(2) : ['src'];
const exts = new Set(['.tsx', '.jsx', '.ts', '.js', '.html', '.vue', '.svelte', '.astro', '.css', '.scss']);
const skip = /(^|\/)(node_modules|dist|build|\.next|\.git|omakase)(\/|$)/;

const rules = [
  { id: 'pill', msg: 'Looks like a pill/badge (rounded-full with a background and text). Use Mark, StatusGlyph or RatioBar.',
    test: (l) => /rounded-full/.test(l) && /\bbg-(?!transparent)/.test(l) && /\b(px-|text-xs|text-\[1[0-2]px\])/.test(l) },
  { id: 'pill-name', msg: 'Component or class named badge/chip/pill/tag. Use Mark, StatusGlyph or RatioBar.',
    test: (l) => /(<|class(Name)?=["'{`][^"'`]*\b)(Badge|Chip|Pill|Tag)\b|\b(badge|chip|pill)(-[a-z]+)?\b/.test(l) && !/om-/.test(l) },
  { id: 'side-sheet', msg: 'Side sheet or drawer. Use a centered Modal.',
    test: (l) => /<(Sheet|Drawer|SideSheet|SlideOver)\b|\b(drawer|side-sheet|slide-over)\b/i.test(l) },
  { id: 'grey-strip', msg: 'Grey fill (gray/zinc/slate/neutral 100-300). Strips and selected states are white or accent-wash.',
    test: (l) => /\bbg-(gray|zinc|slate|neutral|stone)-(100|200|300)\b/.test(l) },
  { id: 'dark-block', msg: 'Dark surface. Omakase has none: floating bars are white with shadow-toast.',
    test: (l) => /\bbg-(gray|zinc|slate|neutral|stone)-(800|900|950)\b|\bbg-black\b/.test(l) },
  { id: 'raw-hex', msg: 'Hard-coded colour. Use var(--token) or the Tailwind preset names.',
    test: (l, f) => !/\.svg$/.test(f) && /(?:color|fill|stroke|background|border|shadow|outline|bg-\[|text-\[|border-\[|:)\s*["'`]?\s*#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/i.test(l) },
  { id: 'gradient', msg: 'Gradient. The only gradients allowed are the corner blooms (om-canvas) and the sealed hatch.',
    test: (l) => /(linear|radial|conic)-gradient|bg-gradient-to-/.test(l) },
  { id: 'icon-img', msg: 'Icon as <img>. Use the inline icons (currentColor) so they work in both themes.',
    test: (l) => /<img[^>]+icons\/[a-z-]+\.svg/.test(l) },
  { id: 'emoji', msg: 'Emoji in UI. Use an icon from omakase/icons or plain text.',
    test: (l) => /\p{Extended_Pictographic}/u.test(l) },
];

const hits = [];
const walk = (p) => {
  let st; try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) { if (!skip.test(p)) for (const e of readdirSync(p)) walk(join(p, e)); return; }
  if (!exts.has(extname(p)) || skip.test(p)) return;
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (/omakase-ignore/.test(line)) return;
    for (const r of rules) if (r.test(line, p)) hits.push(`${relative(process.cwd(), p)}:${i + 1}  [${r.id}] ${r.msg}`);
  });
};
dirs.forEach(walk);

// One primary button per view is hard to check statically; remind instead.
if (hits.length) {
  console.log(hits.join('\n'));
  console.log(`\n${hits.length} issue(s). Fix them, or add the comment omakase-ignore on a line that is genuinely fine.`);
  process.exit(1);
}
console.log('Omakase check: no issues found. Still verify by eye: one primary button per view, sentence-case copy.');
