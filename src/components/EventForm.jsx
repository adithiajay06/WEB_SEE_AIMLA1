import { useState } from "react";
import { CATEGORIES } from "../data/dummyData.js";

const EMPTY = {
  title: "",
  category: "Technical",
  date: "",
  time: "",
  venue: "",
  capacity: 100,
  price: 0,
  description: "",
};

// Used for both "Add event" (no initialValues) and "Edit event".
export default function EventForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialValues });
  const isEdit = Boolean(initialValues?.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      ...form,
      capacity: Number(form.capacity),
      price: Number(form.price),
    });
  };

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit event" : "Create a new event"}</h3>

      <div className="field">
        <label htmlFor="title">Event title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="venue">Venue</label>
          <input id="venue" name="venue" value={form.venue} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" name="time" value={form.time} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="capacity">Capacity</label>
          <input id="capacity" type="number" min="1" name="capacity" value={form.capacity} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="price">Price (₹, 0 = free)</label>
          <input id="price" type="number" min="0" name="price" value={form.price} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form__actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {isEdit ? "Save changes" : "Create event"}
        </button>
      </div>
    </form>
  );
}
