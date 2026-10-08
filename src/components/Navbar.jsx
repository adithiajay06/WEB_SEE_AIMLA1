import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout, switchRole } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    close();
    navigate("/login");
  };

  // Links shown depend on role
  const links = [{ to: "/events", label: "Events" }];
  if (user) links.push({ to: "/dashboard", label: "Dashboard" });
  if (user?.role === "student") links.push({ to: "/my-registrations", label: "My Registrations" });
  if (user?.role === "organizer" || user?.role === "admin")
    links.push({ to: "/manage-events", label: "Manage Events" });

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={close}>
          <span className="navbar__logo">🎓</span> CampusConnect
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`navbar__menu ${open ? "is-open" : ""}`}>
          <ul className="navbar__links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={close}
                  className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            {user ? (
              <>
                {/* Demo only: preview each role's UI */}
                <select
                  className="role-switch"
                  value={user.role}
                  onChange={(e) => switchRole(e.target.value)}
                  aria-label="Preview role"
                  title="Demo: preview role"
                >
                  <option value="student">Student</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
                <span className="user-chip">
                  <span className="avatar">{user.name[0].toUpperCase()}</span>
                  {user.name}
                </span>
                <button className="btn btn--ghost btn--sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost btn--sm" onClick={close}>
                  Login
                </Link>
                <Link to="/register" className="btn btn--primary btn--sm" onClick={close}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
