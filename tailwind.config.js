import { Database, TrendingUp, Settings2 } from 'lucide-react';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600">Admin panel</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900">Manage career data and update trends quickly.</h1>
            </div>
            <Database className="h-12 w-12 text-indigo-600" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Career library', description: 'Add or edit career profiles with ease.', icon: Settings2 },
              { title: 'Job trends', description: 'Update demand levels and salary ranges.', icon: TrendingUp },
              { title: 'Insights', description: 'Track platform engagement and AI performance.', icon: Database }
            ].map((card) => (
              <div key={card.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <card.icon className="h-6 w-6 text-indigo-600" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h2>
                <p className="mt-3 text-slate-600">{card.description}</p>
                <button className="mt-5 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">Manage</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
