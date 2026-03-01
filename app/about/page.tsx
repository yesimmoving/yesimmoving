import PageLayout from '@/components/PageLayout';

const KEYWORDS = [
  'Theology', 'Industrial Engineering', 'Customer Experience',
  'Data Analysis', 'Growth Marketing', 'Startups',
  'Philosophy', 'Writing', 'Systems Thinking', 'Music',
];

export default function AboutPage() {
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
            About
          </h1>
          <p style={{
            marginTop: 16,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.15em',
          }}>
            Lee Dongha · 이동하
          </p>
        </div>

        <div style={{ height: 1, background: 'var(--ink)', opacity: 0.08, marginBottom: 64 }} />

        {/* 소개 본문 */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.15rem, 1.9vw, 1.3rem)',
          lineHeight: 1.9, color: 'var(--ink)',
          marginBottom: 72,
        }}>
          <p style={{ marginBottom: 28 }}>
            신학과 산업공학을 함께 공부하고 있다. 두 분야가 멀어 보이지만, 
            둘 다 결국 같은 질문을 한다 — <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>왜 사람은 이렇게 행동하는가.</em>
          </p>
          <p style={{ marginBottom: 28 }}>
            AlgoCare에서 고객경험·데이터·마케팅을 맡고 있다. 
            숫자와 이야기 사이를 오가는 게 일상이다.
          </p>
          <p>
            의미없는 것은 없다고 믿는다. 
            그래서 작은 것들을 기록하고, 패턴을 찾고, 연결한다.
          </p>
        </div>

        {/* 키워드 태그 */}
        <div style={{ marginBottom: 72 }}>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9, color: 'var(--ink-faint)',
            letterSpacing: '0.18em', marginBottom: 20,
          }}>
            INTERESTS
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {KEYWORDS.map(k => (
              <span key={k} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10, letterSpacing: '0.1em',
                padding: '5px 12px',
                border: '1px solid rgba(28,28,28,0.15)',
                color: 'var(--ink-faint)',
              }}>
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* 현재 */}
        <div style={{ height: 1, background: 'var(--ink)', opacity: 0.08, marginBottom: 48 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { label: 'Currently', value: 'AlgoCare · CX / Data / Marketing' },
            { label: 'Studying', value: 'Theology × Industrial Engineering' },
            { label: 'Based in', value: 'Seoul, Korea' },
            { label: 'Writing about', value: '경계, 연결, 의미' },
          ].map(item => (
            <div key={item.label}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9, color: 'var(--ink-faint)',
                letterSpacing: '0.18em', marginBottom: 8,
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.5,
              }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
