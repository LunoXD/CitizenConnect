export function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}>
      <div className="animate-pulse space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-3.5 rounded bg-gray-200 ${index === 0 ? 'w-2/3' : index === lines - 1 ? 'w-1/2' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  );
}
