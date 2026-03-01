export default function Home() {
  return (
    <main style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'var(--bg)', fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--ink-faint)', letterSpacing:'0.15em' }}>
      coming soon
    </main>
  );
}

import Header from '@/components/Header';
import FloatingIslands from '@/components/FloatingIslands';

export default function Home() {
  return (
    <main style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      <div style={{
        position: 'fixed', top: '62%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--ink-faint) 20%, var(--ink-faint) 80%, transparent)',
        opacity: 0.18, zIndex: 1, pointerEvents: 'none',
      }} />

      <Header />

      <div className="fade-in delay-2" style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', zIndex: 5, pointerEvents: 'none',
      }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
          fontWeight: 300, lineHeight: 1.15,
          color: 'var(--ink)', letterSpacing: '-0.01em',
          fontFamily: "'Cormorant Garamond', serif",
        }}>
          Tracing the<br />
          <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>invisible lines</em>
        </h1>
        <p style={{
          marginTop: 16,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.1em',
        }}>
          Nothing is without meaning
        </p>
      </div>

      <FloatingIslands />

      <p className="fade-in delay-3" style={{
        position: 'fixed', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        color: 'var(--ink-faint)', letterSpacing: '0.15em', zIndex: 10,
        animation: 'pulse 3s ease-in-out infinite',
      }}>
        돛단배를 움직여보세요 · move the sailboat
      </p>

    </main>
  );
}
