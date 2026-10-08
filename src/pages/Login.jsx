import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "", role: "student" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login – no backend call
    login({ email: form.email, role: form.role });
    navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
  };

  return (
    <section className="auth">
      <form className="card auth__card form" onSubmit={handleSubmit}>
        <h2>Welcome back 👋</h2>
        <p className="muted">Log in to register for events and manage your tickets.</p>

        <div className="field">
          <label htmlFor="email">College email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@college.edu" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        </div>
        <div className="field">
          <label htmlFor="role">Log in as (demo)</label>
          <select id="role" name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn--primary btn--block" type="submit">Log in</button>
        <p className="muted small center">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
