import { useWindowWidth } from '../hooks/useWindowWidth';

export default function ProductFeature({ product }) {
  const w   = useWindowWidth();
  const mob = w < 768;
  const { title, price, tagline, leadImage, description } = product;
  const desc = description;

  return (
    <article style={{ marginBottom: mob ? 80 : 120 }}>
      {/* Title / price / tagline */}
      <div style={{ marginBottom: mob ? 28 : 40 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 4vw, 52px)', fontWeight: 600, color: '#1a1714', marginBottom: 8, lineHeight: 1.1 }}>
          {title}
        </h2>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 20 : 24, fontWeight: 400, color: '#1a1714', marginBottom: 6 }}>
          {price}
        </p>
        {tagline && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#8a7d72', fontStyle: 'italic' }}>
            {tagline}
          </p>
        )}
      </div>

      {/* Lead image + description */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
        gap: mob ? 32 : 56,
        alignItems: 'flex-start',
      }}>
        {/* Lead image */}
        <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5' }}>
          <img
            src={leadImage.src}
            alt={leadImage.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        </div>

        {/* Description */}
        <div style={{ paddingTop: mob ? 0 : 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 22 : 26, fontWeight: 600, color: '#1a1714', marginBottom: 20, lineHeight: 1.25 }}>
            {desc.headline}
          </h3>

          {desc.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: '#4a4440', marginBottom: 16 }}>
              {para}
            </p>
          ))}

          {desc.brandLine && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', color: '#1a1714', whiteSpace: 'pre-line', marginBottom: 24, marginTop: 8 }}>
              {desc.brandLine}
            </p>
          )}

          {desc.detailsTitle && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#1a1714', textTransform: 'uppercase', marginBottom: 12, marginTop: desc.brandLine ? 0 : 8 }}>
              {desc.detailsTitle}
            </p>
          )}

          {desc.details.length > 0 && (
            <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 24 }}>
              {desc.details.map((item, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: '#4a4440', lineHeight: 1.8, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#8a7d72', flexShrink: 0, marginTop: 8 }}/>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {desc.closing && (
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 16 : 18, fontWeight: 600, fontStyle: 'italic', color: '#1a1714', marginTop: 8 }}>
              {desc.closing}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
