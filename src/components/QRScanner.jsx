import { useState } from "react";

// UI placeholder only – no camera access. Wire up a scanner library
// (e.g. html5-qrcode) here when you add real functionality.
export default function QRScanner({ onScan }) {
  const [scanning, setScanning] = useState(false);
  const [manual, setManual] = useState("");
  const [result, setResult] = useState(null);

  const report = (code) => {
    const payload = { code, time: new Date().toLocaleTimeString() };
    setResult(payload);
    setScanning(false);
    onScan?.(payload);
  };

  return (
    <div className="card scanner">
      <h3>Check-in scanner</h3>

      <div className={`scanner__viewfinder ${scanning ? "is-scanning" : ""}`}>
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        {scanning && <span className="scanner__line" />}
        <p className="scanner__hint">
          {scanning ? "Point the camera at a ticket…" : "Camera preview appears here"}
        </p>
      </div>

      <div className="scanner__controls">
        {scanning ? (
          <>
            <button className="btn btn--ghost" onClick={() => setScanning(false)}>
              Stop
            </button>
            {/* Simulates a successful scan so you can see the result state */}
            <button className="btn btn--primary" onClick={() => report("REG-1001")}>
              Simulate scan
            </button>
          </>
        ) : (
          <button className="btn btn--primary" onClick={() => setScanning(true)}>
            Start scanning
          </button>
        )}
      </div>

      <form
        className="scanner__manual"
        onSubmit={(e) => {
          e.preventDefault();
          if (manual.trim()) {
            report(manual.trim());
            setManual("");
          }
        }}
      >
        <input
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="Or enter ticket ID (e.g. REG-1001)"
          aria-label="Ticket ID"
        />
        <button className="btn btn--ghost" type="submit">
          Check in
        </button>
      </form>

      {result && (
        <div className="alert alert--success" role="status">
          ✅ <strong>{result.code}</strong> checked in at {result.time}
        </div>
      )}
    </div>
  );
}
