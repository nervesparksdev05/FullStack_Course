import React, { Suspense, useState } from "react";
import Spinner from "../components/Spinner.jsx";

// ✅ Component-level code splitting (only loads when user asks)
const HeavyChart = React.lazy(() => import("../components/HeavyChart.jsx"));

export default function Users() {
  const [showChart, setShowChart] = useState(false);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold">Users</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        This page is a lazy-loaded route. The chart below is another lazy chunk.
      </p>

      <button
        onClick={() => setShowChart(true)}
        className="mt-4 px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900"
      >
        Load Chart (lazy)
      </button>

      {showChart && (
        <Suspense fallback={<Spinner label="Loading chart chunk..." />}>
          <HeavyChart />
        </Suspense>
      )}
    </main>
  );
}
