import { useMemo, useState } from "react";

export default function BigTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    return Array.from({ length: 3000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const pageSize = 30;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Keep page in a valid range (in case filtering reduces total pages)
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-semibold">BigTable (lazy chunk)</h3>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1); // ✅ reset page at the source of the change
          }}
          placeholder="Search name/email..."
          className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
        />
      </div>

      <div className="mt-3 overflow-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800">
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
        >
          Prev
        </button>

        <span className="text-slate-700 dark:text-slate-300">
          Page {safePage} / {totalPages}
        </span>

        <button
          className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
