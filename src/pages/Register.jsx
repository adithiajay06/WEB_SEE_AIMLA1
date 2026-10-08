import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirm: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Dummy sign-up – no backend call
    login({ name: form.name, email: form.email, role: form.role });
    navigate("/dashboard");
  };

  return (
    <section className="auth">
      <form className="card auth__card form" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <p className="muted">Join your campus community in under a minute.</p>

        {error && <div className="alert alert--error" role="alert">{error}</div>}

        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="email">College email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form__grid">
          <div className="field">
            <label htmlFor="department">Department</label>
            <input id="department" name="department" value={form.department} onChange={handleChange} placeholder="e.g. CSE" />
          </div>
          <div className="field">
            <label htmlFor="role">I am a</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" value={form.password} onChange={handleChange} minLength={6} required />
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
          </div>
        </div>

        <button className="btn btn--primary btn--block" type="submit">Sign up</button>
        <p className="muted small center">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}
