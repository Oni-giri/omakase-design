// Rebuilds every generated file from tokens/tokens.json and css/components.css.
// Run: node scripts/build.mjs   (no dependencies)
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const write = (p, s) => { writeFileSync(new URL(p, root), s); console.log('wrote', p); };

const t = JSON.parse(read('tokens/tokens.json'));
const theme = t.color.themes[0].id;
const val = (tok) => (typeof tok.value === 'string' ? tok.value : tok.value[theme]);
const cssName = (n) => n.replace(/\./g, '\\.');
const banner = '/* Omakase — generated from tokens/tokens.json by scripts/build.mjs. Do not edit by hand. */\n';

// 1. tokens.css: CSS custom properties + one class per type style
const lines = [];
lines.push(':root {');
for (const c of t.color.tokens) lines.push(`  --${cssName(c.name)}: ${val(c)};`);
for (const fam of ['spacing', 'radius', 'shadow', 'blur']) for (const x of t[fam].tokens) lines.push(`  --${cssName(x.name)}: ${val(x)};`);
for (const [k, v] of Object.entries(t.type.families)) lines.push(`  --font-${k}: ${v};`);
lines.push('}');
// Further themes: overrides only. data-theme="dark" forces it; data-theme="auto" follows the OS.
for (const th of t.color.themes.slice(1)) {
  const over = [];
  for (const c of t.color.tokens) if (typeof c.value === 'object' && c.value[th.id]) over.push(`  --${cssName(c.name)}: ${c.value[th.id]};`);
  for (const x of t.shadow.tokens) if (typeof x.value === 'object' && x.value[th.id]) over.push(`  --${cssName(x.name)}: ${x.value[th.id]};`);
  lines.push(`[data-theme="${th.id}"] {`, ...over, '}');
  lines.push(`@media (prefers-color-scheme: ${th.id}) {`, `  [data-theme="auto"] {`, ...over.map((l) => '  ' + l), '  }', '}');
}
for (const g of t.type.groups) for (const s of g.styles) {
  const decl = [`font-family: var(--font-${s.family || g.family})`, `font-size: ${s.fontSize}`, `line-height: ${s.lineHeight}`, `font-weight: ${s.fontWeight}`];
  if (s.letterSpacing) decl.push(`letter-spacing: ${s.letterSpacing}`);
  if (s.name === 'overline') decl.push('text-transform: uppercase');
  lines.push(`.om-text-${s.name} { ${decl.join('; ')}; }`);
}
const tokensCss = banner + lines.join('\n') + '\n';
write('tokens/tokens.css', tokensCss);

// 2. omakase.css: fonts + tokens + components, the one file an app includes
const fonts = '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");\n';
write('css/omakase.css', fonts + tokensCss + '\n' + read('css/components.css'));

// 3. Tailwind v3 preset (CommonJS)
const colors = Object.fromEntries(t.color.tokens.map((c) => [c.name, `var(--${c.name})`]));
const spacing = Object.fromEntries(t.spacing.tokens.map((x) => [x.name.replace('space-', 'om-'), x.value]));
const radius = Object.fromEntries(t.radius.tokens.map((x) => [x.name.replace('radius-', 'om-'), x.value]));
const shadow = Object.fromEntries(t.shadow.tokens.map((x) => [x.name.replace('shadow-', 'om-'), x.value]));
const preset = {
  theme: { extend: {
    colors, spacing, borderRadius: radius, boxShadow: shadow,
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'] },
    fontSize: Object.fromEntries(t.type.groups.flatMap((g) => g.styles).map((s) => [s.name, [s.fontSize, { lineHeight: s.lineHeight, fontWeight: String(s.fontWeight), ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}) }]]))
  } }
};
write('tokens/tailwind.preset.cjs', banner + '// Tailwind v3: presets: [require("omakase-design/tailwind")]. Load css/omakase.css (or tokens/tokens.css) too, so the variables exist.\nmodule.exports = ' + JSON.stringify(preset, null, 2) + ';\n');

// 4. Tailwind v4 theme (@theme maps utilities to the same variables)
const v4 = ['@theme inline {'];
for (const c of t.color.tokens) v4.push(`  --color-${c.name}: var(--${c.name});`);
for (const x of t.radius.tokens) v4.push(`  --radius-${x.name.replace('radius-', 'om-')}: var(--${x.name});`);
for (const x of t.shadow.tokens) v4.push(`  --shadow-${x.name.replace('shadow-', 'om-')}: var(--${x.name});`);
v4.push('  --font-sans: Inter, system-ui, sans-serif;', '  --font-mono: "JetBrains Mono", ui-monospace, monospace;', '}');
write('tokens/tailwind-v4.css', banner + '/* Tailwind v4: @import "tailwindcss"; @import "omakase-design/css"; @import "omakase-design/tailwind-v4"; */\n' + v4.join('\n') + '\n');

// 5. React icon components from icons/*.svg (currentColor strokes follow the text colour, so they work in both themes)
import { readdirSync } from 'node:fs';
const toJsx = (svg) => svg
  .replace(/<svg[^>]*viewBox="([^"]+)"[^>]*>/, (_, vb) => `<svg width={size} height={size} viewBox="${vb}" fill="none" aria-hidden="true" className={className}>`)
  .replace(/stroke-width=/g, 'strokeWidth=').replace(/stroke-linecap=/g, 'strokeLinecap=').replace(/stroke-linejoin=/g, 'strokeLinejoin=')
  .replace(/\n/g, '');
const svgAttrs = (svg) => { const m = svg.match(/<svg([^>]*)>/)[1]; return { stroke: (m.match(/stroke="([^"]+)"/) || [])[1], sw: (m.match(/stroke-width="([^"]+)"/) || [])[1], lc: (m.match(/stroke-linecap="([^"]+)"/) || [])[1], lj: (m.match(/stroke-linejoin="([^"]+)"/) || [])[1] }; };
const files = readdirSync(new URL('icons/', root)).filter((f) => f.endsWith('.svg')).sort();
let out = banner.replace('/*', '//').replace(' */', '') + "import * as React from 'react';\n\nexport interface IconProps { size?: number; className?: string }\n";
for (const f of files) {
  const svg = read('icons/' + f).trim();
  const a = svgAttrs(svg);
  const inner = toJsx(svg).replace(/<svg[^>]*>/, '').replace('</svg>', '');
  const name = 'Icon' + f.replace('.svg', '').split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
  out += `export function ${name}({ size = 16, className }: IconProps) {\n  return <svg width={size} height={size} viewBox="${svg.match(/viewBox="([^"]+)"/)[1]}" fill="none" stroke="${a.stroke}" strokeWidth="${a.sw}" strokeLinecap="${a.lc}" strokeLinejoin="${a.lj}" aria-hidden="true" className={['om-ic', className].filter(Boolean).join(' ')}>${inner}</svg>;\n}\n`;
}
write('react/icons.tsx', out);
