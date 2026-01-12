import React, { Suspense, useState } from "react";
import Spinner from "../components/Spinner.jsx";

// Lazy-load the heavy table component (code split)
const InfiniteUsersTable = React.lazy(() =>
  import("../components/InfiniteUsersTable.jsx")
);

export default function InfiniteTablePage() {
  const [show, setShow] = useState(true);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold">Infinite Scroll Table</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        This page demonstrates <b>API pagination</b> + <b>infinite scroll</b>. The table component is also
        <b> lazy-loaded</b>.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShow((v) => !v)}
          className="px-4 py-2 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900"
        >
          {show ? "Hide" : "Show"} Table
        </button>
      </div>

      {show && (
        <Suspense fallback={<Spinner label="Loading table chunk..." />}>
          <InfiniteUsersTable />
        </Suspense>
      )}
    </main>
  );
}
