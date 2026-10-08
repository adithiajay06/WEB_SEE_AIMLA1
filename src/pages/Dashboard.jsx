import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import QRScanner from "../components/QRScanner.jsx";
import { stats, events, pendingApprovals, formatDate } from "../data/dummyData.js";

export default function Dashboard() {
  const { user } = useAuth();
  const cards = stats[user.role];
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <div className="container page">
      <header className="page__header">
        <div>
          <h1>Hello, {user.name} 👋</h1>
          <p className="muted">
            <span className={`badge badge--${user.role}`}>{user.role}</span> dashboard
          </p>
        </div>
        {user.role === "student" && <Link to="/events" className="btn btn--primary">Browse events</Link>}
        {user.role !== "student" && <Link to="/manage-events" className="btn btn--primary">Manage events</Link>}
      </header>

      <div className="stats">
        {cards.map((s) => (
          <div key={s.label} className="stat card">
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <section className="card">
          <h3>Upcoming events</h3>
          <ul className="list">
            {upcoming.map((e) => (
              <li key={e.id}>
                <div>
                  <strong>{e.title}</strong>
                  <p className="muted small">{formatDate(e.date)} · {e.venue}</p>
                </div>
                <Link to={`/events/${e.id}`} className="btn btn--ghost btn--sm">View</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Role-specific panels */}
        {user.role === "student" && (
          <section className="card">
            <h3>Quick links</h3>
            <ul className="list">
              <li><span>🎟 View your tickets</span><Link to="/my-registrations" className="btn btn--ghost btn--sm">Open</Link></li>
              <li><span>📜 Download certificates</span><button className="btn btn--ghost btn--sm">Soon</button></li>
            </ul>
          </section>
        )}

        {user.role === "organizer" && <QRScanner />}

        {user.role === "admin" && (
          <section className="card">
            <h3>Pending approvals</h3>
            <ul className="list">
              {pendingApprovals.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.title}</strong>
                    <p className="muted small">{p.organizer} · {formatDate(p.date)}</p>
                  </div>
                  <div className="row">
                    <button className="btn btn--primary btn--sm">Approve</button>
                    <button className="btn btn--danger btn--sm">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
