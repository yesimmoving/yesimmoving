import PageLayout from '@/components/PageLayout';

const PROJECTS = [
  {
    title: 'AlgoCare',
    role: 'CX / Data / Marketing',
    period: '2024 — ',
    description: 'B2B 영양제 조제 서비스 스타트업. 고객경험 설계, 데이터 분석, 인플루언서 마케팅 운영.',
    tags: ['Customer Experience', 'Data Analysis', 'Growth Marketing'],
    status: 'Ongoing',
  },
  {
    title: '음악 저작권 플랫폼',
    role: 'Founder',
    period: '2022 — 2023',
    description: '음악 저작권 B2C 플랫폼 창업. 서비스 기획부터 운영까지 전반을 담당했다.',
    tags: ['Product', 'Operations', 'Music'],
    status: 'Completed',
  },
];

export default function WorkPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 48px 160px' }}>

        {/* 타이틀 */}
        <div style={{ marginBottom: 72 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
            fontWeight: 300, lineHeight: 1.08,
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}>
            Work
          </h1>
          <p style={{
            marginTop: 16,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.15em',
          }}>
            프로젝트 / 경험
          </p>
        </div>

        <div style={{ height: 1, background: 'var(--ink)', opacity: 0.08, marginBottom: 56 }} />

        {/* 프로젝트 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{
              padding: '40px 0',
              borderBottom: '1px solid rgba(28,28,28,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 400, color: 'var(--ink)',
                    marginBottom: 6,
                  }}>
                    {p.title}
                  </h2>
                  <p style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.14em',
                  }}>
                    {p.role}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, color: 'var(--ink-faint)',
                    letterSpacing: '0.1em', marginBottom: 6,
                  }}>
                    {p.period}
                  </p>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8, letterSpacing: '0.12em',
                    padding: '2px 8px',
                    border: `1px solid ${p.status === 'Ongoing' ? 'var(--blue)' : 'rgba(28,28,28,0.15)'}`,
                    color: p.status === 'Ongoing' ? 'var(--blue)' : 'var(--ink-faint)',
                  }}>
                    {p.status}
                  </span>
                </div>
              </div>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem', lineHeight: 1.8,
                color: 'var(--ink)', marginBottom: 20,
                opacity: 0.8,
              }}>
                {p.description}
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8, letterSpacing: '0.1em',
                    padding: '3px 10px',
                    background: 'rgba(28,28,28,0.04)',
                    color: 'var(--ink-faint)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
