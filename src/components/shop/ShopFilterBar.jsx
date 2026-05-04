import { useState, useRef, useEffect } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const SORT_OPTS = ['Featured', 'Newest', 'Price: Low–High', 'Price: High–Low'];

function PillDropdown({ label, options, value, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = value !== null;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
          color: active ? '#f5f0eb' : '#1a1714',
          background: active ? '#1a1714' : 'transparent',
          border: `1px solid ${active ? '#1a1714' : 'rgba(26,23,20,0.25)'}`,
          borderRadius: 20,
          padding: '10px 16px',
          minHeight: 40,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all 0.18s',
          whiteSpace: 'nowrap',
        }}
      >
        {value || label}
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1l3 3 3-3" stroke={active ? '#f5f0eb' : '#1a1714'} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0,
          background: '#f7f4f0', border: '1px solid rgba(26,23,20,0.1)',
          borderRadius: 8, boxShadow: '0 8px 24px rgba(26,23,20,0.08)',
          minWidth: 140, zIndex: 200, padding: '6px 0',
          animation: 'shopDropIn 0.15s ease',
        }}>
          {value !== null && (
            <button
              onClick={() => { onSelect(null); setOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8a7d72', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}
            >
              Clear
            </button>
          )}
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '9px 16px',
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: opt === value ? 500 : 400,
                color: opt === value ? '#1a1714' : '#4a4440',
                background: opt === value ? 'rgba(26,23,20,0.05)' : 'none',
                border: 'none', cursor: 'pointer', letterSpacing: '0.08em',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,23,20,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = opt === value ? 'rgba(26,23,20,0.05)' : 'none'; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopFilterBar({ products, onFiltered }) {
  const w   = useWindowWidth();
  const mob = w < 768;

  const [size, setSize]   = useState(null);
  const [color, setColor] = useState(null);
  const [fit, setFit]     = useState(null);
  const [sort, setSort]   = useState('Featured');

  // Derive unique options from products
  const allSizes  = [...new Set(products.flatMap(p => p.sizes))];
  const allFits   = [...new Set(products.map(p => p.fit).filter(Boolean))];
  const allColors = [...new Set(products.flatMap(p => p.colors.map(c => c.name)))];

  useEffect(() => {
    let result = [...products];
    if (size)  result = result.filter(p => p.sizes.includes(size));
    if (color) result = result.filter(p => p.colors.some(c => c.name === color));
    if (fit)   result = result.filter(p => p.fit === fit.toLowerCase());
    if (sort === 'Newest')          result = [...result].filter(p => p.new).concat(result.filter(p => !p.new));
    if (sort === 'Price: Low–High') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High–Low') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'Featured')        result = [...result].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    onFiltered(result);
  }, [size, color, fit, sort]); // eslint-disable-line

  const hasFilters = size || color || fit;

  return (
    <div style={{
      borderTop: '1px solid rgba(26,23,20,0.1)',
      borderBottom: '1px solid rgba(26,23,20,0.1)',
      padding: mob ? '14px 24px' : '14px 80px',
      background: '#f7f4f0',
      position: 'sticky', top: mob ? 60 : 72, zIndex: 50,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <PillDropdown label="Size"  options={allSizes}  value={size}  onSelect={setSize} />
          <PillDropdown label="Color" options={allColors} value={color} onSelect={setColor} />
          <PillDropdown label="Fit"   options={allFits.map(f => f.charAt(0).toUpperCase() + f.slice(1))}
            value={fit} onSelect={setFit} />

          {hasFilters && (
            <button
              onClick={() => { setSize(null); setColor(null); setFit(null); }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#8a7d72', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', padding: '7px 4px', textDecoration: 'underline' }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PillDropdown label="Sort" options={SORT_OPTS} value={sort !== 'Featured' ? sort : null} onSelect={v => setSort(v || 'Featured')} />
        </div>
      </div>
    </div>
  );
}
