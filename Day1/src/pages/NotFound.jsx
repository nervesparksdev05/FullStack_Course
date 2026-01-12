import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold">404</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Page not found.
      </p>
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600"
      >
        Go Home
      </Link>
    </main>
  );
}
