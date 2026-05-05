import { useState, useContext } from 'react';
import { ArrowRight, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function AuthCard({ mode = 'Login', onModeChange }) {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'Login') {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/40 bg-white/95 p-10 shadow-soft backdrop-blur-xl sm:p-12">
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">CareerAI</p>
        <h1 className="text-3xl font-semibold text-slate-900">{mode === 'Login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="text-slate-600">Sign in to explore career matches with AI-powered insights.</p>
      </div>

      <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
        <LogIn className="h-4 w-4" /> Continue with Google
      </button>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'Signup' && (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rohith" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="hello@careerai.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        </label>

        {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

        <button disabled={loading} className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:opacity-60">
          {mode === 'Login' ? 'Login to Dashboard' : 'Signup now'} <ArrowRight className="inline-block h-4 w-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {mode === 'Login' ? 'Need an account?' : 'Already have an account?'}{' '}
        <button type="button" onClick={onModeChange} className="font-semibold text-indigo-600 hover:text-indigo-700">
          {mode === 'Login' ? 'Create Account' : 'Login instead'}
        </button>
      </p>
    </div>
  );
}
