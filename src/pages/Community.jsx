import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { MessageCircle, Calendar, BookOpen, Shield, Facebook } from 'lucide-react';

const FEATURES = [
  { Icon: MessageCircle, title: 'Real conversations',    sub: 'No performance. No pretending.' },
  { Icon: Calendar,       title: 'Member meetups',        sub: 'In-person and virtual.' },
  { Icon: BookOpen,       title: 'Weekly field notes',    sub: 'From the founder and members.' },
  { Icon: Shield,         title: 'Private and protected', sub: 'Closed group. Vetted members.' },
];

function FeaturesSection() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#f5f0eb', padding: mob ? '48px 24px 56px' : '80px 80px 100px', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: mob ? 32 : 48 }}>
        {FEATURES.map(({ Icon, title, sub }) => (
          <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,23,20,0.05)', flexShrink: 0 }}>
              <Icon size={22} strokeWidth={1.4} color="#1a1714"/>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? '16px' : '18px', fontWeight: 600, color: '#1a1714', lineHeight: 1.2 }}>
              {title}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#6a6058' }}>
              {sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const MEMBERS = [
  {
    name: 'Marcus T.',
    location: 'Brooklyn, NY',
    quote: "I stopped talking about wanting to change and started doing it. This community is the first place where that didn't feel weird or dramatic. It's just people who get it.",
    avatar: 'https://images.unsplash.com/photo-1529977421774-808dda19c3f9?auto=format&fit=crop&w=80&h=80&q=80',
    avatarAlt: 'Marcus T. — member avatar',
  },
  {
    name: 'Elena R.',
    location: 'Austin, TX',
    quote: "I never thought I needed a community for something like this. But the consistency I've built over the last four months came from checking in here every morning. It's grounding.",
    avatar: 'https://images.unsplash.com/photo-1590649681928-4b179f773bd5?auto=format&fit=crop&w=80&h=80&q=80',
    avatarAlt: 'Elena R. — member avatar',
  },
  {
    name: 'David K.',
    location: 'Chicago, IL',
    quote: "What I appreciate is how normal everyone is. No one is performing sobriety or competing over who has the most discipline. It's real people figuring it out together.",
    avatar: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?auto=format&fit=crop&w=80&h=80&q=80',
    avatarAlt: 'David K. — member avatar',
  },
];

function MemberVoices() {
  const w   = useWindowWidth();
  const mob = w < 768;
  const tab = w < 1024;
  return (
    <section style={{ background: '#ede8e2', padding: mob ? '56px 24px' : '100px 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: mob ? 36 : 64 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.24em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 16 }}>
            MEMBER VOICES
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 600, color: '#1a1714', lineHeight: 1.1 }}>
            Real people. Real shift.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? '1fr 1fr' : 'repeat(3, 1fr)', gap: mob ? 24 : 32 }}>
          {MEMBERS.map(({ name, location, quote, avatar, avatarAlt }) => (
            <div key={name} style={{ background: '#f5f0eb', padding: mob ? '28px 16px' : '40px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#4a4440', flexGrow: 1 }}>
                "{quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(26,23,20,0.08)', paddingTop: 24 }}>
                <img src={avatar} alt={avatarAlt} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#1a1714', letterSpacing: '0.04em' }}>{name}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#8a7d72', marginTop: 2 }}>{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const w   = useWindowWidth();
  const mob = w < 768;
  return (
    <section style={{ background: '#1e1b18', padding: mob ? '72px 24px' : '120px 80px', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: mob ? 'clamp(24px, 7vw, 40px)' : 'clamp(28px, 3.5vw, 52px)', fontWeight: 600, lineHeight: 1.1, color: '#f0ebe4', marginBottom: 24 }}>
          Membership is free.<br/>The standard is not.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#b5a99a', marginBottom: 40 }}>
          Private Facebook group. Vetted members. No noise.
        </p>
        <a
          href="https://www.facebook.com/Modernsober/" target="_blank" rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '18px 48px', background: '#f5f0eb', color: '#1a1714', width: mob ? '100%' : 'auto', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e8e3dd'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f5f0eb'}
        >
          <Facebook size={18}/> JOIN THE COMMUNITY
        </a>
      </div>
    </section>
  );
}

export default function Community() {
  return (
    <div style={{ background: '#f5f0eb', minHeight: '100vh' }}>
      <Navbar />
      <PageHero
        eyebrow="THE INNER CIRCLE"
        headline="We move forward together."
        subtitle="A private space for people choosing clarity, discipline, and control."
      />
      <FeaturesSection />
      <MemberVoices />
      <JoinCTA />
      <Footer />
    </div>
  );
}
