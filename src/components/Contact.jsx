import React, { useState } from "react";
import { Mail, Phone, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";
import CVPreview from "./CVPreview";

const Contact = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-12 text-center text-white tracking-widest"
      >
        Kontak Saya
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-gray-700 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-6 sm:p-10 flex flex-col lg:flex-row gap-10"
      >
        {/* Contact Info - Left Side */}
        <div className="lg:w-1/3 w-full flex flex-col gap-8 items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 mb-6">
              Hubungi Saya
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Ada pertanyaan? Hubungi saya melalui WhatsApp atau email.
            </p>
          </motion.div>

          <div className="flex gap-6 justify-center flex-wrap">
            {[
              // {
              //   icon: <MapPin size={28} />,
              //   link: "https://www.google.com/maps/place/Grogol+petamburan,+West+Jakarta+City,+Jakarta",
              //   color: "yellow",
              //   label: "Lokasi",
              // },
            ].map(({ icon, link, color, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-2xl bg-${color}-900/30 text-${color}-300 hover:shadow-[0_0_25px_4px_rgba(255,255,255,0.5)] transition-all duration-300 border-2 border-${color}-500/40 hover:border-${color}-400`}
                >
                  {icon}
                </motion.a>
                <span className="text-xs text-gray-400 mt-2 font-semibold">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Map Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowMap(!showMap)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-yellow-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
          >
            {showMap ? "Tutup Peta" : "📍 Lihat Lokasi"}
          </motion.button>

          {showMap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-[0_0_30px_rgba(255,255,0,0.6)]"
            >
              <iframe
                title="Lokasi Peta"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31734.01556248015!2d106.7865605!3d-6.1639655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f64443e58dcb%3A0x1cdeacf61286820a!2sGrogol%20petamburan%2C%20West%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1751376627297!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          )}
        </div>

        {/* CV Section - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:w-2/3 w-full flex flex-col gap-6"
        >
          <CVPreview />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
