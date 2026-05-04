import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { FEATURED, ARTICLES } from '../data/journalData';

const ALL_ARTICLES = [FEATURED, ...ARTICLES];

function ContentBlock({ block }) {
  if (block.type === 'p') {
    return (
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '16px',
          fontWeight: 300,
          lineHeight: 1.9,
          color: '#4a4440',
          marginBottom: 28,
        }}
      >
        {block.text}
      </p>
    );
  }

  if (block.type === 'h2') {
    return (
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 600,
          lineHeight: 1.2,
          color: '#1a1714',
          marginTop: 48,
          marginBottom: 24,
        }}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        style={{
          borderLeft: '3px solid #c8b89a',
          margin: '40px 0',
          padding: '4px 0 4px 28px',
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(17px, 2.5vw, 22px)',
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.55,
          color: '#1a1714',
        }}
      >
        {block.text}
      </blockquote>
    );
  }

  return null;
}

export default function JournalPost() {
  const { slug } = useParams();
  const w = useWindowWidth();
  const mob = w < 768;

  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: mob ? '70vw' : '580px',
          maxHeight: '580px',
          minHeight: mob ? '260px' : '380px',
          overflow: 'hidden',
        }}
      >
        <img
          src={article.img}
          alt={article.alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26,23,20,0.45)',
          }}
        />
        {/* Centered text overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: mob ? '0 24px' : '0 80px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {article.category}
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: mob ? 'clamp(24px, 7vw, 36px)' : 'clamp(32px, 4vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: 20,
              maxWidth: 780,
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.06em',
            }}
          >
            {article.date} &nbsp;·&nbsp; {article.readTime}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: mob ? '60px 24px 80px' : '80px 80px 100px',
        }}
      >
        {/* Excerpt lead */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mob ? '15px' : '17px',
            fontWeight: 400,
            lineHeight: 1.85,
            color: '#1a1714',
            marginBottom: 40,
            paddingBottom: 40,
            borderBottom: '1px solid rgba(26,23,20,0.1)',
          }}
        >
          {article.excerpt}
        </p>

        {/* Content blocks */}
        {article.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid rgba(26,23,20,0.1)' }}>
          <Link
            to="/journal"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              color: '#1a1714',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid #1a1714',
              paddingBottom: 2,
              minHeight: 44,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            JOURNAL
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
