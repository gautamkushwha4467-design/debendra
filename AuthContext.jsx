import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { authenticated, logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const links = authenticated
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Profile', to: '/profile' },
        { label: 'Roadmap', to: '/roadmap' }
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Features', to: '/#features' }
      ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <Sparkles className="h-7 w-7 text-indigo-600" />
          <span className="text-xl">CareerAI</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`transition hover:text-indigo-600 ${location.pathname === link.to ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {authenticated ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user?.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100" to="/auth">
              Login / Signup
            </Link>
          )}
        </div>
        <button className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600 md:hidden">
          <Menu className="mr-2 h-4 w-4" /> Menu
        </button>
      </div>
    </header>
  );
}
