import * as React from 'react';
import { cx } from '../cx';

/** Label above, control, hint or error below. Pass the control as children with the same id. */
export function Field({ id, label, hint, error, children }: { id: string; label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} className="om-label">{label}</label>
      {children}
      {error ? <span className="om-hint" style={{ color: 'var(--text-danger)' }} role="alert">{error}</span> : hint && <span className="om-hint">{hint}</span>}
    </div>
  );
}
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => <input ref={ref} className={cx('om-fld', className)} {...p} />);
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...p }, ref) => <select ref={ref} className={cx('om-fld', className)} {...p} />);
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...p }, ref) => <textarea ref={ref} className={cx('om-fld', className)} style={{ resize: 'vertical' }} {...p} />);
Input.displayName = 'Input'; Select.displayName = 'Select'; Textarea.displayName = 'Textarea';

export function Checkbox(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return <input type="checkbox" className="om-chk" {...props} />;
}

/** A settings rule: switch, title and one line of explanation. `locked` rules stay visible, disabled, marked "Always on". */
export function Switch({ checked, onChange, title, description, locked }: { checked: boolean; onChange?: (v: boolean) => void; title: string; description?: React.ReactNode; locked?: boolean }) {
  const id = React.useId();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <button type="button" role="switch" aria-checked={checked} aria-labelledby={id} disabled={locked} className={cx('om-switch', checked && 'om-switch-on')} onClick={() => onChange?.(!checked)} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
        <span id={id} style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</span>
        {description && <span className="om-hint">{description}</span>}
      </div>
      {locked && <span className="om-hint">Always on</span>}
    </div>
  );
}

/** One active filter: field, operator, value, remove. Not a pill. */
export function FilterCondition({ field, op, value, onRemove }: { field: string; op: string; value: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="om-cond">
      <span className="om-cond-k">{field}</span><span className="om-cond-op">{op}</span><span>{value}</span>
      <button type="button" className="om-cond-x" aria-label={`Remove ${field} filter`} onClick={onRemove}>×</button>
    </span>
  );
}

/** A dropdown menu. Place inside a `position: relative` wrapper next to its trigger. */
export function Menu({ open, label, items }: { open: boolean; label: string; items: Array<{ label: React.ReactNode; glyph?: React.ReactNode; hint?: string; onSelect: () => void }> }) {
  if (!open) return null;
  return (
    <div className="om-menu om-menu-pop" role="menu" aria-label={label}>
      {items.map((it, i) => <button key={i} type="button" role="menuitem" className="om-menu-it" onClick={it.onSelect}>{it.glyph}{it.label}{it.hint && <span className="om-menu-k">{it.hint}</span>}</button>)}
    </div>
  );
}
