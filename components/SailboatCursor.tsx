'use client';

import { useEffect, useRef } from 'react';

export default function SailboatCursor() {
  const cursorRef = useRef<SVGSVGElement>(null);
  const lastX = useRef(0);
  const lastWake = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      const tilt = Math.max(-18, Math.min(18, dx * 1.2));
      cursor.style.transform = `translate(-50%, -100%) rotate(${tilt}deg)`;

      // 물결 생성
      const now = Date.now();
      const dy = e.clientY;
      if (now - lastWake.current > 180 && Math.abs(dx) > 3) {
        const wake = document.createElement('div');
        wake.className = 'wake';
        const size = 60 + Math.random() * 40;
        wake.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size * 0.35}px;position:fixed;`;
        document.body.appendChild(wake);
        setTimeout(() => wake.remove(), 1400);
        lastWake.current = now;
      }
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <svg
      ref={cursorRef}
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%, -100%)' }}
      width="36" height="48" viewBox="0 0 36 48" fill="none"
    >
      <path d="M18 4 L18 32 L6 28 Z" fill="var(--blue)" opacity="0.9"/>
      <path d="M18 4 L18 32 L30 22 Z" fill="var(--ink)" opacity="0.75"/>
      <line x1="18" y1="3" x2="18" y2="33" stroke="var(--ink)" strokeWidth="1.2"/>
      <path d="M6 34 Q18 42 30 34 L28 38 Q18 46 8 38 Z" fill="var(--ink)" opacity="0.85"/>
      <ellipse cx="18" cy="44" rx="12" ry="2" fill="var(--blue)" opacity="0.12"/>
    </svg>
  );
}
