import PageLayout from '@/components/PageLayout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({ slug: f.replace('.mdx', '') }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return (
    <PageLayout>
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '60px 48px 160px' }}>

        {/* 메타 */}
        <div style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9, color: 'var(--ink-faint)',
            letterSpacing: '0.18em', marginBottom: 20,
          }}>
            {data.date}
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            fontWeight: 300, lineHeight: 1.1,
            color: 'var(--ink)', letterSpacing: '-0.02em',
          }}>
            {data.title}
          </h1>
          {data.description && (
            <p style={{
              marginTop: 16,
              fontFamily: "'DM Mono', monospace",
              fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.1em',
            }}>
              {data.description}
            </p>
          )}
        </div>

        <div style={{ height: 1, background: 'var(--ink)', opacity: 0.08, marginBottom: 48 }} />

        {/* 본문 */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.85,
          color: 'var(--ink)',
          whiteSpace: 'pre-wrap',
          letterSpacing: '0.01em',
        }}>
          {content}
        </div>

      </article>
    </PageLayout>
  );
}
