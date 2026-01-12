import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 20;

async function fetchUsersPage({ skip, limit, signal }) {
  const url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`API failed: ${res.status}`);
  return res.json(); // { users: [], total, skip, limit }
}

export default function InfiniteUsersTable() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(null);
  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canLoadMore = useMemo(() => {
    if (total == null) return true; // unknown at first
    return rows.length < total;
  }, [rows.length, total]);

  const sentinelRef = useRef(null);

  // Load next page
  useEffect(() => {
    const ctrl = new AbortController();

    async function run() {
      try {
        setError("");
        setLoading(true);

        const data = await fetchUsersPage({
          skip,
          limit: PAGE_SIZE,
          signal: ctrl.signal,
        });

        setTotal(data.total);

        // append, but guard against duplicates
        setRows((prev) => {
          const seen = new Set(prev.map((u) => u.id));
          const merged = [...prev];
          for (const u of data.users) {
            if (!seen.has(u.id)) merged.push(u);
          }
          return merged;
        });
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => ctrl.abort();
  }, [skip]);

  // IntersectionObserver: when sentinel visible, load more
  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;
        if (loading) return;
        if (!canLoadMore) return;

        // next page
        setSkip((prev) => prev + PAGE_SIZE);
      },
      {
        root: null,
        rootMargin: "300px", // start loading a bit before reaching end
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loading, canLoadMore]);

  const refresh = () => {
    setRows([]);
    setTotal(null);
    setSkip(0);
    setError("");
  };

  return (
    <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-semibold">Users (Infinite Scroll + Pagination)</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Loaded <b>{rows.length}</b>
            {total != null ? (
              <>
                {" "}
                of <b>{total}</b>
              </>
            ) : null}
          </p>
        </div>

        <button
          onClick={refresh}
          className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <div className="mt-3 overflow-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800">
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Company</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((u) => (
              <tr
                key={u.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="p-2">{u.id}</td>
                <td className="p-2">
                  {u.firstName} {u.lastName}
                </td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.company?.name || "-"}</td>
              </tr>
            ))}

            {/* Sentinel row */}
            <tr>
              <td colSpan={4} className="p-0">
                <div ref={sentinelRef} className="h-1" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-slate-600 dark:text-slate-300">
          Page size: {PAGE_SIZE}
        </div>

        <div className="text-slate-600 dark:text-slate-300">
          {loading ? "Loading more..." : canLoadMore ? "Scroll to load more" : "All loaded ✅"}
        </div>
      </div>
    </div>
  );
}
