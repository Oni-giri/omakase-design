import * as React from 'react';
import { cx } from '../cx';
import { StatusGlyph, type Status } from './Status';

export interface TabItem<K extends string> { key: K; label: string; count?: number; status?: Status }
/** The white filter strip on top of a list. Selected tab: bold with an ultramarine underline. */
export function StatusTabs<K extends string>({ items, value, onChange, label = 'Filter by status' }: { items: TabItem<K>[]; value: K; onChange: (k: K) => void; label?: string }) {
  return (
    <div className="om-tabs" role="tablist" aria-label={label}>
      {items.map((it) => (
        <button key={it.key} type="button" role="tab" aria-selected={it.key === value} className={cx('om-stab', it.key === value && 'om-stab-on')} onClick={() => onChange(it.key)}>
          {it.status && <StatusGlyph status={it.status} />}{it.label}{it.count != null && <span className="om-stab-n">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

/** Switch between 2 to 4 views of the same thing. Not for filtering lists. */
export function Segmented<K extends string>({ options, value, onChange, label }: { options: Array<{ key: K; label: React.ReactNode }>; value: K; onChange: (k: K) => void; label: string }) {
  return (
    <div className="om-seg-wrap" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.key} type="button" role="radio" aria-checked={o.key === value} className={cx('om-seg', o.key === value && 'om-seg-on')} onClick={() => onChange(o.key)}>{o.label}</button>
      ))}
    </div>
  );
}

export interface PaletteItem { id: string; label: string; hint?: string; glyph?: React.ReactNode; run: () => void }
/** ⌘K command palette: centered, anchored near the top. Up/down to move, Enter to run, Esc to close. */
export function CommandPalette({ open, onClose, groups, placeholder = 'Type a command or search…' }: { open: boolean; onClose: () => void; groups: Array<{ label: string; items: PaletteItem[] }>; placeholder?: string }) {
  const [q, setQ] = React.useState('');
  const [i, setI] = React.useState(0);
  const filtered = groups.map((g) => ({ ...g, items: g.items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length);
  const flat = filtered.flatMap((g) => g.items);
  React.useEffect(() => { setI(0); }, [q, open]);
  if (!open) return null;
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(flat.length - 1, x + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
    else if (e.key === 'Enter' && flat[i]) { flat[i].run(); onClose(); }
  };
  let n = -1;
  return (
    <div className="om-overlay om-overlay-top" onClick={onClose}>
      <div className="om-palette" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--line-soft)' }}>
          <input autoFocus className="om-palette-in" placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Command" />
          <kbd className="om-kbd">Esc</kbd>
        </div>
        <div style={{ padding: 8, maxHeight: 420, overflow: 'auto' }} role="listbox">
          {filtered.map((g) => (
            <div key={g.label}>
              <div className="om-palette-g">{g.label}</div>
              {g.items.map((it) => { n += 1; const idx = n; return (
                <button key={it.id} type="button" role="option" aria-selected={idx === i} className="om-palette-it" onMouseEnter={() => setI(idx)} onClick={() => { it.run(); onClose(); }}>
                  {it.glyph}<span style={{ flex: 1 }}>{it.label}</span>{it.hint && <span style={{ fontSize: 12, color: 'var(--ink-subtle)' }}>{it.hint}</span>}
                </button>
              ); })}
            </div>
          ))}
          {flat.length === 0 && <div style={{ padding: 16, color: 'var(--ink-muted)' }}>No matches.</div>}
        </div>
      </div>
    </div>
  );
}
