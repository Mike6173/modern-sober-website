import { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjglkerp';

const SUBJECTS = [
  'General Inquiry',
  'Press',
  'Partnership',
  'Order Support',
  'Community',
];

const EMPTY_FORM = { name: '', email: '', subject: SUBJECTS[0], message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
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
      setErrorMsg('Unable to send. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '64px 48px',
        background: '#f0ebe4',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        minHeight: 420,
        justifyContent: 'center',
      }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1a1714', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f0eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#1a1714', lineHeight: 1.2 }}>
          Message received.
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#4a4440', lineHeight: 1.75 }}>
          We'll be in touch within 48 hours.
        </p>
      </div>
    );
  }

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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Name */}
      <div>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={set('name')}
          placeholder="Your name"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = '#1a1714'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(26,23,20,0.2)'}
        />
      </div>

      {/* Email */}
      <div>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Email *
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={set('email')}
          placeholder="your@email.com"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = '#1a1714'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(26,23,20,0.2)'}
        />
      </div>

      {/* Subject */}
      <div>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Subject
        </label>
        <select
          value={form.subject}
          onChange={set('subject')}
          style={{
            ...inputStyle,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%231a1714' opacity='.5' d='M0 0h10L5 6z'/></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: 40,
            cursor: 'pointer',
          }}
          onFocus={(e) => e.target.style.borderColor = '#1a1714'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(26,23,20,0.2)'}
        >
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', color: '#8a7d72', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
          Message *
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={set('message')}
          placeholder="Your message…"
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          onFocus={(e) => e.target.style.borderColor = '#1a1714'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(26,23,20,0.2)'}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 400, color: '#c0392b', lineHeight: 1.5 }}>
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
          marginTop: 8,
        }}
      >
        {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
}
