'use client';
import Link from 'next/link';

interface Post { slug: string; title: string; date: string; description: string; }

export default function BlogList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return (
    <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--ink-faint)', letterSpacing:'0.1em' }}>첫 번째 글을 써보세요.</p>
  );
  return (
    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:0 }}>
      {posts.map(post => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} style={{ textDecoration:'none', display:'block' }}
            onMouseEnter={e => { const t = e.currentTarget.querySelector('.pt') as HTMLElement; if(t) t.style.color='var(--blue)'; }}
            onMouseLeave={e => { const t = e.currentTarget.querySelector('.pt') as HTMLElement; if(t) t.style.color='var(--ink)'; }}
          >
            <div style={{ padding:'28px 0', borderBottom:'1px solid rgba(28,28,28,0.08)', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:24 }}>
              <div>
                <h2 className="pt" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:400, color:'var(--ink)', transition:'color 0.25s', marginBottom:8 }}>{post.title}</h2>
                {post.description && <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--ink-faint)', letterSpacing:'0.08em' }}>{post.description}</p>}
              </div>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'var(--ink-faint)', letterSpacing:'0.1em', whiteSpace:'nowrap', marginTop:6 }}>{post.date}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
