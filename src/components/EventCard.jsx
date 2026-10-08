import { Link } from "react-router-dom";
import { formatDate } from "../data/dummyData.js";

export default function EventCard({ event, onRegister, registered = false }) {
  const seatsLeft = event.capacity - event.registered;
  const full = seatsLeft <= 0;
  const fill = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  return (
    <article className="event-card">
      <div
        className="event-card__banner"
        style={{
          background: `linear-gradient(135deg, hsl(${event.hue} 80% 60%), hsl(${event.hue + 40} 80% 45%))`,
        }}
      >
        <span className="badge badge--light">{event.category}</span>
        <span className="event-card__price">{event.price === 0 ? "Free" : `₹${event.price}`}</span>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{event.title}</h3>
        <ul className="event-card__meta">
          <li>📅 {formatDate(event.date)} · {event.time}</li>
          <li>📍 {event.venue}</li>
          <li>👥 {event.organizer}</li>
        </ul>

        <div className="progress" aria-label={`${fill}% full`}>
          <div className="progress__bar" style={{ width: `${fill}%` }} />
        </div>
        <p className="muted small">
          {full ? "Event full" : `${seatsLeft} seats left of ${event.capacity}`}
        </p>
      </div>

      <div className="event-card__footer">
        <Link to={`/events/${event.id}`} className="btn btn--ghost btn--sm">
          View details
        </Link>
        {onRegister && (
          <button
            className="btn btn--primary btn--sm"
            disabled={full || registered}
            onClick={() => onRegister(event)}
          >
            {registered ? "Registered ✓" : full ? "Full" : "Register"}
          </button>
        )}
      </div>
    </article>
  );
}
