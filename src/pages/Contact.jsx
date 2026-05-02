import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

// ── Contact info block ─────────────────────────────────────────────────────
const INFO_ITEMS = [
  { Icon: Mail,    label: 'Email',   value: 'hello@modernsober.com' },
  { Icon: Phone,   label: 'Phone',   value: '(555) 123-4567' },
  { Icon: MapPin,  label: 'Address', value: '123 Hudson Street, Suite 4B\nNew York, NY 10013' },
  { Icon: Clock,   label: 'Hours',   value: 'Monday – Friday\n9am – 6pm ET' },
];

const SOCIAL_LINKS = [
  { Icon: Facebook,  label: 'Facebook',  href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Twitter,   label: 'X (Twitter)', href: '#' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
];

function ContactInfo() {
  return (
    <div style={{ padding: '80px 80px 80px 0' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 48 }}>
        REACH US
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {INFO_ITEMS.map(({ Icon, label, value }) => (
          <div key={label} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,23,20,0.05)', flexShrink: 0, marginTop: 2 }}>
              <Icon size={18} strokeWidth={1.4} color="#1a1714"/>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 6 }}>
                {label}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: '#1a1714', whiteSpace: 'pre-line' }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: 16, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(26,23,20,0.1)' }}>
        {SOCIAL_LINKS.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(26,23,20,0.15)', color: '#1a1714', transition: 'border-color 0.2s, background 0.2s', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26,23,20,0.05)'; e.currentTarget.style.borderColor = '#1a1714'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(26,23,20,0.15)'; }}
          >
            <Icon size={16} strokeWidth={1.5}/>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Closing CTA ────────────────────────────────────────────────────────────
function ClosingBand() {
  return (
    <section style={{ background: '#ede8e2', padding: '100px 80px', textAlign: 'center', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 600, color: '#1a1714', marginBottom: 40, lineHeight: 1.15 }}>
          Or just join us.
        </p>
        <button
          className="btn-outline"
          style={{ padding: '17px 48px' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(26,23,20,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <Facebook size={18}/> JOIN THE COMMUNITY
        </button>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />

      <PageHero
        eyebrow="GET IN TOUCH"
        headline="We read every message."
        subtitle="For press, partnerships, support, or just to say hello."
      />

      {/* Main split section */}
      <section style={{ background: '#f5f0eb', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <ContactInfo />
          <div style={{ padding: '80px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 48 }}>
              SEND A MESSAGE
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <ClosingBand />
      <Footer />
    </div>
  );
}
