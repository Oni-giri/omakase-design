import * as React from 'react';
import { cx } from '../cx';

export interface AppRootProps {
  /** The four corner washes. Default true. */
  bloom?: boolean;
  /** 'dense' (default) for tools used all day; 'comfortable' for consumer-facing pages (15px text, roomier rows). */
  density?: 'dense' | 'comfortable';
  /** 'light' (default), 'dark', or 'auto' to follow the operating system. */
  theme?: 'light' | 'dark' | 'auto';
  children: React.ReactNode;
}
/** Root of an Omakase app: fonts, canvas, focus rings, theme and density. */
export function AppRoot({ bloom = true, density = 'dense', theme = 'light', children }: AppRootProps) {
  return (
    <div data-theme={theme} className={cx('om-app', bloom && 'om-canvas', density === 'comfortable' && 'om-comfy')} style={{ minHeight: '100vh', backgroundAttachment: 'fixed' }}>
      {children}
    </div>
  );
}

/** Top bar for public sites: brand, links, search, one action. */
export function TopBar({ children }: { children: React.ReactNode }) {
  return <header className="om-topbar">{children}</header>;
}

/** Centred column, 1160px max, for public pages without a sidebar. */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('om-container', className)}>{children}</div>;
}

/** Sidebar | main | optional right rail. */
export function Shell({ sidebar, rail, children }: { sidebar: React.ReactNode; rail?: React.ReactNode; children: React.ReactNode }) {
  return <div className="om-shell">{sidebar}<main className="om-main">{children}</main>{rail && <aside className="om-rail">{rail}</aside>}</div>;
}

export function Sidebar({ brand, children }: { brand: React.ReactNode; children: React.ReactNode }) {
  return <nav className="om-sidebar" aria-label="Main">{brand}{children}</nav>;
}

export function Brand({ mark, name, sub }: { mark: React.ReactNode; name: string; sub?: string }) {
  return <div className="om-brand">{mark}<div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}><span className="om-brand-name">{name}</span>{sub && <span className="om-brand-sub">{sub}</span>}</div></div>;
}

/** A group of nav items. `end` pushes it to the bottom of the sidebar (workspace settings). */
export function NavGroup({ label, end, children }: { label?: string; end?: boolean; children: React.ReactNode }) {
  return <div className={cx('om-nav-group', end && 'om-nav-group-end')}>{label && <span className="om-overline">{label}</span>}{children}</div>;
}

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { icon?: React.ReactNode; active?: boolean; count?: React.ReactNode; /** Filled red bubble: only for things that need attention. */ alert?: boolean }
export function NavItem({ icon, active, count, alert, children, className, ...rest }: NavItemProps) {
  return (
    <a className={cx('om-nav', active && 'om-nav-on', className)} aria-current={active ? 'page' : undefined} {...rest}>
      {icon}{children}{count != null && <span className={cx('om-count', alert && 'om-count-alert')}>{count}</span>}
    </a>
  );
}

export function PageHeader({ title, large, breadcrumb, actions, children }: { title: React.ReactNode; large?: boolean; breadcrumb?: React.ReactNode; actions?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {breadcrumb}
      <div className="om-page-h"><h1 className={cx('om-page-t', large && 'om-page-t-lg')}>{title}</h1><div style={{ flex: 1 }} />{actions}</div>
      {children}
    </header>
  );
}

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="om-crumbs" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {i === items.length - 1 ? <span aria-current="page">{it.label}</span> : <a href={it.href}>{it.label}</a>}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function Card({ title, meta, actions, children, flush, className }: { title?: React.ReactNode; meta?: React.ReactNode; actions?: React.ReactNode; children?: React.ReactNode; /** No body padding: for tables and lists. */ flush?: boolean; className?: string }) {
  return (
    <section className={cx('om-card', className)} style={flush ? { overflow: 'hidden' } : undefined}>
      {title && <div className="om-card-h"><h2 className="om-card-t">{title}</h2>{meta}{actions && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>{actions}</div>}</div>}
      {flush ? children : <div className="om-card-b">{children}</div>}
    </section>
  );
}

/** Inner panel on surface-sunken, inside a card. */
export function Panel({ children }: { children: React.ReactNode }) {
  return <div className="om-panel">{children}</div>;
}

/** One property row in a right rail: key on the left, value on the right. */
export function Prop({ k, children }: { k: React.ReactNode; children: React.ReactNode }) {
  return <div className="om-prop"><span className="om-prop-k">{k}</span><span>{children}</span></div>;
}
