import React, { useState, useEffect } from "react";
import "../styles/FloatingButton.css";

export default function FloatingButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-button-wrapper hidden">
      {/* Pulse effect */}
      <div className={`pulse-ring ${pulse ? "active" : ""}`}></div>

      {/* Main button */}
      <button
        className="floating-button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Hubungi saya untuk konsultasi"
      >
        <span className="icon-container">
          <span className="icon-main">👋</span>
          <span className={`icon-secondary ${isHovered ? "show" : ""}`}>
            💬
          </span>
        </span>
        <span className="button-text">Klik Aku!</span>
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="floating-tooltip">
          💡 Konsultasi gratis - klik untuk chat
        </div>
      )}
    </div>
  );
}
