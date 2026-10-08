import { useState } from "react";
import { Link } from "react-router-dom";
import QRTicket from "../components/QRTicket.jsx";
import { events, registrations } from "../data/dummyData.js";

export default function MyRegistrations() {
  const [items, setItems] = useState(registrations);

  const cancel = (id) => setItems((list) => list.filter((r) => r.id !== id));

  return (
    <div className="container page">
      <header className="page__header">
        <div>
          <h1>My registrations</h1>
          <p className="muted">Your tickets and upcoming events.</p>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="empty">
          <p>You haven't registered for any events yet.</p>
          <Link to="/events" className="btn btn--primary">Browse events</Link>
        </div>
      ) : (
        <div className="stack">
          {items.map((reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            return (
              <div key={reg.id} className="reg-item">
                <QRTicket registration={reg} event={event} />
                <div className="reg-item__actions">
                  <Link to={`/events/${event.id}`} className="btn btn--ghost btn--sm">View event</Link>
                  <button className="btn btn--danger btn--sm" onClick={() => cancel(reg.id)}>
                    Cancel registration
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
