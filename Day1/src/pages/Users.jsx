import React, { Suspense, useState } from "react";

const BigTable = React.lazy(() => import("../components/BigTable.jsx"));

export default function Users() {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Users</h2>

      <button
        className="mt-4 px-3 py-2 rounded border"
        onClick={() => setShowTable(true)}
      >
        Load Big Table
      </button>

      {showTable && (
        <div className="mt-4">
          <Suspense fallback={<div>Loading table…</div>}>
            <BigTable />
          </Suspense>
        </div>
      )}
    </div>
  );
}
