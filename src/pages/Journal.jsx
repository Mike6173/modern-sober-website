import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

// ── Article data ───────────────────────────────────────────────────────────
const FEATURED = {
  category: 'PHILOSOPHY',
  title: 'Why discipline feels like freedom.',
  excerpt: "Most people associate discipline with restriction. With doing less, having less, enjoying less. They've got it backwards. Discipline is the structure that makes everything else possible — and once you live inside it long enough, you stop wanting to leave.",
  date: 'May 2026',
  readTime: '6 min read',
  img: 'https://images.unsplash.com/photo-1753613648120-d2c8d1d49002?auto=format&fit=crop&w=1200&h=700&q=80',
  alt: 'Person at a desk, focused work, natural light through window — editorial portrait',
};

const ARTICLES = [
  {
    category: 'PHILOSOPHY',
    title: 'The luxury of saying no.',
    excerpt: "Every time you decline, you're choosing your future self over the room's approval. Most people never learn this skill. Here's how we practice it.",
    date: 'Apr 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1742589695047-9eaea7ebf27b?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Person standing at a window, thoughtful — editorial',
  },
  {
    category: 'HABITS',
    title: 'Mornings before the noise.',
    excerpt: "The first 90 minutes of your day belong to you, if you decide they do. Here's what we protect in those minutes and why it compounds over time.",
    date: 'Apr 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1659938306569-fca83087aaa3?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Early morning light, coffee on table, journal open — lifestyle editorial',
  },
  {
    category: 'MINDSET',
    title: 'What I learned the year I stopped numbing.',
    excerpt: "A personal account of what becomes visible when the static clears. The discomfort is real. So is what's on the other side.",
    date: 'Mar 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1529977421774-808dda19c3f9?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Solitary figure in open landscape, natural light — contemplative',
  },
  {
    category: 'STYLE',
    title: 'Why we wear black.',
    excerpt: "Intentionality in a wardrobe isn't vanity. It's a signal to yourself that you've made decisions in advance so you can spend your energy elsewhere.",
    date: 'Mar 2026',
    readTime: '3 min read',
    img: 'https://images.unsplash.com/photo-1428894976381-853e04af6262?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Flat lay of black wardrobe pieces on dark surface — editorial product shot',
  },
  {
    category: 'COMMUNITY',
    title: 'Choose your room carefully.',
    excerpt: "You are shaped by the conversations you're in and the standards you're surrounded by. This is not motivational. It's mechanical.",
    date: 'Feb 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1599652521984-8bebed0580b7?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Small group in conversation, relaxed setting, genuine candid — editorial',
  },
  {
    category: 'RITUAL',
    title: 'The case for boring weekends.',
    excerpt: 'Why the most successful people we know treat Saturday the same as Monday. Consistency over intensity, always.',
    date: 'Feb 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1570358934903-35c0ff1bd95e?auto=format&fit=crop&w=600&h=400&q=80',
    alt: 'Saturday morning routine, clean home environment, coffee and book — lifestyle',
  },
];

// ── Featured article ───────────────────────────────────────────────────────
function FeaturedArticle({ article }) {
  return (
    <section style={{ background: '#f5f0eb', padding: '0 80px 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 0, border: '1px solid rgba(26,23,20,0.08)' }}>
        {/* Left — image */}
        <div className="journal-card-img" style={{ overflow: 'hidden' }}>
          <img
            src={article.img}
            alt={article.alt}
            style={{ width: '100%', height: '100%', minHeight: 480, objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Right — text */}
        <div style={{ padding: '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f5f0eb' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 20 }}>
            {article.category}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 2.5vw, 40px)', fontWeight: 600, lineHeight: 1.15, color: '#1a1714', marginBottom: 24 }}>
            {article.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: '#4a4440', marginBottom: 32 }}>
            {article.excerpt}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#8a7d72', marginBottom: 28, letterSpacing: '0.04em' }}>
            {article.date} · {article.readTime}
          </p>
          <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', color: '#1a1714', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #1a1714', paddingBottom: 2, width: 'fit-content' }}>
            READ
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Article card ───────────────────────────────────────────────────────────
function ArticleCard({ article }) {
  return (
    <article className="journal-card">
      <div className="journal-card-img" style={{ aspectRatio: '3/2', marginBottom: 20 }}>
        <img src={article.img} alt={article.alt} />
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 10 }}>
        {article.category}
      </p>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, lineHeight: 1.2, color: '#1a1714', marginBottom: 12 }}>
        {article.title}
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#6a6058', marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {article.excerpt}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#8a7d72', letterSpacing: '0.04em' }}>
        {article.date} · {article.readTime}
      </p>
    </article>
  );
}

// ── Article grid ───────────────────────────────────────────────────────────
function ArticleGrid({ articles }) {
  return (
    <section style={{ background: '#f5f0eb', padding: '0 80px 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid rgba(26,23,20,0.1)', paddingTop: 64, marginBottom: 64 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase' }}>
            ALL POSTS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 32px' }}>
          {articles.map((a) => <ArticleCard key={a.title} article={a} />)}
        </div>
      </div>
    </section>
  );
}

// ── Newsletter band ────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  return (
    <section style={{ background: '#ede8e2', padding: '100px 80px', textAlign: 'center', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 600, color: '#1a1714', marginBottom: 12 }}>
          Get field notes by email.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#6a6058', lineHeight: 1.75, marginBottom: 40 }}>
          Once a week. No noise.
        </p>
        <div style={{ display: 'flex', gap: 0 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '14px 16px',
              background: '#f5f0eb',
              border: '1px solid rgba(26,23,20,0.2)',
              borderRight: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: '#1a1714',
              outline: 'none',
            }}
          />
          <button
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '10px', whiteSpace: 'nowrap' }}
            onClick={() => setEmail('')}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Journal() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />
      <PageHero
        eyebrow="FIELD NOTES"
        headline="On clarity, discipline, and choice."
      />
      <FeaturedArticle article={FEATURED} />
      <ArticleGrid articles={ARTICLES} />
      <Newsletter />
      <Footer />
    </div>
  );
}
