import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { events, feedbackList, formatDate } from "../data/dummyData.js";
import FeedbackForm from "../components/FeedbackForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [registered, setRegistered] = useState(false);

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="container page center">
        <h2>Event not found</h2>
        <Link to="/events" className="btn btn--primary">Back to events</Link>
      </div>
    );
  }

  const reviews = feedbackList.filter((f) => f.eventId === event.id);
  const seatsLeft = event.capacity - event.registered;

  const handleRegister = () => {
    if (!user) return navigate("/login");
    setRegistered(true);
  };

  return (
    <div className="container page">
      <Link to="/events" className="back-link">← All events</Link>

      <div
        className="details__hero"
        style={{
          background: `linear-gradient(135deg, hsl(${event.hue} 80% 58%), hsl(${event.hue + 40} 80% 42%))`,
        }}
      >
        <span className="badge badge--light">{event.category}</span>
        <h1>{event.title}</h1>
        <p>Organised by {event.organizer}</p>
      </div>

      <div className="details__layout">
        <div className="details__main">
          <section className="card">
            <h3>About this event</h3>
            <p>{event.description}</p>
          </section>

          <section className="card">
            <h3>Feedback ({reviews.length})</h3>
            {reviews.length === 0 && <p className="muted">No feedback yet.</p>}
            {reviews.map((r) => (
              <div key={r.id} className="review">
                <strong>{r.user}</strong>
                <span className="review__stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                <p className="muted">{r.comment}</p>
              </div>
            ))}
          </section>

          {user?.role === "student" && <FeedbackForm eventTitle={event.title} />}
        </div>

        <aside className="details__side card">
          <ul className="info-list">
            <li><span>📅 Date</span><strong>{formatDate(event.date)}</strong></li>
            <li><span>⏰ Time</span><strong>{event.time}</strong></li>
            <li><span>📍 Venue</span><strong>{event.venue}</strong></li>
            <li><span>🎟 Price</span><strong>{event.price === 0 ? "Free" : `₹${event.price}`}</strong></li>
            <li><span>👥 Seats left</span><strong>{seatsLeft}</strong></li>
          </ul>

          {/* Role-based action area */}
          {(!user || user.role === "student") && (
            <button
              className="btn btn--primary btn--block"
              disabled={registered || seatsLeft <= 0}
              onClick={handleRegister}
            >
              {registered ? "Registered ✓" : seatsLeft <= 0 ? "Event full" : user ? "Register now" : "Log in to register"}
            </button>
          )}
          {user?.role === "organizer" && (
            <Link to="/manage-events" className="btn btn--ghost btn--block">Edit in Manage Events</Link>
          )}
          {user?.role === "admin" && (
            <div className="admin-actions">
              <button className="btn btn--ghost btn--block">Approve event</button>
              <button className="btn btn--danger btn--block">Remove event</button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
