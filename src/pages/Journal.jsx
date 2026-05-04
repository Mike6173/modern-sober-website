import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { FEATURED, ARTICLES } from '../data/journalData';

function FeaturedArticle({ article }) {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#f5f0eb', padding: mob ? '0 24px 56px' : '0 80px 100px' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '3fr 2fr',
        border: '1px solid rgba(26,23,20,0.08)',
      }}>
        {/* Image */}
        <div className="journal-card-img" style={{ overflow: 'hidden', minHeight: mob ? 240 : 480 }}>
          <img
            src={article.img}
            alt={article.alt}
            style={{ width: '100%', height: '100%', minHeight: mob ? 240 : 480, objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Text */}
        <div style={{ padding: mob ? '32px 20px' : '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f5f0eb' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 20 }}>
            {article.category}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(22px, 6vw, 32px)' : 'clamp(26px, 2.5vw, 40px)', fontWeight: 600, lineHeight: 1.15, color: '#1a1714', marginBottom: 20 }}>
            {article.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: '#4a4440', marginBottom: 28 }}>
            {article.excerpt}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#8a7d72', marginBottom: 24, letterSpacing: '0.04em' }}>
            {article.date} · {article.readTime}
          </p>
          <Link to={`/journal/${article.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', color: '#1a1714', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #1a1714', paddingBottom: 2, width: 'fit-content', minHeight: 44 }}>
            READ
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }) {
  return (
    <article className="journal-card">
      <Link to={`/journal/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="journal-card-img" style={{ aspectRatio: '3/2', marginBottom: 20 }}>
          <img src={article.img} alt={article.alt} />
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 10 }}>
          {article.category}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, lineHeight: 1.2, color: '#1a1714', marginBottom: 12 }}>
          {article.title}
        </h3>
      </Link>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#6a6058', marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {article.excerpt}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#8a7d72', letterSpacing: '0.04em' }}>
        {article.date} · {article.readTime}
      </p>
    </article>
  );
}

function ArticleGrid({ articles }) {
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;
  return (
    <section style={{ background: '#f5f0eb', padding: mob ? '0 24px 56px' : '0 80px 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid rgba(26,23,20,0.1)', paddingTop: mob ? 40 : 64, marginBottom: mob ? 36 : 64 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase' }}>
            ALL POSTS
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: mob ? '48px 0' : '56px 32px' }}>
          {articles.map((a) => <ArticleCard key={a.title} article={a} />)}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const w   = useWindowWidth();
  const mob = w < 600;
  return (
    <section style={{ background: '#ede8e2', padding: w < 768 ? '64px 24px' : '100px 80px', textAlign: 'center', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 600, color: '#1a1714', marginBottom: 12 }}>
          Get field notes by email.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#6a6058', lineHeight: 1.75, marginBottom: 36 }}>
          Once a week. No noise.
        </p>
        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row' }}>
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
              borderRight: mob ? '1px solid rgba(26,23,20,0.2)' : 'none',
              borderBottom: mob ? 'none' : undefined,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: '#1a1714',
              outline: 'none',
              minHeight: 48,
            }}
          />
          <button
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '10px', whiteSpace: 'nowrap', minHeight: 48, width: mob ? '100%' : 'auto' }}
            onClick={() => setEmail('')}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Journal() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />
      <PageHero eyebrow="FIELD NOTES" headline="On clarity, discipline, and choice." />
      <FeaturedArticle article={FEATURED} />
      <ArticleGrid articles={ARTICLES} />
      <Newsletter />
      <Footer />
    </div>
  );
}
