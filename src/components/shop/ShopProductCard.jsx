import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopProductCard({ product }) {
  const [hovered, setHovered]    = useState(false);
  const [activeColor, setActive] = useState(0);

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

      {/* Color swatches — stop propagation so clicking a swatch doesn't navigate */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, alignItems: 'center' }}>
        {product.colors.map((c, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setActive(i); }}
            title={c.name}
            style={{
              width: 18, height: 18,
              borderRadius: '50%',
              background: c.hex,
              border: 'none',
              cursor: 'pointer', padding: 0,
              flexShrink: 0,
              outline: i === activeColor ? '2px solid #1a1714' : '2px solid transparent',
              outlineOffset: 2,
              boxShadow: 'inset 0 0 0 1px rgba(26,23,20,0.15)',
              transition: 'outline-color 0.15s',
            }}
          />
        ))}
        {product.colors.length > 3 && (
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#8a7d72', marginLeft: 2 }}>
            +{product.colors.length - 3}
          </span>
        )}
      </div>

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
