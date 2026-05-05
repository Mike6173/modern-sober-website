import { useState, useEffect, useRef } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqenbapn';

const BUNDLES = [
  {
    id: 'book-only',
    label: 'Book Only',
    note: null,
    // TODO: replace with /images/book/cover-thumb.jpg once asset is added
    img: null,
  },
  {
    id: 'book-hoodie-unisex',
    label: 'Book + Unisex Hoodie',
    note: 'Save 20%',
    img: '/images/products/hoodie/hoodie-01-spec.jpg',
  },
  {
    id: 'book-hoodie-cropped',
    label: "Book + Women's Cropped Hoodie",
    note: 'Save 20%',
    img: '/images/products/cropsweatshirt/cropsweatshirt-01-spec.jpg',
  },
];

const EMPTY = { email: '', phone: '', bundle: 'book-only', honeypot: '' };

export default function PreOrderModal({ isOpen, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const firstInputRef = useRef(null);
  const w = useWindowWidth();
  const mob = w < 768;

  // Esc to close + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    // Focus first input on open
    const t = setTimeout(() => firstInputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return; // honeypot triggered
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: form.email,
          phone: form.phone || '(not provided)',
          bundle: form.bundle,
          _subject: 'New Pre-Order Lead — Nothing Was Broken',
          _source: 'modern-sober-pre-order',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Unable to submit. Please check your connection and try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'transparent',
    border: '1px solid rgba(26,23,20,0.2)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: 300,
    color: '#1a1714',
    outline: 'none',
    transition: 'border-color 0.2s',
    borderRadius: 0,
    appearance: 'none',
  };

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.16em',
    color: '#8a7d72',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8,
  };

  return (
    /* Overlay */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pre-order Nothing Was Broken"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,23,20,0.6)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: mob ? '16px' : '32px',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      {/* Modal panel */}
      <div style={{
        background: '#f5f0eb',
        width: '100%',
        maxWidth: 560,
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: mob ? '32px 24px' : '48px 48px',
        position: 'relative',
      }}>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: '#8a7d72',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 44,
            minWidth: 44,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {status === 'success' ? (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1a1714', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f0eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#1a1714', marginBottom: 16, lineHeight: 1.2 }}>
              Reserved.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#4a4440', lineHeight: 1.8, marginBottom: 32 }}>
              Thanks. We'll email you when it ships.
            </p>
            <button
              onClick={onClose}
              style={{ background: '#1a1714', color: '#f5f0eb', border: 'none', padding: '14px 40px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate>
            {/* Eyebrow */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.28em', color: '#8a7d72', textTransform: 'uppercase', marginBottom: 8 }}>
                NOTHING WAS BROKEN
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: '#1a1714', lineHeight: 1.2, marginBottom: 8 }}>
                Reserve Your Copy
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#6a6058', lineHeight: 1.7 }}>
                Be the first to know when it drops.
              </p>
            </div>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              aria-hidden="true"
              value={form.honeypot}
              onChange={set('honeypot')}
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
            />

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="po-email" style={labelStyle}>Email *</label>
              <input
                ref={firstInputRef}
                id="po-email"
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#1a1714')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(26,23,20,0.2)')}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 28 }}>
              <label htmlFor="po-phone" style={labelStyle}>Phone <span style={{ fontWeight: 300, letterSpacing: '0.04em', textTransform: 'none' }}>(optional)</span></label>
              <input
                id="po-phone"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+1 (555) 000-0000"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#1a1714')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(26,23,20,0.2)')}
              />
            </div>

            {/* Bundle selection */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Select Your Bundle</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BUNDLES.map(({ id, label, note, img }) => {
                  const selected = form.bundle === id;
                  return (
                    <label
                      key={id}
                      htmlFor={`bundle-${id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '14px 16px',
                        border: selected ? '1.5px solid #1a1714' : '1px solid rgba(26,23,20,0.15)',
                        background: selected ? 'rgba(26,23,20,0.04)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s, background 0.15s',
                      }}
                    >
                      <input
                        type="radio"
                        id={`bundle-${id}`}
                        name="bundle"
                        value={id}
                        checked={selected}
                        onChange={set('bundle')}
                        style={{ accentColor: '#1a1714', width: 16, height: 16, flexShrink: 0 }}
                      />
                      {img ? (
                        <img
                          src={img}
                          alt={label}
                          style={{ width: 44, height: 52, objectFit: 'cover', flexShrink: 0, background: '#ede8e2' }}
                          loading="lazy"
                        />
                      ) : (
                        /* TODO: replace with /images/book/cover-thumb.jpg */
                        <div style={{ width: 44, height: 52, background: '#1e1b18', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '7px', fontWeight: 500, letterSpacing: '0.1em', color: '#b5a99a', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.4 }}>NWB</span>
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#1a1714', letterSpacing: '0.06em', marginBottom: note ? 2 : 0 }}>
                          {label}
                        </p>
                        {note && (
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: '#c8b89a', letterSpacing: '0.04em' }}>
                            {note}
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <p role="alert" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#c0392b', marginBottom: 16, lineHeight: 1.5 }}>
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading' ? '#2e2a26' : '#1a1714',
                color: '#f5f0eb',
                border: 'none',
                padding: '18px 32px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                width: '100%',
                minHeight: 52,
              }}
            >
              {status === 'loading' ? 'RESERVING...' : 'RESERVE MY COPY'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
