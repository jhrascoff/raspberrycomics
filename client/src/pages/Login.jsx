import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function Login() {
  const { user, login, register, googleLogin } = useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleGoogleResponse = useCallback(async (response) => {
    try {
      await googleLogin(response.credential);
    } catch (e) {
      setError(e.message);
    }
  }, [googleLogin]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !window.google?.accounts) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    if (googleBtnRef.current) {
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: 320,
        text: 'continue_with',
      });
    }
  }, [handleGoogleResponse]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  if (user) return null;

  return (
    <div className="page login-page">
      <div className="auth-card">
        <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {mode === 'login' ? 'Welcome back to Raspberry Comics' : 'Join Raspberry Comics and start earning rewards'}
        </p>

        {GOOGLE_CLIENT_ID && (
          <>
            <div ref={googleBtnRef} className="google-btn-wrapper" />
            <div className="auth-divider"><span>or</span></div>
          </>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={4} />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className="auth-toggle-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
