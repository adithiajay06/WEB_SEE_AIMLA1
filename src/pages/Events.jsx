import { useMemo, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import { events, CATEGORIES, registrations } from "../data/dummyData.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Events() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [registeredIds, setRegisteredIds] = useState(registrations.map((r) => r.eventId));
  const [toast, setToast] = useState("");

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (category === "All" || e.category === category) &&
          e.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  const handleRegister = (event) => {
    setRegisteredIds((ids) => [...ids, event.id]);
    setToast(`You're registered for “${event.title}”!`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="container page">
      <header className="page__header">
        <div>
          <h1>Discover campus events</h1>
          <p className="muted">Workshops, fests, sports and more – all in one place.</p>
        </div>
        <input
          className="search"
          type="search"
          placeholder="Search events…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search events"
        />
      </header>

      <div className="chips" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            className={`chip ${category === c ? "is-active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {toast && <div className="alert alert--success" role="status">{toast}</div>}

      {filtered.length === 0 ? (
        <p className="empty">No events match your search.</p>
      ) : (
        <div className="grid">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              registered={registeredIds.includes(ev.id)}
              // Only students see the Register button
              onRegister={user?.role === "student" ? handleRegister : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
