import { useState } from "react";

export default function FeedbackForm({ eventTitle, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    onSubmit?.({ rating, comment });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card feedback feedback--done">
        <h3>Thanks for your feedback! 🎉</h3>
        <p className="muted">You rated this event {rating}/5.</p>
      </div>
    );
  }

  return (
    <form className="card feedback form" onSubmit={handleSubmit}>
      <h3>Rate {eventTitle ? `“${eventTitle}”` : "this event"}</h3>

      <div className="stars" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className={`star ${n <= (hover || rating) ? "is-on" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
          >
            ★
          </button>
        ))}
      </div>

      <div className="field">
        <label htmlFor="comment">Comments (optional)</label>
        <textarea
          id="comment"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like? What could be better?"
        />
      </div>

      <button className="btn btn--primary" type="submit" disabled={!rating}>
        Submit feedback
      </button>
    </form>
  );
}
