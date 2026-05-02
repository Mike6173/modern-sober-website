import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const NAV_LINKS = [
  { label: 'SHOP', to: '/shop' },
  { label: 'OUR STORY', to: '/our-story' },
  { label: 'COMMUNITY', to: '/community' },
  { label: 'JOURNAL', to: '/journal' },
  { label: 'CONTACT', to: '/contact' },
];

export default function Footer() {
  const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    color: '#6a6058',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };

  return (
    <footer style={{ background: '#f5f0eb', borderTop: '1px solid rgba(26,23,20,0.1)', padding: '48px 80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', marginBottom: 32 }}>

          {/* Logo */}
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.22em', lineHeight: 1.5, textTransform: 'uppercase' }}>
            MODERN<br/>SØBER
          </div>

          {/* Nav links */}
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

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
            <a href="#" style={{ color: '#1a1714', display: 'flex' }} aria-label="Facebook"><Facebook size={18}/></a>
            <a href="#" style={{ color: '#1a1714', display: 'flex' }} aria-label="Instagram"><Instagram size={18} strokeWidth={1.8}/></a>
          </div>
        </div>

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
