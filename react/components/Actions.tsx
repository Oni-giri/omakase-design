import * as React from 'react';
import { cx } from '../cx';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
const variantClass: Record<ButtonVariant, string> = { primary: 'om-btn-p', secondary: 'om-btn-g', success: 'om-btn-ok', danger: 'om-btn-d' };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action of a view. success: Accept/approve-final only. danger: red text on white, never a red fill. */
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Dashed border for optional "create" actions such as Save as view. */
  dashed?: boolean;
}
export function Button({ variant = 'secondary', size = 'md', dashed, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cx('om-btn', variantClass[variant], size === 'sm' && 'om-btn-sm', dashed && 'om-btn-dashed', className)} {...rest} />;
}

export interface HoldButtonProps { onConfirm: () => void; children: React.ReactNode; /** ms to hold, default 1200 */ duration?: number }
/** Press and hold to confirm a destructive action, instead of a confirmation pop-up. Works with mouse, touch, Space and Enter. */
export function HoldButton({ onConfirm, children, duration = 1200 }: HoldButtonProps) {
  const [p, setP] = React.useState(0);
  const timer = React.useRef<number | null>(null);
  const start = () => {
    if (timer.current != null) return;
    const t0 = Date.now();
    timer.current = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - t0) / duration) * 100);
      setP(next);
      if (next >= 100) { stop(); onConfirm(); }
    }, 30);
  };
  const stop = () => { if (timer.current != null) window.clearInterval(timer.current); timer.current = null; setP(0); };
  React.useEffect(() => stop, []);
  return (
    <button type="button" className="om-btn om-btn-d om-btn-sm om-hold"
      onPointerDown={start} onPointerUp={stop} onPointerLeave={stop}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); start(); } }}
      onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') stop(); }}>
      <span className="om-hold-fill" style={{ width: `${p}%` }} />
      <span>{children}</span>
    </button>
  );
}
