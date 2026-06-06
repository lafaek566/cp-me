import React, { useState } from "react";
import { chatAnalytics } from "../utils/chatAnalytics";
import "../styles/AnalyticsViewer.css";

export default function AnalyticsViewer() {
  const [showStats, setShowStats] = useState(false);
  const stats = chatAnalytics.getFormattedData();

  // Keyboard shortcut: Ctrl+Shift+A to toggle analytics
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setShowStats(!showStats);
        chatAnalytics.logStats();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showStats]);

  if (!showStats) return null;

  return (
    <div className="analytics-viewer">
      <div className="analytics-header">
        <h3>📊 Chat Widget Analytics</h3>
        <button className="close-analytics" onClick={() => setShowStats(false)}>
          ✕
        </button>
      </div>

      <div className="analytics-body">
        <div className="stat-item">
          <span className="stat-label">Widget Opens:</span>
          <span className="stat-value">{stats.opens}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Quick Replies Clicked:</span>
          <span className="stat-value">{stats.quickReplies}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Custom Messages Sent:</span>
          <span className="stat-value">{stats.messages}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Total Interactions:</span>
          <span className="stat-value highlight">{stats.total}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Conversion Rate:</span>
          <span className="stat-value highlight">{stats.conversion}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Session ID:</span>
          <span className="stat-value-small">{stats.sessionId}</span>
        </div>

        <div className="analytics-actions">
          <button
            className="reset-btn"
            onClick={() => {
              chatAnalytics.reset();
              setShowStats(false);
            }}
          >
            🔄 Reset Analytics
          </button>
        </div>

        <div className="analytics-footer">
          <p>💡 Tip: Press <kbd>Ctrl+Shift+A</kbd> to toggle analytics</p>
        </div>
      </div>
    </div>
  );
}
