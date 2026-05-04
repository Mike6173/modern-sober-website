import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopProductCard from '../components/shop/ShopProductCard';
import ShopFilterBar from '../components/shop/ShopFilterBar';
import { SHOP_PRODUCTS, CATEGORY_META, NAV_SHOP } from '../data/shopData';
import { useWindowWidth } from '../hooks/useWindowWidth';

function slugToLabel(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function CategoryPage() {
  const { gender, category } = useParams();
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;

  const base     = SHOP_PRODUCTS.filter(p => p.gender === gender && p.category === category);
  const [shown, setShown] = useState(base);

  useEffect(() => { setShown(base); }, [gender, category]); // eslint-disable-line

  const meta = CATEGORY_META[gender]?.[category];
  const genderLabel = NAV_SHOP.find(n => n.gender === gender)?.label || '';
  const catLabel    = slugToLabel(category || '');

  const cols = mob ? 2 : tab ? 3 : 4;

  return (
    <div style={{ background: '#f7f4f0', minHeight: '100vh' }}>
      <Navbar bgColor="#f7f4f0" />

      {/* Hero */}
      <section style={{ position: 'relative', height: mob ? 320 : 480, overflow: 'hidden', background: '#1a1714' }}>
        {meta?.hero && (
          <img
            src={meta.hero}
            alt={catLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.72 }}
          />
        )}
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.15) 60%, transparent 100%)' }} />
        {/* Text */}
        <div style={{ position: 'absolute', bottom: mob ? 32 : 48, left: mob ? 20 : 80 }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(245,240,235,0.7)', textTransform: 'uppercase', marginBottom: 10 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <span style={{ color: 'rgba(245,240,235,0.5)' }}>{genderLabel}</span>
            {' / '}
            {catLabel}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(28px,8vw,40px)' : 'clamp(36px,4vw,56px)', fontWeight: 600, color: '#f5f0eb', lineHeight: 1.1, marginBottom: 10 }}>
            {catLabel}
          </h1>
          {meta?.tagline && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 13 : 15, fontWeight: 300, color: 'rgba(245,240,235,0.8)', letterSpacing: '0.06em' }}>
              {meta.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Filter bar */}
      <ShopFilterBar products={base} onFiltered={setShown} />

      {/* Product count */}
      <div style={{ padding: mob ? '20px 20px 0' : '24px 80px 0', maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: '#8a7d72', letterSpacing: '0.08em' }}>
          {shown.length} {shown.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Product grid */}
      <section style={{ padding: mob ? '20px 20px 80px' : '28px 80px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#1a1714', marginBottom: 12 }}>No items match your filters.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a7d72' }}>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: mob ? '32px 12px' : tab ? '40px 20px' : '48px 28px',
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
