import { createContext, useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../lib/api.js';

export const AuthContext = createContext({
  user: null,
  token: null,
  authenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('careerai_token')); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetchJson('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.user);
      } catch (error) {
        console.error('Profile load failed:', error);
        setToken(null);
        localStorage.removeItem('careerai_token');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  const login = async ({ email, password }) => {
    const response = await fetchJson('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('careerai_token', response.token);
    return response;
  };

  const register = async ({ name, email, password }) => {
    const response = await fetchJson('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('careerai_token', response.token);
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('careerai_token');
  };

  const value = useMemo(
    () => ({ user, token, authenticated: !!user, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
