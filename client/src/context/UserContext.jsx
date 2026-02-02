import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();

const DEFAULT_REWARDS = { points: 0, totalSpent: 0, history: [], tier: { name: 'Berry', multiplier: 1, freeShipping: false, next: 'Jam', nextAt: 500 } };

function authHeaders(token) {
  return token ? { 'Content-Type': 'application/json', 'x-user-id': token } : { 'Content-Type': 'application/json' };
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('rc_token') || null);
  const [rewards, setRewards] = useState(DEFAULT_REWARDS);

  function saveAuth(userData, tokenVal) {
    setUser(userData);
    setToken(tokenVal);
    localStorage.setItem('rc_user', JSON.stringify(userData));
    localStorage.setItem('rc_token', tokenVal);
  }

  function logout() {
    setUser(null);
    setToken(null);
    setRewards(DEFAULT_REWARDS);
    localStorage.removeItem('rc_user');
    localStorage.removeItem('rc_token');
  }

  async function login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    saveAuth(data.user, data.token);
  }

  async function register(name, email, password) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    saveAuth(data.user, data.token);
  }

  async function googleLogin(credential) {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    saveAuth(data.user, data.token);
  }

  const fetchRewards = useCallback(async () => {
    if (!token) return;
    const res = await fetch('/api/rewards', { headers: authHeaders(token) });
    if (res.ok) {
      const data = await res.json();
      setRewards(data);
    }
  }, [token]);

  useEffect(() => { fetchRewards(); }, [fetchRewards]);

  async function earnPoints(amount, orderId) {
    const res = await fetch('/api/rewards/earn', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ amount, orderId }),
    });
    const data = await res.json();
    await fetchRewards();
    return data;
  }

  async function redeemPoints(points) {
    const res = await fetch('/api/rewards/redeem', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ points }),
    });
    const data = await res.json();
    await fetchRewards();
    return data;
  }

  return (
    <UserContext.Provider value={{ user, token, rewards, login, register, googleLogin, logout, earnPoints, redeemPoints, fetchRewards }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
