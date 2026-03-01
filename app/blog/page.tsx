import PageLayout from '@/components/PageLayout';
import BlogList from '@/components/BlogList';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data } = matter(raw);
      return { slug: file.replace('.mdx',''), title: data.title||file, date: data.date||'', description: data.description||'' };
    })
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <PageLayout>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 48px 120px' }}>
        <div style={{ marginBottom: 72 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.8rem,5vw,4.8rem)', fontWeight:300, lineHeight:1.08, color:'var(--ink)', letterSpacing:'-0.02em' }}>Blog</h1>
          <p style={{ marginTop:16, fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--ink-faint)', letterSpacing:'0.15em' }}>{posts.length} posts · 글쓰기 / 기록</p>
        </div>
        <div style={{ height:1, background:'var(--ink)', opacity:0.08, marginBottom:48 }} />
        <BlogList posts={posts} />
      </div>
    </PageLayout>
  );
}
