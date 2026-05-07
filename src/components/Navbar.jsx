import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';

// NAV_SHOP (Men/Women/Unisex) — hidden from nav per client, kept for category pages
// import { NAV_SHOP } from '../data/shopData';

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

// Shop dropdown links (category-based)
const SHOP_LINKS = [
  { label: 'All',     to: '/shop' },
  { label: 'Hoodies', to: '/shop/hoodies' },
  { label: 'Tees',    to: '/shop/tees' },
  { label: 'Caps',    to: '/shop/caps' },
];

const SECONDARY_LINKS = [
  { label: 'BOOK',      to: '/pre-order' },
  { label: 'OUR STORY', to: '/our-story' },
  { label: 'COMMUNITY', to: '/community' },
  { label: 'JOURNAL',   to: '/journal'   },
  { label: 'CONTACT',   to: '/contact'   },
];

export default function Navbar({ bgColor = '#f5f0eb' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const hoverTimer = useRef(null);
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

  const openShop  = () => { clearTimeout(hoverTimer.current); setShopOpen(true); };
  const closeShop = () => { hoverTimer.current = setTimeout(() => setShopOpen(false), 140); };
  const keepShop  = () => { clearTimeout(hoverTimer.current); };

  const navH  = mobile ? 60 : 72;
  const navBg = scrolled || menuOpen || shopOpen ? bgColor : 'transparent';

  const secLinkStyle = ({ isActive }) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.14em',
    color: '#1a1714',
    textDecoration: 'none',
    borderBottom: isActive ? '1px solid #1a1714' : '1px solid transparent',
    paddingBottom: '3px',
    transition: 'border-color 0.2s',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        borderBottom: (scrolled || shopOpen) ? '1px solid rgba(26,23,20,0.08)' : 'none',
        transition: 'background 0.35s',
        padding: mobile ? '0 24px' : '0 48px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: navH }}>

          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', flexShrink: 0 }} onClick={() => { setMenuOpen(false); setShopOpen(false); }}>
            <img src="/images/logo/MSLOGONAV.png" alt="Modern Søber" style={{ height: mobile ? 44 : 56, width: 'auto', display: 'block' }} />
          </NavLink>

          {mobile ? (
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
              {/* Desktop nav */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {/* SHOP dropdown trigger */}
                <div
                  onMouseEnter={openShop}
                  onMouseLeave={closeShop}
                  style={{ position: 'relative' }}
                >
                  <button style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    color: '#1a1714',
                    background: 'none',
                    border: 'none',
                    borderBottom: shopOpen ? '1px solid #1a1714' : '1px solid transparent',
                    padding: '0 0 3px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    transition: 'border-color 0.2s',
                  }}>
                    SHOP <IconChevron open={shopOpen} />
                  </button>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 16, background: 'rgba(26,23,20,0.15)' }} />

                {/* Secondary links */}
                {SECONDARY_LINKS.map(({ label, to }) => (
                  <NavLink key={to} to={to} style={secLinkStyle}
                    onMouseEnter={e => { e.currentTarget.style.borderBottomColor = '#6a6058'; }}
                    onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.borderBottomColor = 'transparent'; }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Cart icon */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex' }}><IconCart /></button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* ── Desktop SHOP dropdown panel ───────────────────────────────────── */}
      {shopOpen && !mobile && (
        <div
          className="shop-dropdown"
          onMouseEnter={keepShop}
          onMouseLeave={closeShop}
          style={{
            position: 'fixed',
            top: navH,
            left: 0, right: 0,
            background: '#f7f4f0',
            borderBottom: '1px solid rgba(26,23,20,0.1)',
            zIndex: 99,
            padding: '28px 80px',
            boxShadow: '0 8px 32px rgba(26,23,20,0.06)',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center' }}>
            {SHOP_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setShopOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: '#1a1714',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  paddingBottom: 3,
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderBottomColor = '#1a1714'; }}
                onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile full-screen drawer ─────────────────────────────────────── */}
      {mobile && (
        <div style={{
          position: 'fixed', top: navH, left: 0, right: 0, bottom: 0,
          background: bgColor, zIndex: 99,
          display: 'flex', flexDirection: 'column',
          padding: '32px 28px 48px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}>
          {/* SHOP accordion */}
          <div style={{ borderBottom: '1px solid rgba(26,23,20,0.08)' }}>
            <button
              onClick={() => setMobileShopOpen(o => !o)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '24px', fontWeight: 400, letterSpacing: '0.04em', color: '#1a1714', textTransform: 'uppercase' }}>SHOP</span>
              <IconChevron open={mobileShopOpen} />
            </button>
            {mobileShopOpen && (
              <div style={{ paddingBottom: 16, paddingLeft: 16 }}>
                {SHOP_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: '#4a4440', textDecoration: 'none', padding: '10px 0' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Secondary links */}
          {SECONDARY_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '24px', fontWeight: 400, letterSpacing: '0.04em',
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

          <div style={{ display: 'flex', marginTop: 44 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1a1714', display: 'flex', minHeight: 44, alignItems: 'center' }}><IconCart /></button>
          </div>
        </div>
      )}
    </>
  );
}
