import { Link, NavLink } from "react-router-dom";
import useTheme from "../context/useTheme.js";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md ${
      isActive
        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
        : "hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
      <Link to="/" className="text-lg font-semibold">
        LazySplit
      </Link>

      <nav className="flex items-center gap-2">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/users" className={navClass}>
          Users
        </NavLink>
        <NavLink to="/settings" className={navClass}>
          Settings
        </NavLink>
        <NavLink to="/infinite-table" className={navClass}>
          Infinite Table
        </NavLink>
      </nav>

      <button
        onClick={toggleTheme}
        className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </header>
  );
}
