import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const to = product.slug ? `/shop/product/${product.slug}` : '#';

  return (
    <div
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — links to PDP */}
      <Link to={to} style={{ textDecoration: 'none', display: 'block', marginBottom: 14 }}>
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 6, background: '#ede8e2' }}>
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {/* Badges */}
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {product.trending && (
              <span style={{ background: '#1a1714', color: '#f5f0eb', fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', padding: '3px 7px' }}>
                TRENDING
              </span>
            )}
            {product.new && (
              <span style={{ background: '#c8b89a', color: '#1a1714', fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', padding: '3px 7px' }}>
                NEW
              </span>
            )}
          </div>
        </div>
      </Link>


      {/* Name + price — link to PDP */}
      <Link to={to} style={{ textDecoration: 'none' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', color: '#1a1714', textTransform: 'uppercase', marginBottom: 4, lineHeight: 1.4 }}>
          {product.name}
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 400, color: '#1a1714' }}>
          ${product.price}
        </p>
      </Link>
    </div>
  );
}
