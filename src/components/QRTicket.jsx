import { formatDate } from "../data/dummyData.js";

const SIZE = 21;

// Deterministic pseudo-random pattern from the ticket id.
// PLACEHOLDER ONLY – not a scannable QR code. Swap for a real
// QR library (e.g. `qrcode.react`) when you connect a backend.
function buildPattern(seed) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const cells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const inFinder =
        (r < 7 && c < 7) || (r < 7 && c >= SIZE - 7) || (r >= SIZE - 7 && c < 7);
      if (inFinder) {
        const rr = r >= SIZE - 7 ? r - (SIZE - 7) : r;
        const cc = c >= SIZE - 7 ? c - (SIZE - 7) : c;
        const edge = rr === 0 || rr === 6 || cc === 0 || cc === 6;
        const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
        cells.push(edge || core);
      } else {
        h = (h * 1664525 + 1013904223) >>> 0;
        cells.push((h >>> 16) % 2 === 0);
      }
    }
  }
  return cells;
}

export default function QRTicket({ registration, event }) {
  const cells = buildPattern(registration.id);

  return (
    <div className="qr-ticket">
      <div className="qr-ticket__info">
        <span className="badge">{registration.status}</span>
        <h3>{event.title}</h3>
        <p className="muted small">
          📅 {formatDate(event.date)} · {event.time}
          <br />
          📍 {event.venue}
        </p>
        <p className="qr-ticket__id">Ticket ID: {registration.id}</p>
      </div>

      <div className="qr-ticket__divider" aria-hidden="true" />

      <div className="qr-ticket__code">
        <div
          className="qr-grid"
          role="img"
          aria-label="QR code placeholder"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
        >
          {cells.map((on, i) => (
            <span key={i} className={on ? "qr-cell on" : "qr-cell"} />
          ))}
        </div>
        <p className="muted small">Show this at the venue entrance</p>
      </div>
    </div>
  );
}
