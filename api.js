export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-slate-600 leading-7">{description}</p>
    </div>
  );
}
