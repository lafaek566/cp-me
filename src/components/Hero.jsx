import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-scroll";
import Model3D from "./Model3D";
import { motion, AnimatePresence } from "framer-motion";
import Typical from "react-typical";

const Hero = () => {
  const [showText, setShowText] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowText(true);
    setShowScrollPrompt(true);

    setTimeout(() => {
      setShowText(false);
      // scroll prompt tetap muncul
    }, 5000);
  };

  return (
    <div
      id="hero"
      className="relative w-full min-h-[80vh] bg-black overflow-hidden text-white flex items-center justify-center px-4 sm:px-6 md:px-12"
    >
      <div
        className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl w-full"
        style={{ minHeight: "600px" }}
      >
        {/* Deskripsi */}
        <div
          className="space-y-4 sm:space-y-6 mt-8 sm:mt-20 max-w-lg mx-auto md:mx-0"
          data-aos="fade-right"
        >
          <h1 className="mt-0 md:mt-[-100px] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Hy i'am <span className="text-orange-500">élv</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300">
            Ayo Join!, website interaktif, design UX, video editing hingga
            animasi 3D.
          </p>
          <Link
            to="portfolio"
            smooth={true}
            duration={500}
            className="inline-block mt-3"
          >
            <button className="bg-orange-600 hover:bg-orange-700 transition px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-white shadow-lg">
              Join
            </button>
          </Link>
        </div>

        {/* Model 3D dengan Klik */}
        <div
          className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] relative cursor-pointer"
          data-aos="fade-left"
          onClick={handleClick}
        >
          <Model3D />

          <AnimatePresence>
            <motion.div
              key={showText ? "chatbox-typing" : "chatbox-greeting"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-white/20 backdrop-blur-md border border-white/40 text-white 
                         px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-2xl text-center max-w-xs
                         sm:max-w-sm"
              style={{ maxWidth: "calc(100vw - 40px)" }}
            >
              {!showText && !isLoading ? (
                <p className="text-white text-sm sm:text-base font-medium">
                  Hai, klik aku ya! 👋
                </p>
              ) : showText ? (
                <Typical
                  steps={[
                    "Hi.. apa yang bisa èlv bantu?",
                    3000,
                    "Mau cari properti?",
                    2000,
                    "Atau ingin konsultasi?",
                    2000,
                  ]}
                  wrapper="p"
                  loop={1}
                  className="text-sm sm:text-base"
                />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {/* Scroll Prompt */}
          <AnimatePresence>
            {showScrollPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 sm:bottom-8 md:bottom-10 right-6 sm:right-10 md:right-12
                           text-white bg-orange-600/90 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full cursor-pointer
                           shadow-lg select-none text-xs sm:text-sm md:text-base"
              >
                <Link to="about" smooth={true} duration={500}>
                  Scroll ↓
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero;
