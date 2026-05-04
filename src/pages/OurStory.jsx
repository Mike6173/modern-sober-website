import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Facebook } from 'lucide-react';
import { useWindowWidth } from '../hooks/useWindowWidth';

// ── Hero (split 50/50) ─────────────────────────────────────────────────────
function StoryHero() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', minHeight: mob ? 'auto' : '72vh', background: '#f5f0eb' }}>
      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: mob ? '96px 24px 48px' : '140px 80px 80px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.24em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 20 }}>
          OUR STORY
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(32px, 9vw, 52px)' : 'clamp(38px, 4.5vw, 64px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.01em', color: '#1a1714', maxWidth: 480 }}>
          We started where excess ended.
        </h1>
      </div>
      {/* Right — image */}
      <div style={{ overflow: 'hidden', position: 'relative', minHeight: mob ? 320 : 480 }}>
        <img
          src="https://images.unsplash.com/photo-1529977421774-808dda19c3f9?auto=format&fit=crop&w=640&h=700&q=80"
          alt="Founder candid portrait — pensive, natural light"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </section>
  );
}

// ── Long-form ──────────────────────────────────────────────────────────────
function LongForm() {
  const w   = useWindowWidth();
  const mob = w < 768;
  const bodyStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: 1.9,
    color: '#4a4440',
    marginBottom: 24,
  };
  return (
    <section style={{ padding: mob ? '56px 24px' : '100px 80px', background: '#f5f0eb' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '58% 38%',
        gap: mob ? 48 : 64,
        alignItems: 'center',
      }}>
        {/* Text */}
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 40 }}>
            THE REASON
          </p>
          <p style={bodyStyle}>
            For years, I lived inside rooms where excess was the ambient noise. Finance. Hospitality. High-volume social environments. The kind of world where drinking wasn't a habit — it was the architecture of every evening, every deal, every relationship. I wasn't broken. I was running. I just didn't realize it until I stopped.
          </p>
          <p style={bodyStyle}>
            The year I got serious about clarity was the year I realized I had been performing my life more than living it. Sharpness was available to me at 6am. Presence was available. Focus was available. I'd just been choosing something else every night and wondering why mornings felt like starting from zero.
          </p>
          <p style={bodyStyle}>
            I didn't want a sobriety brand. I didn't identify with the language of recovery or restriction. What I wanted — what I built — was something for the people who are choosing better not because they hit bottom, but because they looked up and saw how much higher they could go.
          </p>
          <div style={{ width: 40, height: 1, background: 'rgba(26,23,20,0.2)', margin: '56px 0' }}/>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 40 }}>
            WHAT WE BELIEVE
          </p>
          <p style={bodyStyle}>
            Clarity is not a personality type. It's a practice. It's the daily decision to protect your energy, your attention, and your standards — before anyone else asks you to. Discipline isn't punishment. It's what you build when you respect your own time enough to refuse what dilutes it.
          </p>
          <p style={bodyStyle}>
            Modern Søber exists for the people who have already made the decision — or who are standing at the edge of it. The gear is a reminder. The community is proof. You are not unusual for wanting more from yourself. You are early.
          </p>
        </div>
        {/* Image */}
        <div style={{ width: '100%' }}>
          <img
            src="/images/founders/founders-rooftop.jpg"
            alt="Modern Søber founders on a rooftop overlooking the city"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 16,
              boxShadow: '0 8px 40px rgba(26,23,20,0.10)',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// ── Values band ────────────────────────────────────────────────────────────
const VALUES = [
  { title: 'QUIET CONFIDENCE',    body: "Earned through consistency, not performance. We don't announce our discipline — we live it." },
  { title: 'DISCIPLINE AS DESIGN', body: "Every decision we make — in product, in community, in the words we choose — is intentional. Nothing here is accidental." },
  { title: 'COMMUNITY OVER CROWD', body: "A smaller room with the right people moves faster than any crowd. We choose who we're in the room with." },
];

function ValuesBand() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#ede8e2', padding: mob ? '56px 24px' : '100px 80px', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? 40 : 64 }}>
        {VALUES.map(({ title, body }) => (
          <div key={title}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#1a1714', marginBottom: 20, lineHeight: 1.2 }}>
              {title}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#4a4440' }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Founder quote band ─────────────────────────────────────────────────────
function FounderQuote() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#1e1b18', padding: mob ? '72px 24px' : '100px 80px', textAlign: 'center' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <svg width="28" height="22" viewBox="0 0 28 22" fill="#c8b89a" opacity="0.7" style={{ marginBottom: 32 }}>
          <path d="M0 22V13.2C0 5.6 4.4 1.4 13.2 0l1.4 2.8C10 3.8 7.8 6 7.2 9.6H12V22H0zm16 0V13.2C16 5.6 20.4 1.4 29.2 0L30.6 2.8C26 3.8 23.8 6 23.2 9.6H28V22H16z"/>
        </svg>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 34px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, color: '#f0ebe4', marginBottom: 40 }}>
          "We are not a sobriety brand. We are a clarity brand. The two are not the same."
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: '#8a7d72', letterSpacing: '0.1em' }}>
          — Founder
        </p>
      </div>
    </section>
  );
}

// ── CTA band ───────────────────────────────────────────────────────────────
function StoryCTA() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#f5f0eb', padding: mob ? '72px 24px' : '100px 80px', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(24px, 7vw, 36px)' : 'clamp(28px, 3vw, 44px)', fontWeight: 600, color: '#1a1714', marginBottom: mob ? 36 : 48, lineHeight: 1.15 }}>
        Standards over shortcuts.
      </p>
      <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 12 : 16, justifyContent: 'center', alignItems: mob ? 'stretch' : 'center' }}>
        <Link to="/shop" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '18px 48px', width: mob ? '100%' : 'auto' }}>
            SHOP
          </button>
        </Link>
        <a
          href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer"
          className="btn-outline"
          style={{ padding: '17px 40px', width: mob ? '100%' : 'auto', justifyContent: 'center', textDecoration: 'none' }}
        >
          <Facebook size={18}/> JOIN THE COMMUNITY
        </a>
      </div>
    </section>
  );
}

export default function OurStory() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />
      <StoryHero />
      <LongForm />
      <ValuesBand />
      <FounderQuote />
      <StoryCTA />
      <Footer />
    </div>
  );
}
