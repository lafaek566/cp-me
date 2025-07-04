import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, User, MessageCircle } from "lucide-react";
import { send } from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Nama harus diisi";
    if (!form.email.trim()) errs.email = "Email harus diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email tidak valid";
    if (!form.message.trim()) errs.message = "Pesan harus diisi";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await send(
        "service_mqocanv",
        "template_r25wulu",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "TOqnOmxnQmeZEzetE"
      );
      alert("Pesan terkirim! Terima kasih.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Gagal mengirim pesan, coba lagi nanti.");
    } finally {
      setSending(false);
    }
  };

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
        className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-gray-700 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-6 sm:p-10 flex flex-col md:flex-row gap-10"
      >
        {/* Contact Info */}
        <div className="md:w-1/2 w-full flex flex-col gap-6 items-center text-center">
          <h2 className="text-xl font-semibold text-yellow-300">Info Kontak</h2>

          <div className="flex gap-6 justify-center">
            {[
              {
                icon: <Mail size={28} />,
                link: "mailto:michaelenahak@gmail.com",
                color: "blue",
              },
              {
                icon: <Phone size={28} />,
                link: "https://wa.me/6281318660725?text=Hi%2C%20terima%20kasih%20sudah%20menghubungi.%20Saya%20Elv%2C%20ada%20yang%20ingin%20ditanyakan%3F",
                color: "green",
              },
              {
                icon: <MapPin size={28} />,
                link: "https://www.google.com/maps/place/Grogol+petamburan,+West+Jakarta+City,+Jakarta",
                color: "yellow",
              },
            ].map(({ icon, link, color }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, rotate: 5 }}
                className={`p-4 rounded-xl bg-${color}-900/30 text-${color}-300 hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] transition-all duration-300 border border-${color}-500/40`}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Map Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowMap(!showMap)}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-semibold rounded-md shadow-md transition-all duration-300"
          >
            {showMap ? "Tutup Peta" : "Lihat Peta"}
          </motion.button>

          {showMap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)]"
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

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gray-900/80 rounded-xl p-6 w-full md:w-1/2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-gray-700"
          noValidate
        >
          <h2 className="text-lg font-semibold mb-4 text-white">Kirim Pesan</h2>

          {/* Input Fields */}
          {[
            {
              id: "name",
              label: "Nama",
              type: "text",
              icon: <User size={18} />,
              placeholder: "nama lengkap",
              value: form.name,
              error: errors.name,
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              icon: <Mail size={18} />,
              placeholder: "email@domain.com",
              value: form.email,
              error: errors.email,
            },
          ].map(({ id, label, type, icon, placeholder, value, error }) => (
            <div className="mb-4" key={id}>
              <label
                htmlFor={id}
                className="block mb-1 font-semibold text-sm text-gray-300"
              >
                {label}
              </label>
              <div className="flex items-center gap-2 bg-gray-700 rounded-md px-3 py-2">
                {icon}
                <input
                  type={type}
                  id={id}
                  name={id}
                  autoComplete={
                    id === "name" ? "name" : id === "email" ? "email" : "off"
                  }
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 w-full text-sm sm:text-base"
                  disabled={sending}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          ))}

          {/* Message */}
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-1 font-semibold text-sm text-gray-300"
            >
              Pesan
            </label>
            <div className="flex items-start gap-2 bg-gray-700 rounded-md px-3 py-2">
              <MessageCircle size={18} className="text-gray-400 mt-1" />
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesan..."
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 resize-none w-full text-sm sm:text-base"
                required
                disabled={sending}
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={sending}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-md py-3 font-semibold text-white flex justify-center items-center gap-2 shadow-lg transition-colors ${
              sending ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {sending ? "Mengirim..." : "Kirim"} <Send size={18} />
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;
