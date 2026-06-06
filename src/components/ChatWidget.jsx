import React, { useState, useEffect } from "react";
import "../styles/ChatWidget.css";
import { chatAnalytics } from "../utils/chatAnalytics";
import FloatingButton from "./FloatingButton";

// Sound notification
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log("Audio notification not available");
  }
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [badge, setBadge] = useState(1);

  const whatsappNumber = "6281318660725";

  // Initialize analytics on mount
  useEffect(() => {
    chatAnalytics.init();
  }, []);

  // Get current timestamp
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      chatAnalytics.trackOpen();
      playNotificationSound();
      setBadge(0); // Clear badge when opened
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setIsTyping(true);
    playNotificationSound();

    setTimeout(() => {
      const finalMessage = message.trim();
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Track custom message
      chatAnalytics.trackCustomMessage();

      window.open(whatsappLink, "_blank");
      setMessage("");
      setIsTyping(false);
      setIsOpen(false);
    }, 600);
  };

  const handleQuickMessage = (text, label) => {
    setIsTyping(true);
    playNotificationSound();

    setTimeout(() => {
      const encodedMessage = encodeURIComponent(text);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Track quick reply
      chatAnalytics.trackQuickReply(label);

      window.open(whatsappLink, "_blank");
      setIsOpen(false);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="chat-widget-container">
      {/* Chat Bubble */}
      {isOpen && (
        <div className="chat-bubble">
          <div className="chat-header">
            <h3>� Konsultasi Layanan</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chat-body">
            <p className="chat-greeting">
              👋 Pilih layanan yang Anda butuhkan atau kirim pertanyaan custom!
            </p>

            {/* Quick Reply Options */}
            <div className="quick-replies">
              <button
                className="quick-btn"
                onClick={() =>
                  handleQuickMessage(
                    "Saya tertarik dengan jasa Design Anda",
                    "Design"
                  )
                }
              >
                🎨 Design
              </button>
              <button
                className="quick-btn"
                onClick={() =>
                  handleQuickMessage(
                    "Saya butuh Fullstack Developer untuk project saya",
                    "Fullstack Developer"
                  )
                }
              >
                💻 Fullstack Developer
              </button>
              <button
                className="quick-btn"
                onClick={() =>
                  handleQuickMessage(
                    "Saya tertarik dengan jasa Mobile Developer",
                    "Mobile Developer"
                  )
                }
              >
                📱 Mobile Developer
              </button>
              <button
                className="quick-btn"
                onClick={() =>
                  handleQuickMessage(
                    "Saya butuh jasa Scraping data",
                    "Scraping"
                  )
                }
              >
                🔍 Scraping
              </button>
              <button
                className="quick-btn"
                onClick={() =>
                  handleQuickMessage(
                    "Saya punya project custom",
                    "Custom Project"
                  )
                }
              >
                ⚙️ Custom Project
              </button>
            </div>

            {/* Message Input */}
            <div className="message-input-area">
              <textarea
                className="message-input"
                placeholder="Tulis pesan Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isTyping}
              />

              {/* Typing Indicator */}
              {isTyping && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
              >
                {isTyping ? "⏳ Mengirim..." : "📤 Kirim"}
              </button>

              {/* Timestamp */}
              <div className="chat-timestamp">
                {getCurrentTime()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <FloatingButton onClick={handleOpenChat} />
    </div>
  );
}
