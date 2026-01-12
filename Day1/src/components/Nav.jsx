import { Link } from "react-router-dom";

// prefetch functions (same import paths as lazy routes)
const prefetchUsers = () => import("../pages/Users.jsx");
const prefetchSettings = () => import("../pages/Settings.jsx");

export default function Nav() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link to="/">Home</Link>

      <Link to="/users" onMouseEnter={prefetchUsers} onFocus={prefetchUsers}>
        Users
      </Link>

      <Link
        to="/settings"
        onMouseEnter={prefetchSettings}
        onFocus={prefetchSettings}
      >
        Settings
      </Link>
    </nav>
  );
}
