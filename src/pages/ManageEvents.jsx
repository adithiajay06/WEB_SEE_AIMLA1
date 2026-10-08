import { useState } from "react";
import EventForm from "../components/EventForm.jsx";
import { events as seedEvents, formatDate } from "../data/dummyData.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ManageEvents() {
  const { user } = useAuth();
  const [list, setList] = useState(seedEvents);
  const [editing, setEditing] = useState(null); // event object | "new" | null

  const handleSave = (data) => {
    if (data.id) {
      setList((l) => l.map((e) => (e.id === data.id ? { ...e, ...data } : e)));
    } else {
      setList((l) => [
        ...l,
        { ...data, id: Date.now(), registered: 0, organizer: user.name, hue: 260 },
      ]);
    }
    setEditing(null);
  };

  const handleDelete = (id) => setList((l) => l.filter((e) => e.id !== id));

  return (
    <div className="container page">
      <header className="page__header">
        <div>
          <h1>Manage events</h1>
          <p className="muted">
            {user.role === "admin" ? "Admin view – all events on campus." : "Create and edit your events."}
          </p>
        </div>
        {!editing && (
          <button className="btn btn--primary" onClick={() => setEditing("new")}>
            + New event
          </button>
        )}
      </header>

      {editing && (
        <EventForm
          initialValues={editing === "new" ? undefined : editing}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="table-wrap card">
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Category</th>
              <th>Registered</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.id}>
                <td data-label="Event"><strong>{e.title}</strong></td>
                <td data-label="Date">{formatDate(e.date)}</td>
                <td data-label="Category"><span className="badge">{e.category}</span></td>
                <td data-label="Registered">{e.registered}/{e.capacity}</td>
                <td data-label="Actions" className="table__actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditing(e)}>Edit</button>
                  <button className="btn btn--danger btn--sm" onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
