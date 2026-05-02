import { useWindowWidth } from '../hooks/useWindowWidth';

// Reusable hero band: eyebrow + headline + optional subtitle
// align: 'left' | 'center' (default 'left')
export default function PageHero({ eyebrow, headline, subtitle, align = 'left', children }) {
  const w        = useWindowWidth();
  const mob      = w < 768;
  const isCenter = align === 'center';

  return (
    <section style={{
      background: '#f5f0eb',
      padding: mob ? '96px 24px 48px' : '140px 80px 80px',
      textAlign: isCenter ? 'center' : 'left',
    }}>
      <div style={{ maxWidth: isCenter ? 760 : 720, margin: isCenter ? '0 auto' : '0' }}>
        {eyebrow && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.24em',
            color: '#8a7d72',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            {eyebrow}
          </p>
        )}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: mob ? 'clamp(32px, 8vw, 48px)' : 'clamp(42px, 5vw, 72px)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: '#1a1714',
          marginBottom: subtitle ? 24 : 0,
        }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mob ? '14px' : '15px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#4a4440',
            maxWidth: isCenter ? 520 : 480,
            margin: isCenter ? '0 auto' : '0',
            marginTop: 16,
          }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
