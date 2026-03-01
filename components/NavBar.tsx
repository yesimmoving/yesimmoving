'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      padding: '28px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 50,
      background: 'linear-gradient(to bottom, var(--bg) 70%, transparent)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          display: 'inline-block',
          background: 'var(--blue)', color: '#fff',
          padding: '1px 6px 2px',
          fontFamily: "'DM Mono', monospace",
          fontSize: 12, fontWeight: 400, letterSpacing: '0.1em',
        }}>
          yesimmoving
        </span>
      </Link>
      <nav style={{ display: 'flex', gap: 36 }}>
        {[
          { label: 'Blog', href: '/blog' },
          { label: 'About', href: '/about' },
          { label: 'Work', href: '/work' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, letterSpacing: '0.14em',
            color: 'var(--ink-faint)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-faint)')}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
