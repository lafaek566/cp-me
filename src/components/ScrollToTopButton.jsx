import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-10 right-10
        bg-gray-800 text-white
        p-4 rounded-full shadow-xl
        transition duration-300 ease-in-out
        transform
        ${
          visible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }
        hover:bg-gray-600 hover:scale-110 hover:animate-spin-slow
        focus:outline-none focus:ring-4 focus:ring-gray-300
        z-50
      `}
    >
      <FaArrowUp size={24} />
    </button>
  );
}
