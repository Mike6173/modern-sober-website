import { useWindowWidth } from '../hooks/useWindowWidth';

export default function ProductGallery({ images }) {
  const w   = useWindowWidth();
  const mob = w < 640;
  const tab = w < 1024;

  const cols = mob ? 1 : tab ? 2 : 3;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: mob ? 12 : 16,
      marginBottom: 64,
    }}>
      {images.map((img, i) => (
        <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '4/5' }}>
          <img
            src={img.src}
            alt={img.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
            loading="lazy"
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        </div>
      ))}
    </div>
  );
}
