import * as React from 'react';
import { cx } from '../cx';

export type Status = 'spec' | 'open' | 'progress' | 'review' | 'returned' | 'done';
const statusClass: Record<Status, string> = { spec: 'om-st-spec', open: 'om-st-open', progress: 'om-st-prog', review: 'om-st-review', returned: 'om-st-ret', done: 'om-st-ok' };

export interface StatusGlyphProps { status: Status; children?: React.ReactNode; className?: string }
/** A 14px drawn circle that fills as work moves forward, followed by plain text. Without children it is decorative (aria-hidden). */
export function StatusGlyph({ status, children, className }: StatusGlyphProps) {
  return <span className={cx('om-st', statusClass[status], className)} aria-hidden={children ? undefined : true}>{children}</span>;
}

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low' | 'none';
const priorityLabel: Record<PriorityLevel, string> = { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low', none: 'No priority' };
const priorityClass: Record<PriorityLevel, string> = { urgent: 'om-pri-urgent', high: 'om-pri-high', medium: 'om-pri-med', low: 'om-pri-low', none: 'om-pri-none' };

export interface PriorityProps { level: PriorityLevel; showLabel?: boolean }
/** Three rising bars; urgent is a rose square with an exclamation mark. */
export function Priority({ level, showLabel }: PriorityProps) {
  const glyph = <span className={cx('om-pri', priorityClass[level])} role={showLabel ? undefined : 'img'} aria-label={showLabel ? undefined : `${priorityLabel[level]} priority`} aria-hidden={showLabel ? true : undefined} />;
  return showLabel ? <span className="om-tline">{glyph}{priorityLabel[level]}</span> : glyph;
}
