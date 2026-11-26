import * as React from 'react';
import { cx } from '../cx';

export type SegmentKind = 'pass' | 'fail' | 'sealed' | 'accent';
export interface RatioSegment { value: number; kind: SegmentKind }
export interface RatioBarProps {
  segments: RatioSegment[];
  /** Total the segments are measured against. Defaults to their sum. */
  total?: number;
  /** Bar width in px (56 to 120). */
  width?: number;
  /** The numbers in plain text. Always give one: the bar itself is hidden from screen readers. */
  label?: React.ReactNode;
}
const segClass: Record<SegmentKind, string> = { pass: 'om-r-pass', fail: 'om-r-fail', sealed: 'om-r-sealed', accent: '' };

/** Proportions instead of count pills. Works the same for 3 or 300 items. */
export function RatioBar({ segments, total, width = 90, label }: RatioBarProps) {
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0);
  const bar = (
    <span className="om-ratio" style={{ width }} aria-hidden="true">
      {segments.map((s, i) => (
        <span key={i} className={segClass[s.kind]} style={{ width: sum ? `${(s.value / sum) * 100}%` : 0, background: s.kind === 'accent' ? 'var(--accent)' : undefined }} />
      ))}
    </span>
  );
  return label ? <span className="om-tline">{bar}{label}</span> : bar;
}

export type MarkKind = 'all' | 'sealed' | 'blocking' | 'advisory' | 'bug' | 'feature' | 'perf' | 'security' | 'chore';
const markClass: Record<MarkKind, string> = { all: 'om-m-all', sealed: 'om-m-sealed', blocking: 'om-m-block', advisory: 'om-m-adv', bug: 'om-l-bug', feature: 'om-l-feat', perf: 'om-l-perf', security: 'om-l-sec', chore: 'om-l-chore' };
export type MarkShape = 'solid' | 'split' | 'dots' | 'hollow' | 'short';
export interface MarkProps {
  kind?: MarkKind;
  /** Any CSS colour for a custom label. Pair it with a `shape`, so labels differ by more than hue. */
  color?: string;
  /** Bar shape. Built-in labels already have one (bug solid, feature split, perf dots, security short, chore hollow). */
  shape?: MarkShape;
  children: React.ReactNode;
}
/** A 16x5 bar plus plain text. Use it wherever you would reach for a tag, badge or pill. Max 8 label kinds per app. */
export function Mark({ kind = 'all', color, shape, children }: MarkProps) {
  return <span className={cx('om-mark', markClass[kind], shape && shape !== 'solid' && `om-mk-${shape}`)} style={color ? ({ '--m': color } as React.CSSProperties) : undefined}>{children}</span>;
}

/** Monogram tile standing in for an app or package icon. color: a token such as 'var(--project-pink)'. */
export function Tile({ text, color, large }: { text: string; color?: string; large?: boolean }) {
  return <span className={cx('om-tile', large && 'om-tile-lg')} style={color ? ({ '--t': color } as React.CSSProperties) : undefined} aria-hidden="true">{text.slice(0, 2)}</span>;
}

/** One-line command with a copy button. */
export function CodeBlock({ code, prompt = '$', label = 'Copy' }: { code: string; prompt?: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ } };
  return (
    <div className="om-code">
      {prompt && <span className="om-code-p" aria-hidden="true">{prompt}</span>}
      <code className="om-code-t">{code}</code>
      <button type="button" className="om-code-b" onClick={copy} aria-live="polite">{copied ? 'Copied' : label}</button>
    </div>
  );
}

/** A thin trend line in the accent, last point marked. Put the number next to it in text. */
export function Sparkline({ values, width = 96, height = 24, label }: { values: number[]; width?: number; height?: number; label: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * width, height - 2 - ((v - min) / span) * (height - 4)]);
  const last = pts[pts.length - 1];
  return (
    <svg className="om-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} />
      <circle cx={last[0]} cy={last[1]} r={2.5} />
    </svg>
  );
}

/** Large search field for public pages. */
export function SearchField({ placeholder, value, onChange, shortcut = '/' }: { placeholder: string; value?: string; onChange?: (v: string) => void; shortcut?: string }) {
  return (
    <label className="om-search">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ color: 'var(--ink-subtle)' }}><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
      <input type="search" placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} aria-label={placeholder} />
      {shortcut && <kbd className="om-kbd">{shortcut}</kbd>}
    </label>
  );
}

export interface ProjectLabelProps { color: string; children: React.ReactNode }
/** The 8px project square followed by the project name. color: a token such as 'var(--project-sky)'. */
export function ProjectLabel({ color, children }: ProjectLabelProps) {
  return <span className="om-proj" style={{ '--p': color } as React.CSSProperties}>{children}</span>;
}

export interface StatTileProps { label: React.ReactNode; value: React.ReactNode; detail?: React.ReactNode; ratio?: RatioBarProps }
/** A number with an optional ratio bar and one line of context. For dashboards. */
export function StatTile({ label, value, detail, ratio }: StatTileProps) {
  return (
    <div className="om-stat">
      <span className="om-stat-k">{label}</span>
      <span className="om-stat-v">{value}</span>
      {ratio && <RatioBar width={160} {...ratio} />}
      {detail && <span className="om-stat-d">{detail}</span>}
    </div>
  );
}

export interface RedactionProps { lines?: number; note: React.ReactNode }
/** Striped bars standing in for content this viewer may not see. Always say what is hidden and from whom. */
export function Redaction({ lines = 3, note }: RedactionProps) {
  const widths = ['92%', '78%', '86%', '54%', '70%', '64%'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: lines }, (_, i) => <span key={i} className="om-rbar" style={{ width: widths[i % widths.length] }} />)}
      <span className="om-hint">{note}</span>
    </div>
  );
}

export function Skeleton({ width = '100%' }: { width?: number | string }) {
  return <span className="om-skel" style={{ width }} aria-hidden="true" />;
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="om-kbd">{children}</kbd>;
}
