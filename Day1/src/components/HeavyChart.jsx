// Pretend this is a heavy chart library / large component
export default function HeavyChart() {
  // A tiny delay simulation is not needed; the chunk download itself is the real delay.
  return (
    <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 className="font-semibold">HeavyChart (lazy chunk)</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        This component was loaded only when you clicked “Load Chart”.
      </p>
    </div>
  );
}
