import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ShopProductCard from './ShopProductCard';
import ShopFilterBar from './ShopFilterBar';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export default function CatalogPage({ products, meta }) {
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;

  const [shown, setShown] = useState(products);

  // Reset when products prop changes (navigation between category pages)
  useEffect(() => { setShown(products); }, [products]);

  const cols = mob ? 2 : tab ? 3 : 4;

  return (
    <div style={{ background: '#f7f4f0', minHeight: '100vh' }}>
      <Navbar bgColor="#f7f4f0" />

      {/* Hero */}
      <section style={{ position: 'relative', height: mob ? 320 : 480, overflow: 'hidden', background: '#1a1714' }}>
        {meta.hero && (
          <img
            src={meta.hero}
            alt={meta.headline}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.68 }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.6) 0%, rgba(26,23,20,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: mob ? 32 : 48, left: mob ? 24 : 80 }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(245,240,235,0.7)', textTransform: 'uppercase', marginBottom: 12,
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
            {meta.eyebrow !== 'THE COLLECTION' && (
              <> {' / '} {meta.eyebrow}</>
            )}
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: mob ? 'clamp(28px,8vw,40px)' : 'clamp(36px,4vw,56px)',
            fontWeight: 600, color: '#f5f0eb', lineHeight: 1.1, marginBottom: 10,
          }}>
            {meta.headline}
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: mob ? 12 : 14, fontWeight: 300,
            color: 'rgba(245,240,235,0.75)', letterSpacing: '0.08em',
          }}>
            {meta.eyebrow === 'THE COLLECTION' ? 'Quiet pieces. Considered details.' : `Modern Søber — ${meta.eyebrow.charAt(0) + meta.eyebrow.slice(1).toLowerCase()}`}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <ShopFilterBar products={products} onFiltered={setShown} />

      {/* Count */}
      <div style={{ padding: mob ? '20px 24px 0' : '24px 80px 0', maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: '#8a7d72', letterSpacing: '0.08em' }}>
          {shown.length} {shown.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Product grid */}
      <section style={{ padding: mob ? '20px 24px 80px' : '28px 80px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#1a1714', marginBottom: 12 }}>
                No items match your filters.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a7d72' }}>
                Try adjusting or clearing your filters.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: mob ? '32px 16px' : tab ? '40px 20px' : '48px 28px',
            }}>
              {shown.map(p => <ShopProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
