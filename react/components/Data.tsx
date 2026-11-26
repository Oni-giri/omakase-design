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
export interface MarkProps { kind?: MarkKind; /** Any CSS colour for a custom label. */ color?: string; children: React.ReactNode }
/** A 16x5 colour bar plus plain text. Use it wherever you would reach for a tag, badge or pill. */
export function Mark({ kind = 'all', color, children }: MarkProps) {
  return <span className={cx('om-mark', markClass[kind])} style={color ? ({ '--m': color } as React.CSSProperties) : undefined}>{children}</span>;
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
