import { useState, useRef, useCallback } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';

/**
 * ProductImageGallery
 *
 * Props:
 *   images  — array of { src, alt }
 *   aspectRatio — CSS aspect-ratio string (default '4/5')
 */
export default function ProductImageGallery({ images = [], aspectRatio = '4/5' }) {
  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);
  const w                     = useWindowWidth();
  const mob                   = w < 768;

  // Touch-swipe state
  const touchStart  = useRef(null);
  const touchEnd    = useRef(null);
  const MIN_SWIPE   = 50;

  const switchTo = useCallback((idx) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 180);
  }, [active]);

  const swipePrev = () => switchTo((active - 1 + images.length) % images.length);
  const swipeNext = () => switchTo((active + 1) % images.length);

  const onTouchStart  = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const onTouchMove   = (e) => { touchEnd.current   = e.targetTouches[0].clientX; };
  const onTouchEnd    = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const delta = touchStart.current - touchEnd.current;
    if (Math.abs(delta) >= MIN_SWIPE) delta > 0 ? swipeNext() : swipePrev();
    touchStart.current = null;
    touchEnd.current   = null;
  };

  const thumbSize = mob ? 58 : 72;
  const thumbH    = mob ? 72 : 90;

  return (
    <div>
      {/* Main image */}
      <div
        style={{ aspectRatio, overflow: 'hidden', borderRadius: 10, background: '#ede8e2', marginBottom: 12, position: 'relative', cursor: 'grab' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={active}
          src={images[active]?.src}
          alt={images[active]?.alt}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.18s ease',
          }}
        />

        {/* Mobile dot indicators */}
        {mob && images.length > 1 && (
          <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTo(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  width: i === active ? 20 : 6, height: 6,
                  borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? '#1a1714' : 'rgba(255,255,255,0.7)',
                  transition: 'width 0.2s ease, background 0.2s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails — desktop only; mobile uses swipe + dot indicators */}
      {!mob && images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              aria-label={img.alt}
              style={{
                width: thumbSize, height: thumbH,
                borderRadius: 6, overflow: 'hidden',
                border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0,
                outline: i === active ? '2px solid #1a1714' : '2px solid transparent',
                outlineOffset: 2,
                transition: 'outline-color 0.15s, opacity 0.15s',
                opacity: i === active ? 1 : 0.65,
              }}
              onMouseEnter={e => { if (i !== active) e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { if (i !== active) e.currentTarget.style.opacity = '0.65'; }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
