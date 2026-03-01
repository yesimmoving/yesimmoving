'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface IslandItem {
  id: string;
  label: string;
  sub: string;
  href: string;
  angle: number;
}

const ITEMS: IslandItem[] = [
  { id: 'blog',    label: 'Blog',    sub: '글쓰기 / 기록',   href: '/blog',    angle: 210 },
  { id: 'about',   label: 'About',   sub: '나에 대해서',     href: '/about',   angle: 330 },
  { id: 'work',    label: 'Work',    sub: '프로젝트 / 경험', href: '/work',    angle: 150 },
  { id: 'contact', label: 'Contact', sub: '연락하기',        href: '/contact', angle: 30  },
];

const DOCK_RADIUS = 110;
const DRIFT_AMP = 38;
const DRIFT_FREQ = 0.32;

export default function FloatingIslands() {
  const router = useRouter();
  const stateRef = useRef(
    ITEMS.map((_, i) => ({
      x: 0, y: 0, vx: 0, vy: 0,
      baseX: 0, baseY: 0,
      phase: i * 1.6,
      docked: false,
      dockedX: 0, dockedY: 0,
    }))
  );
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // 페이지 전환: 흰 오버레이 fade out
  function navigateTo(href: string) {
    const overlay = overlayRef.current;
    if (!overlay) { router.push(href); return; }
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '1';
    setTimeout(() => router.push(href), 400);
  }

  useEffect(() => {
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    function initPositions() {
      const r = Math.min(W(), H()) * 0.28;
      const cx = W() / 2, cy = H() / 2;
      stateRef.current.forEach((s, i) => {
        const a = (ITEMS[i].angle * Math.PI) / 180;
        s.x = s.baseX = cx + r * Math.cos(a);
        s.y = s.baseY = cy + r * Math.sin(a);
        const el = itemRefs.current[i];
        if (el) { el.style.left = s.x + 'px'; el.style.top = s.y + 'px'; }
      });
    }

    function animate() {
      timeRef.current += 0.007;
      const t = timeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      stateRef.current.forEach((s, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const w = el.offsetWidth, h = el.offsetHeight;
        const cx = s.x + w / 2, cy = s.y + h / 2;
        const distX = mx - cx, distY = my - cy;
        const dist = Math.hypot(distX, distY);
        const inner = el.querySelector('.island-inner') as HTMLElement | null;

        if (dist < DOCK_RADIUS) {
          if (!s.docked) {
            s.docked = true;
            s.dockedX = s.x;
            s.dockedY = s.y;
            if (inner) { inner.style.borderColor = 'var(--blue)'; inner.style.color = 'var(--blue)'; }
          }
          s.vx = 0; s.vy = 0;
          s.x = s.dockedX; s.y = s.dockedY;
        } else {
          if (s.docked) {
            s.docked = false;
            if (inner) { inner.style.borderColor = ''; inner.style.color = ''; }
          }
          const dX = DRIFT_AMP * Math.sin(t * DRIFT_FREQ + s.phase);
          const dY = DRIFT_AMP * Math.cos(t * DRIFT_FREQ * 0.65 + s.phase + 1.4);
          const oX = 60 * Math.cos(t * 0.18 + s.phase * 2);
          const oY = 40 * Math.sin(t * 0.22 + s.phase * 2 + 0.8);
          s.vx += (s.baseX + dX + oX - s.x) * 0.018;
          s.vy += (s.baseY + dY + oY - s.y) * 0.018;
        }

        s.vx *= 0.86; s.vy *= 0.86;
        s.x += s.vx; s.y += s.vy;
        s.x = Math.max(12, Math.min(W() - w - 12, s.x));
        s.y = Math.max(70, Math.min(H() - h - 48, s.y));
        el.style.left = s.x + 'px';
        el.style.top = s.y + 'px';
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener('mousemove', onMove);
    window.addEventListener('resize', initPositions);
    initPositions();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', initPositions);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* 전환 오버레이 */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0,
          background: 'var(--bg)',
          opacity: 0, pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          ref={el => { itemRefs.current[i] = el; }}
          style={{ position: 'fixed', zIndex: 8, pointerEvents: 'all' }}
          className="fade-in delay-2"
          onClick={() => navigateTo(item.href)}
        >
          <div
            className="island-inner"
            style={{
              display: 'block',
              padding: '18px 32px',
              border: '1px solid rgba(28,28,28,0.15)',
              color: 'var(--ink)',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              background: 'rgba(244,239,230,0.6)',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.3s, color 0.3s',
              whiteSpace: 'nowrap',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {item.label}
            <span style={{
              display: 'block',
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              color: 'var(--ink-faint)',
              letterSpacing: '0.15em',
              marginTop: '4px',
            }}>
              {item.sub}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
