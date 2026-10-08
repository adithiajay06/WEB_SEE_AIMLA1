import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <section className="container page center unauthorized">
      <div className="unauthorized__icon">🚫</div>
      <h1>403 – Access denied</h1>
      <p className="muted">
        {user
          ? `Your role (${user.role}) doesn't have permission to view that page.`
          : "Please log in to continue."}
      </p>
      <div className="row row--center">
        <Link to="/events" className="btn btn--ghost">Back to events</Link>
        <Link to={user ? "/dashboard" : "/login"} className="btn btn--primary">
          {user ? "Go to dashboard" : "Log in"}
        </Link>
      </div>
    </section>
  );
}
