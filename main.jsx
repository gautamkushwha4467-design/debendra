import { Briefcase, Compass, Grid, Settings2, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Dashboard', to: '/dashboard', icon: Grid },
  { label: 'My Careers', to: '/dashboard', icon: Briefcase },
  { label: 'Roadmap', to: '/roadmap', icon: Compass },
  { label: 'Skills', to: '/skill-gap', icon: Sparkles },
  { label: 'Settings', to: '/profile', icon: Settings2 }
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft xl:block">
      <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Workspace</div>
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
