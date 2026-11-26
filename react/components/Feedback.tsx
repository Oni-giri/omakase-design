import * as React from 'react';
import { cx } from '../cx';
import { StatusGlyph } from './Status';

/** Centered dialog over a scrim. Never a side sheet. Esc and scrim click close it. */
export function Modal({ open, title, onClose, footer, children, width = 560 }: { open: boolean; title: string; onClose: () => void; footer?: React.ReactNode; children: React.ReactNode; width?: number }) {
  React.useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="om-overlay" onClick={onClose}>
      <div className="om-modal" role="dialog" aria-modal="true" aria-label={title} style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="om-modal-h">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} style={{ marginLeft: 'auto', border: 0, background: 'transparent', width: 36, height: 36, borderRadius: 8, cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 18 }}>×</button>
        </div>
        <div className="om-modal-b">{children}</div>
        {footer && <div className="om-modal-f">{footer}</div>}
      </div>
    </div>
  );
}

/** Bottom-centre confirmation. `pending` shows a spinner; `done` a check and an optional action such as Undo. */
export function Toast({ state, children, action }: { state: 'pending' | 'done' | 'error'; children: React.ReactNode; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="om-toast-wrap">
      <div className="om-toast" role="status">
        {state === 'pending' ? <span className="om-spin" aria-hidden="true" /> : <StatusGlyph status={state === 'done' ? 'done' : 'returned'} />}
        <span>{children}</span>
        {action && <button type="button" className="om-toast-act" onClick={action.onClick}>{action.label}</button>}
      </div>
    </div>
  );
}

/** Dark floating bar for actions on selected rows. */
export function BulkBar({ count, onClear, children }: { count: number; onClear: () => void; children: React.ReactNode }) {
  if (count === 0) return null;
  return (
    <div className="om-bulk" role="toolbar" aria-label="Bulk actions">
      <span style={{ fontWeight: 600, marginRight: 8 }}>{count} selected</span>
      <span aria-hidden="true" style={{ width: 1, height: 18, background: 'rgba(255,255,255,.18)', marginRight: 4 }} />
      {children}
      <button type="button" className="om-bulk-b" aria-label="Clear selection" onClick={onClear}>×</button>
    </div>
  );
}
export function BulkAction(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className="om-bulk-b" {...props} />;
}

/** An error where it happened: bold cause, one sentence on what it means and who it goes to, then the next actions. */
export function InlineAlert({ title, children, actions }: { title: React.ReactNode; children?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="om-alert" role="alert">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#B42318" strokeWidth="1.6" aria-hidden="true" style={{ flex: 'none', marginTop: 1 }}><circle cx="8" cy="8" r="6" /><path d="M8 4.5v4M8 10.8v.4" /></svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <strong style={{ fontWeight: 600 }}>{title}</strong>
        {children && <span style={{ color: 'var(--ink-2)' }}>{children}</span>}
        {actions && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>{actions}</div>}
      </div>
    </div>
  );
}

/** One calm sentence in a dashed box, with an optional action. */
export function EmptyState({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return <div className="om-empty" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}><span style={{ flex: 1 }}>{children}</span>{action}</div>;
}

export interface Step { label: React.ReactNode; state: 'done' | 'now' | 'todo'; time?: string; /** 0 to 100, shown under the current step */ progress?: number }
/** A long-running job as steps. Always include the final cleanup step. */
export function RunSteps({ steps, label = 'Run steps' }: { steps: Step[]; label?: string }) {
  return (
    <ol aria-label={label} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {steps.map((s, i) => (
        <li key={i} className={cx('om-step', s.state === 'now' && 'om-step-now', s.state === 'todo' && 'om-step-todo')}>
          {s.state === 'now' ? <span className="om-spin-d" aria-hidden="true" /> : <StatusGlyph status={s.state === 'done' ? 'done' : 'open'} />}
          <span style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
            {s.label}
            {s.state === 'now' && s.progress != null && (
              <span className="om-ratio" style={{ width: '100%', maxWidth: 320 }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(s.progress)}>
                <span style={{ width: `${s.progress}%`, background: 'var(--accent)' }} />
              </span>
            )}
          </span>
          {s.time && <span className="om-step-t">{s.time}</span>}
        </li>
      ))}
    </ol>
  );
}

/** One line in an activity feed: glyph, sentence, reference, time, unread dot. */
export function ActivityItem({ glyph, children, reference, time, unread }: { glyph: React.ReactNode; children: React.ReactNode; reference?: React.ReactNode; time: string; unread?: boolean }) {
  return (
    <li className="om-act">
      {glyph}<span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      {reference && <span className="om-mono" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{reference}</span>}
      <span style={{ fontSize: 12, color: 'var(--ink-subtle)', minWidth: 64, textAlign: 'right' }}>{time}</span>
      {unread ? <span className="om-unread" aria-label="Unread" /> : <span style={{ width: 7 }} />}
    </li>
  );
}
