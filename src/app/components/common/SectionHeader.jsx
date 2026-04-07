export function SectionHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p> : null}
      </div>
      {actions ? <div className="w-full md:w-auto">{actions}</div> : null}
    </div>
  );
}
