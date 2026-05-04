import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopProductCard from '../components/shop/ShopProductCard';
import ShopFilterBar from '../components/shop/ShopFilterBar';
import { SHOP_PRODUCTS, NAV_SHOP } from '../data/shopData';
import { useWindowWidth } from '../hooks/useWindowWidth';

const HERO_IMAGES = {
  men:    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1400&h=680&q=80',
  women:  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&h=680&q=80',
  unisex: '/images/products/cap/cap-02-tennis.jpg',
};

const HERO_TAGLINES = {
  men:    'Elevated essentials for the modern man.',
  women:  'Refined pieces for every occasion.',
  unisex: 'Shared style, no boundaries.',
};

export default function GenderPage() {
  const { gender } = useParams();
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;

  const navEntry   = NAV_SHOP.find(n => n.gender === gender);
  const categories = navEntry?.categories || [];
  const allProducts = SHOP_PRODUCTS.filter(p => p.gender === gender);

  const [activeTab, setActiveTab] = useState('all');
  const [shown, setShown]         = useState(allProducts);

  const tabProducts = activeTab === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeTab);

  // Reset shown products when gender or tab changes
  useEffect(() => {
    setShown(activeTab === 'all' ? allProducts : allProducts.filter(p => p.category === activeTab));
  }, [gender, activeTab]); // eslint-disable-line

  const cols = mob ? 2 : tab ? 3 : 4;
  const genderLabel = navEntry?.label || '';

  return (
    <div style={{ background: '#f7f4f0', minHeight: '100vh' }}>
      <Navbar bgColor="#f7f4f0" />

      {/* Hero */}
      <section style={{ position: 'relative', height: mob ? 320 : 480, overflow: 'hidden', background: '#1a1714' }}>
        <img
          src={HERO_IMAGES[gender] || HERO_IMAGES.men}
          alt={genderLabel}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.72 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: mob ? 32 : 48, left: mob ? 20 : 80 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(245,240,235,0.7)', textTransform: 'uppercase', marginBottom: 10 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            {genderLabel}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(28px,8vw,40px)' : 'clamp(36px,4vw,56px)', fontWeight: 600, color: '#f5f0eb', lineHeight: 1.1, marginBottom: 10 }}>
            {genderLabel}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? 13 : 15, fontWeight: 300, color: 'rgba(245,240,235,0.8)', letterSpacing: '0.06em' }}>
            {HERO_TAGLINES[gender]}
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div style={{
        borderBottom: '1px solid rgba(26,23,20,0.1)',
        background: '#f7f4f0',
        padding: mob ? '0 20px' : '0 80px',
        overflowX: 'auto',
        position: 'sticky',
        top: mob ? 60 : 72,
        zIndex: 49,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 0 }}>
          {[{ slug: 'all', label: 'All' }, ...categories].map(({ slug, label }) => {
            const active = activeTab === slug;
            return (
              <button
                key={slug}
                onClick={() => setActiveTab(slug)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: active ? '#1a1714' : '#8a7d72',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '2px solid #1a1714' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: mob ? '14px 16px' : '16px 20px',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.18s, border-color 0.18s',
                }}
              >
                {label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter bar */}
      <ShopFilterBar products={tabProducts} onFiltered={setShown} />

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
