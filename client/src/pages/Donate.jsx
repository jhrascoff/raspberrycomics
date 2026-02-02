import { useState } from 'react';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function Donate() {
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const donationAmount = useCustom ? Number(custom) || 0 : amount;

  function handleSubmit(e) {
    e.preventDefault();
    if (donationAmount <= 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="page donate-page">
        <div className="donate-success">
          <div className="donate-success-icon">🍇</div>
          <h2>Thank You!</h2>
          <p className="donate-success-amount">${donationAmount.toFixed(2)}</p>
          <p className="donate-success-msg">
            {name ? `${name}, your` : 'Your'} generous donation helps us support independent comic creators and bring amazing stories to readers everywhere.
          </p>
          {message && <blockquote className="donate-quote">"{message}"</blockquote>}
          <button className="btn btn-primary" onClick={() => { setSubmitted(false); setName(''); setMessage(''); }}>Donate Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page donate-page">
      <div className="donate-hero">
        <h1>Support Raspberry Comics</h1>
        <p>Your donation helps us fund independent creators, keep comics affordable, and grow our community.</p>
      </div>

      <div className="donate-layout">
        <div className="donate-card">
          <h3>Make a Donation</h3>

          <div className="donate-amounts">
            {PRESET_AMOUNTS.map(a => (
              <button
                key={a}
                className={`donate-amount-btn ${!useCustom && amount === a ? 'active' : ''}`}
                onClick={() => { setAmount(a); setUseCustom(false); }}
              >
                ${a}
              </button>
            ))}
            <button
              className={`donate-amount-btn ${useCustom ? 'active' : ''}`}
              onClick={() => setUseCustom(true)}
            >
              Custom
            </button>
          </div>

          {useCustom && (
            <div className="donate-custom">
              <span className="donate-currency">$</span>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter amount"
                value={custom}
                onChange={e => setCustom(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="donate-form">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <textarea
              placeholder="Leave a message (optional)"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={donationAmount <= 0}
            >
              Donate ${donationAmount > 0 ? donationAmount.toFixed(2) : '0.00'}
            </button>
            <p className="donate-note">This is a demo. No real payment is processed.</p>
          </form>
        </div>

        <div className="donate-info">
          <div className="donate-info-card">
            <h4>Where Your Money Goes</h4>
            <div className="donate-breakdown">
              <div className="donate-bar-item">
                <div className="donate-bar-label"><span>Creator Grants</span><span>50%</span></div>
                <div className="donate-bar"><div className="donate-bar-fill" style={{ width: '50%', background: 'var(--primary)' }} /></div>
              </div>
              <div className="donate-bar-item">
                <div className="donate-bar-label"><span>Community Events</span><span>25%</span></div>
                <div className="donate-bar"><div className="donate-bar-fill" style={{ width: '25%', background: 'var(--jam)' }} /></div>
              </div>
              <div className="donate-bar-item">
                <div className="donate-bar-label"><span>Free Comics Program</span><span>15%</span></div>
                <div className="donate-bar"><div className="donate-bar-fill" style={{ width: '15%', background: 'var(--royal)' }} /></div>
              </div>
              <div className="donate-bar-item">
                <div className="donate-bar-label"><span>Operations</span><span>10%</span></div>
                <div className="donate-bar"><div className="donate-bar-fill" style={{ width: '10%', background: 'var(--berry)' }} /></div>
              </div>
            </div>
          </div>

          <div className="donate-info-card">
            <h4>Donor Perks</h4>
            <ul className="donate-perks">
              <li><strong>$5+</strong> — Name on our supporters wall</li>
              <li><strong>$25+</strong> — Exclusive digital wallpaper</li>
              <li><strong>$50+</strong> — Early access to new releases</li>
              <li><strong>$100+</strong> — Limited edition digital comic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
