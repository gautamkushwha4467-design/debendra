export default function TimelineItem({ title, description, completed }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-white bg-indigo-600 shadow" />
      <div className="border-l border-slate-200 pl-6">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
