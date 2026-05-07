import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../modernsoberhero.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWindowWidth } from '../hooks/useWindowWidth';
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakColor, TweakSelect, TweakText, TweakToggle,
} from '../components/TweaksPanel';

// ── Tweak defaults ─────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bgColor": "#f5f0eb",
  "accentColor": "#1a1714",
  "headingFont": "Cormorant Garamond",
  "heroHeadline": "Clarity is a luxury.",
  "heroSub": "You don't have to crash to change.\nYou just have to choose better.",
  "ctaPrimary": "SHOP NOW",
  "ctaSecondary": "JOIN THE COMMUNITY",
  "showSocialProof": true,
  "productSection": "Start with one decision."
}/*EDITMODE-END*/;

// ── SVG Icons ──────────────────────────────────────────────────────────────
const IconTarget = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <circle cx="18" cy="18" r="14"/><circle cx="18" cy="18" r="8"/>
    <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none"/>
    <line x1="18" y1="4" x2="18" y2="0"/><line x1="18" y1="32" x2="18" y2="36"/>
    <line x1="4" y1="18" x2="0" y2="18"/><line x1="32" y1="18" x2="36" y2="18"/>
  </svg>
);
const IconShield = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3L5 8v10c0 7.5 5.5 13.5 13 15.5 7.5-2 13-8 13-15.5V8z"/>
  </svg>
);
const IconCrown = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 26h28M6 26L4 12l8 6 6-10 6 10 8-6-2 14z"/>
    <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="32" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="2" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconPeople = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="5"/><circle cx="24" cy="10" r="5"/>
    <path d="M2 30c0-6 4.5-10 10-10"/><path d="M24 20c5.5 0 10 4 10 10"/>
    <path d="M13 30c0-5 2-8 5-9 3 1 5 4 5 9"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconQuote = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor" opacity="0.7">
    <path d="M0 22V13.2C0 5.6 4.4 1.4 13.2 0l1.4 2.8C10 3.8 7.8 6 7.2 9.6H12V22H0zm16 0V13.2C16 5.6 20.4 1.4 29.2 0L30.6 2.8C26 3.8 23.8 6 23.2 9.6H28V22H16z"/>
  </svg>
);

// ── Image Placeholder ──────────────────────────────────────────────────────
const ImgPlaceholder = ({ label, w, h, dark = false, style = {} }) => {
  const bg = dark ? "#2a2520" : "#d9d0c5";
  const stripe = dark ? "#302a24" : "#cec5b8";
  const textColor = dark ? "#8a7f74" : "#7a7068";
  const id = `stripe-${Math.random().toString(36).substr(2, 6)}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="12" height="12" fill={bg}/>
          <rect width="5" height="12" fill={stripe}/>
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`}/>
      <text x={w/2} y={h/2 - 6} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={textColor} letterSpacing="0.5">{label}</text>
      <text x={w/2} y={h/2 + 10} textAnchor="middle" fontFamily="monospace" fontSize="10" fill={textColor} opacity="0.7">{w}×{h}</text>
    </svg>
  );
};

// ── Hero ───────────────────────────────────────────────────────────────────
const Hero = ({ tweaks }) => {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverBook, setHoverBook] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const avatarColors = ["#c8b89a", "#b5a990", "#9e9285", "#8a7d72"];
  const avatarFaces = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
  ];
  const w   = useWindowWidth();
  const mob = w < 768;

  return (
    <section style={{ position: "relative", minHeight: mob ? "75vh" : "100vh", overflow: "hidden", background: "#1a1714" }}>
      {/* SVG unsharp mask filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="sharpen">
            <feConvolveMatrix order="3" kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0" preserveAlpha="true"/>
          </filter>
        </defs>
      </svg>

      {/* Mobile background — frosted yacht image */}
      {mob && (
        <img
          src="/images/products/hoodie/hoodie-03-yacht-sitting.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      )}
      {mob && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(245,240,235,0.52)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }} />
      )}

      {/* Desktop background — original hero image */}
      {!mob && (
        <>
          <img
            src="/images/founders/founders-rooftop.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 20%",
              filter: "brightness(0.65) contrast(1.08) saturate(1.05) url(#sharpen)",
              imageRendering: "high-quality",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #f5f0eb 22%, rgba(245,240,235,0.75) 34%, rgba(245,240,235,0.15) 50%, transparent 62%)",
          }} />
        </>
      )}

      {/* Text content */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        alignItems: mob ? "center" : "flex-start",
        textAlign: mob ? "center" : "left",
        minHeight: mob ? "75vh" : "100vh",
        padding: mob ? "72px 24px 48px" : "120px 80px 80px 80px",
        maxWidth: mob ? "100%" : 560,
        margin: mob ? "0 auto" : "0",
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mob ? "clamp(18px, 5vw, 24px)" : "clamp(32px, 3.5vw, 48px)", fontWeight: 500, letterSpacing: "0.24em", color: "#1a1714", marginBottom: 16, textTransform: "uppercase" }}>
          MODERN SØBER
        </p>
        <h1 style={{
          fontFamily: `'${tweaks.headingFont}', serif`,
          fontSize: mob ? "clamp(36px, 10vw, 52px)" : "clamp(52px, 6vw, 88px)",
          fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.01em", color: "#1a1714",
          marginBottom: 20, whiteSpace: "pre-line",
        }}>
          {tweaks.heroHeadline}
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.75, color: "#4a4440", marginBottom: 28, whiteSpace: "pre-line", maxWidth: mob ? 300 : 360 }}>
          {tweaks.heroSub}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: mob ? "100%" : 280, maxWidth: 320, marginBottom: 28 }}>
          <Link to="/shop" style={{ textDecoration: 'none' }}>
            <button
              style={{ background: hoverPrimary ? "#2e2a26" : "#1a1714", color: "#f5f0eb", border: "none", padding: "14px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", minHeight: 48, width: "100%" }}
              onMouseEnter={() => setHoverPrimary(true)} onMouseLeave={() => setHoverPrimary(false)}
            >{tweaks.ctaPrimary}</button>
          </Link>
          <Link to="/pre-order" style={{ textDecoration: 'none' }}>
            <button
              style={{ background: hoverBook ? "rgba(26,23,20,0.05)" : "transparent", color: "#1a1714", border: "1.5px solid #1a1714", padding: "13px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", minHeight: 48, width: "100%" }}
              onMouseEnter={() => setHoverBook(true)} onMouseLeave={() => setHoverBook(false)}
            >PRE-ORDER BOOK</button>
          </Link>
          <a
            href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer"
            style={{ background: hoverSecondary ? "rgba(26,23,20,0.05)" : "transparent", color: "#1a1714", border: "1.5px solid #1a1714", padding: "13px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 48, textDecoration: 'none' }}
            onMouseEnter={() => setHoverSecondary(true)} onMouseLeave={() => setHoverSecondary(false)}
          ><IconFacebook/> {tweaks.ctaSecondary}</a>
        </div>
        {tweaks.showSocialProof && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: mob ? "center" : "flex-start", gap: 12 }}>
            <div style={{ display: "flex" }}>
              {avatarFaces.map((src, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: avatarColors[i], border: "2px solid #f5f0eb", marginLeft: i > 0 ? -10 : 0, overflow: "hidden", flexShrink: 0 }}>
                  <img src={src} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 300, color: "#6a6058", lineHeight: 1.5, textAlign: mob ? "left" : "left" }}>
              Thousands are already<br/>choosing clarity.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// ── Value Props ────────────────────────────────────────────────────────────
const ValueProps = ({ tweaks }) => {
  const w   = useWindowWidth();
  const mob = w < 768;
  const props = [
    { Icon: IconTarget, title: "CLARITY OVER CHAOS",    body: "We choose focus.\nWe protect our energy." },
    { Icon: IconShield, title: "DISCIPLINE IS FREEDOM", body: "No shortcuts.\nOnly standards." },
    { Icon: IconCrown,  title: "ELEVATE DAILY",         body: "In mindset.\nIn habits.\nIn life." },
    { Icon: IconPeople, title: "COMMUNITY OF CHOICE",   body: "We surround ourselves with people who move forward." },
  ];
  return (
    <section style={{ background: tweaks.bgColor, borderTop: "1px solid rgba(26,23,20,0.1)", borderBottom: "1px solid rgba(26,23,20,0.1)" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)",
      }}>
        {props.map(({ Icon, title, body }, i) => (
          <div key={i} style={{
            padding: mob ? "40px 24px" : "60px 48px",
            borderRight: mob
              ? (i % 2 === 0 ? "1px solid rgba(26,23,20,0.1)" : "none")
              : (i < 3 ? "1px solid rgba(26,23,20,0.1)" : "none"),
            borderBottom: mob && i < 2 ? "1px solid rgba(26,23,20,0.1)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16,
          }}>
            <div style={{ color: "#1a1714", opacity: 0.7 }}><Icon/></div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 300, letterSpacing: "0.28em", color: "#1a1714", textTransform: "uppercase" }}>{title}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.8, color: "#6a6058", whiteSpace: "pre-line" }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Story ──────────────────────────────────────────────────────────────────
const Story = ({ tweaks }) => {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "55fr 45fr", minHeight: mob ? "auto" : 640 }}>
      {/* Quote text column */}
      <div style={{ position: "relative", background: "#1e1b18", padding: mob ? "56px 24px" : "100px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ color: "#c8b89a", marginBottom: 28 }}><IconQuote/></div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.9, color: "#b5a99a", marginBottom: 28 }}>
          I lived in environments where excess was normal.<br/>Where success and escape looked the same.
        </p>
        <p style={{ fontFamily: `'${tweaks.headingFont}', serif`, fontSize: "20px", fontWeight: 600, color: "#f0ebe4", marginBottom: 24, lineHeight: 1.4 }}>
          Everything worked — until it didn't.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.9, color: "#b5a99a", marginBottom: 28 }}>
          Clarity became the edge.<br/>Discipline became the advantage.
        </p>
        <p style={{ fontFamily: `'${tweaks.headingFont}', serif`, fontSize: "20px", fontWeight: 600, color: "#f0ebe4", marginBottom: 36, lineHeight: 1.4 }}>
          This isn't about restriction.<br/>It's about control.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 300, color: "#8a7d72", letterSpacing: "0.05em", marginBottom: 6 }}>—</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 300, color: "#8a7d72", letterSpacing: "0.05em" }}>Brandon Smith, Founder</p>
        {/* Headshot avatar — mobile only, pinned to bottom-right corner */}
        {mob && (
          <div style={{ position: "absolute", bottom: 24, right: 24, width: 128, height: 128, borderRadius: "50%", overflow: "hidden", border: "1.5px solid #5a4f47" }}>
            <img
              src="/images/founder/brandon-smith.jpg"
              alt="Brandon Smith, founder of Modern Søber"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>
        )}
      </div>
      {/* Headshot column — full-bleed image */}
      <div style={{ overflow: "hidden", position: "relative", minHeight: mob ? 260 : "auto" }}>
        <img
          src="/images/founder/brandon-final.png"
          alt="Brandon Smith, founder of Modern Søber"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          loading="lazy"
        />
      </div>
    </section>
  );
};

// ── Products ───────────────────────────────────────────────────────────────
const Products = ({ tweaks }) => {
  const products = [
    { name: "ESSENTIAL HOODIE", desc: "Built for clarity.",   realImg: "/images/products/hoodie/hoodie-03-yacht-sitting.jpg",       link: "/shop/product/essential-hoodie" },
    { name: "CROPPED HOODIE",   desc: "Relaxed. Elevated.",   realImg: "/images/products/cropsweatshirt/cropsweatshirt-02-yacht-front.jpg", link: "/shop/product/cropped-hoodie" },
    { name: "ESSENTIAL TEE",    desc: "Daily standard.",      realImg: "/images/products/tee/tee-02-scooter.jpg",                    link: "/shop/tees" },
    { name: "MINIMAL CAP",      desc: "Clean. Intentional.",  realImg: "/images/products/cap/cap-03-pair.jpg",                       link: "/shop/caps" },
  ];
  const [hovered, setHovered] = useState(null);
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;
  return (
    <section style={{ background: tweaks.bgColor, padding: mob ? "64px 24px" : "100px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: mob ? 40 : 64 }}>
          <h2 style={{ fontFamily: `'${tweaks.headingFont}', serif`, fontSize: mob ? "clamp(28px, 8vw, 40px)" : "clamp(36px, 4vw, 56px)", fontWeight: 600, color: "#1a1714", marginBottom: 12 }}>
            {tweaks.productSection}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", color: "#8a7d72", textTransform: "uppercase" }}>GEAR FOR YOUR STANDARD.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(4, 1fr)", gap: mob ? 40 : 32 }}>
          {products.map(({ name, desc, imgPlaceholder, realImg, link }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden", marginBottom: 20 }}>
                {realImg
                  ? <img src={realImg} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                  : <ImgPlaceholder label={imgPlaceholder} w={400} h={500} dark/>
                }
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: "#1a1714", marginBottom: 4, textTransform: "uppercase" }}>{name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: "#8a7d72", marginBottom: 16 }}>{desc}</p>
              <Link to={link} style={{ textDecoration: "none" }}>
                <button
                  style={{ background: hovered === i ? "#2e2a26" : "#1a1714", color: "#f5f0eb", border: "none", padding: "14px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", cursor: "pointer", transition: "background 0.2s", width: "100%", minHeight: 48 }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                >SHOP</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Community ──────────────────────────────────────────────────────────────
const HomeCommunity = ({ tweaks }) => {
  const [hoverBtn, setHoverBtn] = useState(false);
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: "#ede8e2", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.4fr" }}>
      <div style={{ padding: mob ? "56px 24px" : "80px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2 style={{ fontFamily: `'${tweaks.headingFont}', serif`, fontSize: mob ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 3.5vw, 52px)", fontWeight: 600, lineHeight: 1.05, color: "#1a1714", marginBottom: 24, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
          THIS IS BIGGER<br/>THAN PRODUCT.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.9, color: "#4a4440", marginBottom: 32, maxWidth: 340 }}>
          Modern Søber is a shift.<br/>People choosing clarity, discipline,<br/>and control — together.<br/>We don't do this alone.
        </p>
        <a
          href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer"
          style={{ background: hoverBtn ? "#2e2a26" : "#1a1714", color: "#f5f0eb", border: "none", padding: "16px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, maxWidth: mob ? "100%" : 260, marginBottom: 12, minHeight: 48, textDecoration: 'none' }}
          onMouseEnter={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)}
        ><IconFacebook/> JOIN THE COMMUNITY</a>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 300, lineHeight: 2, color: "#8a7d72" }}>
          Private Facebook group. Real people. Real stories. No judgment.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "16fr 25fr", gap: 6 }}>
        <img
          src="/images/community/cafe-couple.jpg"
          alt="A couple at a cafe — man in Modern Søber 'CLEAR > NUMB' black bomber jacket seated with back to camera, woman across from him resting her chin on her hand"
          style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
        <img
          src="/images/community/gym-pair.jpg"
          alt="A man and woman walking out of a gym smiling, both wearing Modern Søber apparel — black sleeveless hoodie and a sage cropped sweatshirt"
          style={{ width: "100%", aspectRatio: "5/4", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>
    </section>
  );
};

// ── Final CTA ──────────────────────────────────────────────────────────────
const FinalCTA = ({ tweaks }) => {
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [h3, setH3] = useState(false);
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: tweaks.bgColor, padding: mob ? "72px 24px" : "120px 80px", textAlign: "center" }}>
      <h2 style={{ fontFamily: `'${tweaks.headingFont}', serif`, fontSize: mob ? "clamp(28px, 8vw, 44px)" : "clamp(36px, 4.5vw, 64px)", fontWeight: 600, lineHeight: 1.1, color: "#1a1714", marginBottom: mob ? 40 : 56, letterSpacing: "-0.01em" }}>
        Clarity is available.<br/>Most people just don't choose it.
      </h2>
      <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: 12, justifyContent: "center", alignItems: mob ? "stretch" : "center" }}>
        <Link to="/shop" style={{ textDecoration: 'none', display: mob ? 'block' : 'inline-block' }}>
          <button style={{ background: h1 ? "#2e2a26" : "#1a1714", color: "#f5f0eb", border: "none", padding: "18px 48px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", minHeight: 48, width: mob ? '100%' : 'auto' }} onMouseEnter={() => setH1(true)} onMouseLeave={() => setH1(false)}>SHOP NOW</button>
        </Link>
        <Link to="/pre-order" style={{ textDecoration: 'none', display: mob ? 'block' : 'inline-block' }}>
          <button style={{ background: h2 ? "rgba(26,23,20,0.05)" : "transparent", color: "#1a1714", border: "1.5px solid #1a1714", padding: "17px 40px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", minHeight: 48, width: mob ? '100%' : 'auto' }} onMouseEnter={() => setH2(true)} onMouseLeave={() => setH2(false)}>PRE-ORDER BOOK</button>
        </Link>
        <a
          href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer"
          style={{ background: h3 ? "rgba(26,23,20,0.05)" : "transparent", color: "#1a1714", border: "1.5px solid #1a1714", padding: "17px 40px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 48, textDecoration: 'none' }}
          onMouseEnter={() => setH3(true)} onMouseLeave={() => setH3(false)}
        ><IconFacebook/> JOIN THE MOVEMENT</a>
      </div>
    </section>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const w   = useWindowWidth();
  const mob = w < 768;

  return (
    <div style={{ background: tweaks.bgColor, minHeight: "100vh" }}>
      <Navbar bgColor={tweaks.bgColor}/>
      {/* Flex column allows CSS order reordering on mobile */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ order: 1 }}><Hero tweaks={tweaks}/></div>
        <div style={{ order: mob ? 2 : 2 }}><ValueProps tweaks={tweaks}/></div>
        <div style={{ order: mob ? 4 : 5 }}><Story tweaks={tweaks}/></div>
        <div style={{ order: mob ? 3 : 4 }}><Products tweaks={tweaks}/></div>
        <div style={{ order: mob ? 5 : 3 }}><HomeCommunity tweaks={tweaks}/></div>
        <div style={{ order: mob ? 6 : 6 }}><FinalCTA tweaks={tweaks}/></div>
      </div>
      <Footer/>

      <TweaksPanel>
        <TweakSection label="Brand">
          <TweakColor label="Background" value={tweaks.bgColor} onChange={v => setTweak("bgColor", v)}/>
          <TweakColor label="Accent / Buttons" value={tweaks.accentColor} onChange={v => setTweak("accentColor", v)}/>
          <TweakSelect label="Heading Font" value={tweaks.headingFont}
            options={["Cormorant Garamond","Playfair Display","EB Garamond","Libre Baskerville"]}
            onChange={v => setTweak("headingFont", v)}/>
        </TweakSection>
        <TweakSection label="Hero Copy">
          <TweakText label="Headline" value={tweaks.heroHeadline} onChange={v => setTweak("heroHeadline", v)}/>
          <TweakText label="Subtext" value={tweaks.heroSub} onChange={v => setTweak("heroSub", v)}/>
          <TweakText label="Primary CTA" value={tweaks.ctaPrimary} onChange={v => setTweak("ctaPrimary", v)}/>
          <TweakText label="Secondary CTA" value={tweaks.ctaSecondary} onChange={v => setTweak("ctaSecondary", v)}/>
        </TweakSection>
        <TweakSection label="Sections">
          <TweakToggle label="Show Social Proof" value={tweaks.showSocialProof} onChange={v => setTweak("showSocialProof", v)}/>
          <TweakText label="Product Headline" value={tweaks.productSection} onChange={v => setTweak("productSection", v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}
