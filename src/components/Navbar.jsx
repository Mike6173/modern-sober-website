import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

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
  { label: 'SHOP',      to: '/shop' },
  { label: 'OUR STORY', to: '/our-story' },
  { label: 'COMMUNITY', to: '/community' },
  { label: 'JOURNAL',   to: '/journal' },
  { label: 'CONTACT',   to: '/contact' },
];

export default function Navbar({ bgColor = '#f5f0eb' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const w      = useWindowWidth();
  const mobile = w < 768;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navH  = mobile ? 60 : 72;
  const navBg = scrolled || menuOpen ? bgColor : 'transparent';

  const desktopLinkStyle = ({ isActive }) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.14em',
    color: '#1a1714',
    textDecoration: 'none',
    borderBottom: isActive ? '1px solid #1a1714' : '1px solid transparent',
    paddingBottom: '3px',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        borderBottom: scrolled ? '1px solid rgba(26,23,20,0.08)' : 'none',
        transition: 'background 0.35s',
        padding: mobile ? '0 20px' : '0 48px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: navH,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
            <img
              src="/images/logo/ms-logo-light.png"
              alt="Modern Søber"
              style={{ height: mobile ? 28 : 36, width: 'auto', display: 'block' }}
            />
          </NavLink>

          {mobile ? (
            /* Hamburger icon */
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', minHeight: 44 }}
            >
              <span style={{ display: 'block', width: 22, height: 1.5, background: '#1a1714', transition: 'all 0.25s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}/>
              <span style={{ display: 'block', width: 22, height: 1.5, background: '#1a1714', transition: 'opacity 0.25s', opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ display: 'block', width: 22, height: 1.5, background: '#1a1714', transition: 'all 0.25s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}/>
            </button>
          ) : (
            <>
              {/* Desktop center nav */}
              <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink key={to} to={to} style={desktopLinkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = '#1a1714'; }}
                    onMouseLeave={(e) => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.borderBottomColor = 'transparent'; }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
              {/* Desktop right icons */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex' }}><IconUser/></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex' }}><IconCart/></button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      {mobile && (
        <div style={{
          position: 'fixed',
          top: navH, left: 0, right: 0, bottom: 0,
          background: bgColor,
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 28px 48px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: isActive ? '#1a1714' : '#4a4440',
                  textDecoration: 'none',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(26,23,20,0.08)',
                  display: 'block',
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 20, marginTop: 44 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex', minHeight: 44, alignItems: 'center' }}><IconUser/></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex', minHeight: 44, alignItems: 'center' }}><IconCart/></button>
          </div>
        </div>
      )}
    </>
  );
}
