import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const PRODUCTS = [
  { id: 1, name: 'PREMIUM HOODIE',       price: '$98', tagline: 'Built for clarity.',     img: 'https://images.unsplash.com/photo-1573156555591-189ac70df8fb?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Oversized black hoodie, editorial — front view on model' },
  { id: 2, name: 'ESSENTIAL TEE',        price: '$42', tagline: 'Daily standard.',         img: 'https://images.unsplash.com/photo-1620799139652-715e4d5b232d?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Minimal white tee, clean editorial product shot' },
  { id: 3, name: 'MINIMAL CAP',          price: '$38', tagline: 'Clean. Intentional.',     img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Structured cap with MS embroidery, side angle' },
  { id: 4, name: 'HEAVYWEIGHT CREWNECK', price: '$88', tagline: 'Quiet weight.',           img: 'https://images.unsplash.com/photo-1570358934903-35c0ff1bd95e?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Heavyweight black crewneck, flat lay on dark surface' },
  { id: 5, name: 'TAILORED JOGGER',      price: '$78', tagline: 'Sharp lines. Soft hand.', img: 'https://images.unsplash.com/photo-1428894976381-853e04af6262?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Tailored jogger, clean editorial flat lay' },
  { id: 6, name: 'CANVAS TOTE',          price: '$34', tagline: 'Carry less. Better.',     img: 'https://images.unsplash.com/photo-1659938306569-fca83087aaa3?auto=format&fit=crop&w=600&h=750&q=80', alt: 'Natural canvas tote with Modern Søber wordmark' },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap" style={{ aspectRatio: '4/5', marginBottom: 20 }}>
        <img src={product.img} alt={product.alt} />
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', color: '#1a1714', marginBottom: 4, textTransform: 'uppercase' }}>
        {product.name}
      </p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 400, color: '#1a1714', marginBottom: 4 }}>
        {product.price}
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8a7d72', marginBottom: 20 }}>
        {product.tagline}
      </p>
      <button className="btn-product">VIEW</button>
    </div>
  );
}

// ── Email capture ──────────────────────────────────────────────────────────
function EmailCapture() {
  const [email, setEmail] = useState('');
  return (
    <div style={{ display: 'flex', gap: 0, maxWidth: 380, margin: '32px auto 0' }}>
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
          borderRight: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          color: '#1a1714',
          outline: 'none',
        }}
      />
      <button
        className="btn-primary"
        style={{ padding: '14px 24px', whiteSpace: 'nowrap', fontSize: '10px' }}
        onClick={() => setEmail('')}
      >
        NOTIFY ME
      </button>
    </div>
  );
}

export default function Shop() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <PageHero
        eyebrow="THE COLLECTION"
        headline="Built for the standard."
        subtitle="Quiet pieces. Considered details. Made for the people choosing better."
      />

      {/* Product grid */}
      <section style={{ padding: '80px 80px 100px', background: '#f5f0eb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px 32px' }}>
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Closing band */}
      <section style={{ background: '#ede8e2', padding: '100px 80px', textAlign: 'center', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 600, color: '#1a1714', marginBottom: 12 }}>
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
