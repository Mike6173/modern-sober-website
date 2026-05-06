import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { useWindowWidth } from '../hooks/useWindowWidth';

const NAV_LINKS = [
  { label: 'SHOP',          to: '/shop' },
  { label: 'PRE-ORDER BOOK', to: '/pre-order' },
  { label: 'OUR STORY',     to: '/our-story' },
  { label: 'COMMUNITY', to: '/community' },
  { label: 'JOURNAL',   to: '/journal' },
  { label: 'CONTACT',   to: '/contact' },
];

export default function Footer() {
  const w   = useWindowWidth();
  const mob = w < 768;

  const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    color: '#6a6058',
    textDecoration: 'none',
    transition: 'color 0.2s',
    minHeight: 44,
    display: 'inline-flex',
    alignItems: 'center',
  };

  return (
    <footer style={{ background: '#f5f0eb', borderTop: '1px solid rgba(26,23,20,0.1)', padding: mob ? '40px 24px 28px' : '48px 80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {mob ? (
          /* Mobile: stacked layout */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, marginBottom: 28 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.22em', lineHeight: 1.5, textTransform: 'uppercase', textAlign: 'center' }}>
              MODERN<br/>SØBER
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = '#1a1714'}
                  onMouseLeave={(e) => e.target.style.color = '#6a6058'}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <a href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1714', display: 'flex', minHeight: 44, alignItems: 'center' }} aria-label="Facebook"><Facebook size={18}/></a>
              <a href="https://www.instagram.com/modern.sober/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1714', display: 'flex', minHeight: 44, alignItems: 'center' }} aria-label="Instagram"><Instagram size={18} strokeWidth={1.8}/></a>
            </div>
          </div>
        ) : (
          /* Desktop: 3-column grid */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.22em', lineHeight: 1.5, textTransform: 'uppercase' }}>
              MODERN<br/>SØBER
            </div>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = '#1a1714'}
                  onMouseLeave={(e) => e.target.style.color = '#6a6058'}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
              <a href="#" style={{ color: '#1a1714', display: 'flex' }} aria-label="Facebook"><Facebook size={18}/></a>
              <a href="#" style={{ color: '#1a1714', display: 'flex' }} aria-label="Instagram"><Instagram size={18} strokeWidth={1.8}/></a>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(26,23,20,0.08)', paddingTop: 20, textAlign: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 300, letterSpacing: '0.08em', color: '#8a7d72' }}>
            © 2026 Modern Søber. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
