import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const NAV_LINKS = [
  { label: 'SHOP', to: '/shop' },
  { label: 'OUR STORY', to: '/our-story' },
  { label: 'COMMUNITY', to: '/community' },
  { label: 'JOURNAL', to: '/journal' },
  { label: 'CONTACT', to: '/contact' },
];

// bgColor: optional override for scroll-filled background (Home passes tweaks.bgColor)
export default function Navbar({ bgColor = '#f5f0eb' }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? bgColor : 'transparent',
    borderBottom: scrolled ? '1px solid rgba(26,23,20,0.08)' : 'none',
    transition: 'background 0.35s, border-color 0.35s',
    padding: '0 48px',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', color: '#1a1714' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.22em', lineHeight: 1.4, textTransform: 'uppercase', cursor: 'pointer' }}>
            MODERN<br/>SØBER
          </div>
        </NavLink>

        {/* Center nav */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#1a1714',
                textDecoration: 'none',
                padding: '4px 0',
                borderBottom: isActive ? '1px solid #1a1714' : '1px solid transparent',
                paddingBottom: isActive ? '3px' : '4px',
                transition: 'border-color 0.2s',
                cursor: 'pointer',
              })}
              onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.borderBottomColor = '#1a1714'; }}
              onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex' }}><IconUser/></button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex' }}><IconCart/></button>
        </div>
      </div>
    </nav>
  );
}
