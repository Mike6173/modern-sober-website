import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PreOrderModal from '../components/PreOrderModal';
import { useWindowWidth } from '../hooks/useWindowWidth';

// ── Design tokens ──────────────────────────────────────────────────────────
const CREAM       = '#f5f0eb';
const INK         = '#1a1714';
const DARK_PANEL  = '#161412';
const MUTED_1     = '#4a4440';
const MUTED_3     = '#8a7d72';
const MUTED_4     = '#b5a99a';
const ACCENT_WARM = '#c8b89a';

// ── Image paths ────────────────────────────────────────────────────────────
const BOOK_IMG = '/images/book/book.png';

// TODO: replace with final flat product cutout assets when available
// Needed: ghost-mannequin or flat-lay on transparent/dark bg, MODERN SØBER wordmark visible
const HOODIE_UNISEX_IMG  = '/images/products/hoodie/hoodie-03-yacht-sitting.jpg';
const HOODIE_CROPPED_IMG = '/images/products/cropsweatshirt/cropsweatshirt-02-yacht-front.jpg';

// Hero banner: 1920×1080px — set path when Canva asset is ready
const HERO_BANNER_IMG = null;

// ── SectionEyebrow ──────────────────────────────────────────────────────────
const SectionEyebrow = ({ label, light = false }) => (
  <div style={{ marginBottom: 16 }}>
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.28em',
      color: light ? MUTED_4 : MUTED_3,
      textTransform: 'uppercase',
      marginBottom: 10,
    }}>
      {label}
    </p>
    <div style={{ width: 48, height: 1.5, background: ACCENT_WARM }} />
  </div>
);

// ── Hero Banner ─────────────────────────────────────────────────────────────
const HeroBanner = ({ mob }) => (
  <div style={{
    width: '100%',
    height: mob ? 220 : 480,
    background: DARK_PANEL,
    position: 'relative',
    overflow: 'hidden',
    marginTop: mob ? 60 : 72,
  }}>
    {HERO_BANNER_IMG ? (
      <img
        src={HERO_BANNER_IMG}
        alt="Nothing Was Broken — book launch"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        loading="eager"
      />
    ) : (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mob ? 13 : 16, fontWeight: 400, letterSpacing: '0.35em', color: MUTED_3, textTransform: 'uppercase', textAlign: 'center' }}>
          NOTHING WAS BROKEN — BRANDON SMITH
        </p>
      </div>
    )}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${CREAM})` }} />
  </div>
);

// ── Book Hero ────────────────────────────────────────────────────────────────
const BookHero = ({ mob }) => (
  <section style={{
    background: CREAM,
    paddingTop: mob ? 32 : 48,
    paddingBottom: mob ? 64 : 96,
    paddingLeft: mob ? 24 : 80,
    paddingRight: mob ? 24 : 80,
  }}>
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
      gap: mob ? 48 : 80,
      alignItems: 'center',
    }}>
      <div style={{ order: mob ? 1 : 0 }}>
        <SectionEyebrow label="BOOK LAUNCH" />
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: mob ? 'clamp(48px, 12vw, 72px)' : 'clamp(64px, 9vw, 108px)',
          fontWeight: 600,
          lineHeight: 0.95,
          color: INK,
          letterSpacing: '-0.02em',
          marginBottom: mob ? 28 : 36,
          whiteSpace: 'pre-line',
        }}>
          {'NOTHING\nWAS\nBROKEN'}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: MUTED_1 }}>
            From the outside, everything worked. Career. Family. Structure.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: MUTED_1 }}>
            But underneath it, something was quietly taking its place.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: MUTED_1 }}>
            This is not a story about collapse. It's a story about clarity.
          </p>
        </div>
      </div>
      <div style={{
        order: mob ? 0 : 1,
        aspectRatio: '1/1',
        overflow: 'hidden',
        background: DARK_PANEL,
        borderRadius: 12,
        boxShadow: '0 12px 48px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={BOOK_IMG}
          alt="Nothing Was Broken — hardcover book by Brandon Smith on a dark stone surface"
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          loading="eager"
        />
      </div>
    </div>
  </section>
);

// ── Pre-Order Card ───────────────────────────────────────────────────────────
const PreOrderCard = ({ mob, onOpenModal }) => {
  const [hoverBtn, setHoverBtn] = useState(false);
  const CARD_H = mob ? 200 : 340; // product image height

  return (
    <section style={{ background: CREAM, padding: mob ? '0 16px 12px' : '0 48px 12px' }}>
      <div style={{
        background: DARK_PANEL,
        borderRadius: 16,
        border: '1px solid rgba(245,240,235,0.07)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
        padding: mob ? '36px 24px 44px' : '52px 56px 56px',
        overflow: 'hidden',
      }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
          alignItems: mob ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: mob ? 24 : 48,
          marginBottom: 0,
        }}>
          {/* Left */}
          <div>
            <SectionEyebrow label="PRE-ORDER NOW" light />
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: mob ? '28px' : '42px',
              fontWeight: 600,
              color: '#f0ebe4',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              marginBottom: 10,
              marginTop: 4,
              textTransform: 'uppercase',
            }}>
              PRE-ORDER NOW
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? '13px' : '14px', fontWeight: 300, color: MUTED_4, lineHeight: 1.75 }}>
              Be the first to get your copy.<br />Launching Soon.
            </p>
          </div>

          {/* Right: CTA button */}
          <button
            onClick={onOpenModal}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              background: hoverBtn ? '#ede8e2' : CREAM,
              color: INK,
              border: 'none',
              padding: '18px 44px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              minHeight: 52,
              minWidth: mob ? '100%' : 260,
              justifyContent: 'center',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              borderRadius: 0,
            }}
            aria-haspopup="dialog"
          >
            PRE-ORDER NOW
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Gold divider */}
        <div style={{ height: 1, background: ACCENT_WARM, opacity: 0.35, margin: mob ? '32px 0' : '40px 0' }} />

        {/* Product row */}
        <div style={{
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: mob ? 20 : 0,
        }}>

          {/* Hoodie 1 */}
          <ProductThumb img={HOODIE_UNISEX_IMG} alt="Modern Søber Essential Hoodie — black, unisex" height={CARD_H} mob={mob} />

          <Connector label="OR" mob={mob} />

          {/* Hoodie 2 */}
          <ProductThumb img={HOODIE_CROPPED_IMG} alt="Modern Søber Cropped Hoodie — cream, women's" height={CARD_H} mob={mob} />

          <Connector label="+" mob={mob} circle />

          {/* Book — same size as hoodies */}
          <ProductThumb img={BOOK_IMG} alt="Nothing Was Broken — book cover" height={CARD_H} mob={mob} objectFit="contain" />

          {/* Bundle Deal */}
          {mob ? (
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <BundleDealText />
            </div>
          ) : (
            <div style={{ marginLeft: 48, flexShrink: 0, maxWidth: 200 }}>
              <BundleDealText />
            </div>
          )}
        </div>

        {/* Caption */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 300,
          color: MUTED_3,
          textAlign: 'center',
          marginTop: 28,
          letterSpacing: '0.06em',
        }}>
          Includes Men's Hoodie or Women's Cropped Hoodie
        </p>

      </div>
    </section>
  );
};

// Product thumbnail
const ProductThumb = ({ img, alt, height, mob, objectFit = 'cover' }) => (
  <div style={{
    height,
    width: mob ? 200 : 'auto',
    aspectRatio: mob ? '1/1' : '4/5',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    boxShadow: '0 8px 48px rgba(255,255,255,0.13), 0 2px 16px rgba(255,255,255,0.09)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {img && (
      <img
        src={img}
        alt={alt}
        style={{ height: '100%', width: '100%', objectFit, display: 'block' }}
        loading="lazy"
      />
    )}
  </div>
);

// OR / + connector
const Connector = ({ label, mob, circle = false }) => (
  <div style={{ padding: mob ? '4px 0' : '0 20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {circle ? (
      <div style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: `1px solid ${MUTED_3}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: MUTED_3, lineHeight: 1 }}>+</span>
      </div>
    ) : (
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.22em',
        color: MUTED_3,
        textTransform: 'uppercase',
      }}>
        OR
      </p>
    )}
  </div>
);

// Bundle Deal text
const BundleDealText = () => (
  <div>
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.28em', color: MUTED_4, textTransform: 'uppercase', marginBottom: 8 }}>
        BUNDLE DEAL
      </p>
      <div style={{ width: 40, height: 1.5, background: ACCENT_WARM }} />
    </div>
    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: '#f0ebe4', lineHeight: 1.25, marginBottom: 6 }}>
      Book + Hoodie
    </p>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: MUTED_4, lineHeight: 1.6 }}>
      Get both and save.
    </p>
  </div>
);

// ── Quote Card ───────────────────────────────────────────────────────────────
const QuoteCard = ({ mob }) => (
  <section style={{ background: CREAM, padding: mob ? '0 16px 64px' : '0 48px 80px' }}>
    <div style={{
      background: DARK_PANEL,
      borderRadius: 16,
      border: '1px solid rgba(245,240,235,0.07)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
      padding: mob ? '36px 28px' : '44px 56px',
    }}>
      <div style={{
        display: 'flex',
        gap: mob ? 20 : 40,
        alignItems: 'center',
      }}>
        {/* Oversized quote glyph */}
        <div style={{ flexShrink: 0 }}>
          <svg width={mob ? 48 : 72} height={mob ? 36 : 54} viewBox="0 0 28 22" fill={ACCENT_WARM} opacity="0.75" aria-hidden="true">
            <path d="M0 22V13.2C0 5.6 4.4 1.4 13.2 0l1.4 2.8C10 3.8 7.8 6 7.2 9.6H12V22H0zm16 0V13.2C16 5.6 20.4 1.4 29.2 0L30.6 2.8C26 3.8 23.8 6 23.2 9.6H28V22H16z"/>
          </svg>
        </div>

        {/* Quote text */}
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mob ? '18px' : 'clamp(22px, 2.5vw, 28px)',
            fontWeight: 300,
            lineHeight: 1.5,
            color: '#f0ebe4',
            marginBottom: 14,
            letterSpacing: '0.01em',
          }}>
            This isn't about restriction.<br />It's about control.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: MUTED_3,
          }}>
            — Founder, Modern Søber
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PreOrder() {
  const [modalOpen, setModalOpen] = useState(false);
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <Navbar bgColor={CREAM} />

      <HeroBanner mob={mob} />

      <BookHero mob={mob} />

      <PreOrderCard mob={mob} onOpenModal={() => setModalOpen(true)} />

      <QuoteCard mob={mob} />

      <Footer />

      <PreOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
