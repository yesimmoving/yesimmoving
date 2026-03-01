import NavBar from './NavBar';
import PageTransition from './PageTransition';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{
      width: '100%', minHeight: '100vh',
      background: 'var(--bg)',
      overflowY: 'auto', overflowX: 'hidden',
    }}>
      <NavBar />
      <PageTransition>
        <div style={{ paddingTop: 100 }}>
          {children}
        </div>
      </PageTransition>
    </main>
  );
}
