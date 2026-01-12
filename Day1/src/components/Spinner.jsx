export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="p-6 flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-slate-600 dark:border-t-white" />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </div>
  );
}
