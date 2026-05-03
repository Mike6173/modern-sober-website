import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ProductFeature from '../components/ProductFeature';
import ProductGallery from '../components/ProductGallery';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { products } from '../data/products';

function EmailCapture() {
  const [email, setEmail] = useState('');
  const w   = useWindowWidth();
  const mob = w < 600;
  return (
    <div style={{ maxWidth: 380, margin: '32px auto 0', display: 'flex', flexDirection: mob ? 'column' : 'row' }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          flex: 1,
          padding: '14px 16px',
          background: 'transparent',
          border: '1px solid rgba(26,23,20,0.3)',
          borderRight: mob ? '1px solid rgba(26,23,20,0.3)' : 'none',
          borderBottom: mob ? 'none' : undefined,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          color: '#1a1714',
          outline: 'none',
          minHeight: 48,
        }}
      />
      <button
        className="btn-primary"
        style={{ padding: '14px 24px', whiteSpace: 'nowrap', fontSize: '10px', minHeight: 48, width: mob ? '100%' : 'auto' }}
        onClick={() => setEmail('')}
      >
        NOTIFY ME
      </button>
    </div>
  );
}

export default function Shop() {
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;

  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />
      <PageHero
        eyebrow="THE COLLECTION"
        headline="Built for the standard."
        subtitle="Quiet pieces. Considered details. Made for the people choosing better."
      />

      {/* Product feature sections */}
      <section style={{ padding: mob ? '48px 24px 32px' : '80px 80px 40px', background: '#f5f0eb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductFeature product={product} />
              {product.galleryImages.length > 0 && (
                <ProductGallery images={product.galleryImages} />
              )}
              <div style={{ width: '100%', height: 1, background: 'rgba(26,23,20,0.08)', marginBottom: mob ? 64 : 96 }}/>
            </div>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section style={{ background: '#ede8e2', padding: mob ? '64px 24px' : '100px 80px', textAlign: 'center', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 600, color: '#1a1714', marginBottom: 12 }}>
          More dropping soon.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#6a6058', letterSpacing: '0.04em' }}>
          Join the list to know first.
        </p>
        <EmailCapture />
      </section>

      <Footer />
    </div>
  );
}
