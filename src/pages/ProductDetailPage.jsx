import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImageGallery from '../components/ProductImageGallery';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { CATALOG_PRODUCTS } from '../data/catalogData';

function Accordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid rgba(26,23,20,0.1)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#1a1714', textTransform: 'uppercase' }}>
          {label}
        </span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <path d="M1 1l5 5 5-5" stroke="#1a1714" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug }  = useParams();
  const w         = useWindowWidth();
  const mob       = w < 768;

  const product = CATALOG_PRODUCTS.find(p => p.slug === slug);
  if (!product) return <Navigate to="/shop" replace />;

  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize]   = useState(null);
  const [added, setAdded]             = useState(false);

  const handleAddToCart = () => {
    if (!activeSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Per-color gallery if defined, otherwise fall back to product-level gallery
  const activeGallery = product.colors[activeColor]?.galleryImages || product.galleryImages;

  const { description: desc } = product;

  // Type label for breadcrumb
  const typeLabel = product.type === 'hoodie' ? 'Hoodies' : product.type === 'tee' ? 'Tees' : 'Caps';
  const typePath  = product.type === 'hoodie' ? '/shop/hoodies' : product.type === 'tee' ? '/shop/tees' : '/shop/caps';

  return (
    <div style={{ background: '#f7f4f0', minHeight: '100vh' }}>
      <Navbar bgColor="#f7f4f0" />

      <div style={{ paddingTop: mob ? 60 : 72 }}>
        {/* Breadcrumb */}
        <div style={{ padding: mob ? '20px 24px 0' : '24px 80px 0', maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
            {' / '}
            <Link to={typePath} style={{ color: 'inherit', textDecoration: 'none' }}>{typeLabel}</Link>
            {' / '}
            <span style={{ color: '#1a1714' }}>{product.name}</span>
          </p>
        </div>

        {/* Main content */}
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: mob ? '24px 24px 64px' : '40px 80px 100px',
          display: mob ? 'block' : 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'start',
        }}>

          {/* ── Left: Image gallery ── */}
          <div style={{ marginBottom: mob ? 40 : 0 }}>
            <ProductImageGallery key={activeColor} images={activeGallery} />
          </div>

          {/* ── Right: Product info ── */}
          <div>
            {/* Name + price */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 28 : 38, fontWeight: 600, color: '#1a1714', lineHeight: 1.15, marginBottom: 8 }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 20 : 24, fontWeight: 400, color: '#1a1714', marginBottom: 6 }}>
              ${product.price}
            </p>
            {product.tagline && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: '#8a7d72', letterSpacing: '0.08em', fontStyle: 'italic', marginBottom: 28 }}>
                {product.tagline}
              </p>
            )}

            <div style={{ height: 1, background: 'rgba(26,23,20,0.1)', marginBottom: 28 }} />

            {/* Color selector */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', color: '#1a1714', textTransform: 'uppercase', marginBottom: 12 }}>
                Color — <span style={{ fontWeight: 300, textTransform: 'none' }}>{product.colors[activeColor].name}</span>
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveColor(i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveColor(i); }}
                    title={c.name}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: c.hex,
                      outline: i === activeColor ? '2px solid #1a1714' : '2px solid transparent',
                      outlineOffset: 3,
                      cursor: 'pointer',
                      transition: 'outline-color 0.15s',
                      boxShadow: 'inset 0 0 0 1px rgba(26,23,20,0.12)',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', color: '#1a1714', textTransform: 'uppercase' }}>
                  Size {activeSize && <span style={{ fontWeight: 300, textTransform: 'none' }}>— {activeSize}</span>}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map((size) => {
                  const selected = activeSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      style={{
                        minWidth: size === 'ONE SIZE' ? 100 : 48,
                        height: 48,
                        padding: '0 12px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                        color: selected ? '#f5f0eb' : '#1a1714',
                        background: selected ? '#1a1714' : 'transparent',
                        border: `1px solid ${selected ? '#1a1714' : 'rgba(26,23,20,0.25)'}`,
                        borderRadius: 4, cursor: 'pointer',
                        transition: 'all 0.18s',
                      }}
                      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = '#1a1714'; }}
                      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = 'rgba(26,23,20,0.25)'; }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!activeSize && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#8a7d72', marginTop: 8, letterSpacing: '0.06em' }}>
                  Please select a size
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!activeSize}
              style={{
                width: '100%', height: 54, marginBottom: 12,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
                color: added ? '#1a1714' : '#f5f0eb',
                background: added ? '#c8b89a' : (activeSize ? '#1a1714' : 'rgba(26,23,20,0.25)'),
                border: 'none', borderRadius: 4, cursor: activeSize ? 'pointer' : 'not-allowed',
                transition: 'background 0.25s, color 0.25s',
                textTransform: 'uppercase',
              }}
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

            {/* Wishlist */}
            <button
              style={{
                width: '100%', height: 54, marginBottom: 36,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 400, letterSpacing: '0.14em',
                color: '#1a1714', background: 'transparent',
                border: '1px solid rgba(26,23,20,0.25)', borderRadius: 4, cursor: 'pointer',
                textTransform: 'uppercase', transition: 'border-color 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1714'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,23,20,0.25)'}
            >
              Save to Wishlist
            </button>

            {/* Description */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 18 : 22, fontWeight: 600, color: '#1a1714', marginBottom: 12, lineHeight: 1.3 }}>
                {desc.headline}
              </h3>
              {desc.body.map((para, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#4a4440', lineHeight: 1.8, marginBottom: 10 }}>
                  {para}
                </p>
              ))}
              {desc.brandLine && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', color: '#1a1714', textTransform: 'uppercase', margin: '20px 0' }}>
                  {desc.brandLine}
                </p>
              )}
              {desc.detailsTitle && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#1a1714', textTransform: 'uppercase', marginTop: 20, marginBottom: 10 }}>
                  {desc.detailsTitle}
                </p>
              )}
              {desc.details.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {desc.details.map((item, i) => (
                    <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#4a4440', lineHeight: 1.8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: '#8a7d72', flexShrink: 0, marginTop: 2 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {desc.closing && (
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, fontStyle: 'italic', color: '#1a1714', marginTop: 20 }}>
                  {desc.closing}
                </p>
              )}
            </div>

            {/* Accordions */}
            <Accordion label="Shipping & Returns">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#4a4440', lineHeight: 1.8 }}>
                Free standard shipping on orders over $100. Express available at checkout.
                Returns accepted within 30 days — unworn, original packaging. Final sale items excluded.
              </p>
            </Accordion>
            <Accordion label="Size Guide">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#4a4440' }}>
                  <thead>
                    <tr>
                      {['Size', 'Chest', 'Length', 'Shoulder'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '6px 12px 6px 0', fontWeight: 500, letterSpacing: '0.08em', borderBottom: '1px solid rgba(26,23,20,0.1)', color: '#1a1714' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['XS', '34"', '26"', '16"'],
                      ['S',  '36"', '27"', '17"'],
                      ['M',  '38"', '28"', '18"'],
                      ['L',  '40"', '29"', '19"'],
                      ['XL', '42"', '30"', '20"'],
                    ].map(row => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i} style={{ padding: '8px 12px 8px 0', borderBottom: '1px solid rgba(26,23,20,0.06)', fontWeight: i === 0 ? 500 : 300 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: '#8a7d72', marginTop: 10, lineHeight: 1.6 }}>
                  Measurements are in inches. When in doubt, size up for the relaxed fit.
                </p>
              </div>
            </Accordion>
            <Accordion label="Care Instructions">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#4a4440', lineHeight: 1.8 }}>
                Machine wash cold, inside out. Tumble dry low or lay flat to dry. Do not bleach. Iron on low if needed.
              </p>
            </Accordion>
            <div style={{ borderTop: '1px solid rgba(26,23,20,0.1)' }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
