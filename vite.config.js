import { useState } from 'react';
import AuthCard from '../components/AuthCard.jsx';

export default function AuthPage() {
  const [mode, setMode] = useState('Login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-700 px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-[3rem] bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/10 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6 text-white">
            <p className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-indigo-100">Launch your career journey</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Secure your future with AI-guided career planning.</h1>
            <p className="max-w-xl text-sm leading-7 text-slate-200">Login or signup to save personalized recommendations, unlock learning roadmaps, and track your skill growth easily.</p>
          </div>
          <AuthCard mode={mode} onModeChange={() => setMode(mode === 'Login' ? 'Signup' : 'Login')} />
        </div>
      </div>
    </div>
  );
}
