import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, User, MessageCircle } from "lucide-react";
import { send } from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

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
        "service_mqocanv", // Service ID baru
        "template_2iuulz7", // Template ID baru
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "TOqnOmxnQmeZEzetE" // Public Key baru
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-12 mt-[-80px]">
      <h1 className="text-4xl font-bold mb-8 tracking-wide text-center">
        Kontak
      </h1>

      <div className="w-full max-w-6xl bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-10">
        {/* Contact info */}
        <div className="flex flex-col gap-8 md:w-1/2 w-full">
          <h2 className="text-xl font-bold mb-2">Informasi Kontak</h2>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-900 text-blue-400 shrink-0">
              <Mail size={28} />
            </div>
            <div className="break-words">
              <p className="text-lg font-semibold">Email</p>
              <a
                href="mailto:michaelenahak@gmail.com"
                className="text-blue-400 hover:underline break-words"
              >
                michaelenahak@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-900 text-green-400 shrink-0">
              <Phone size={28} />
            </div>
            <div className="break-words">
              <p className="text-lg font-semibold">WA Kami</p>
              <a
                href="https://wa.me/6281318660725?text=Hi%2C%20terima%20kasih%20sudah%20menghubungi.%20Saya%20Elv%2C%20ada%20yang%20ingin%20ditanyakan%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline break-words"
              >
                +62 813-186-60725
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-900 text-yellow-400 shrink-0">
              <MapPin size={28} />
            </div>
            <div className="break-words">
              <p className="text-lg font-semibold">Alamat</p>
              <p>Jl. Proklamasi, NTT - Indonesia</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-xl p-6 sm:p-8 w-full md:w-1/2 shadow-lg"
          noValidate
        >
          <h2 className="text-xl font-bold mb-4">Formulir Pesan</h2>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-sm text-gray-300"
            >
              Nama
            </label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-md px-3 py-2">
              <User size={20} className="text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 w-full"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby="name-error"
                required
                disabled={sending}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-sm text-gray-300"
            >
              Email
            </label>
            <div className="flex items-center gap-3 bg-gray-700 rounded-md px-3 py-2">
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 w-full"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
                required
                disabled={sending}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-sm text-gray-300"
            >
              Pesan
            </label>
            <div className="flex items-start gap-3 bg-gray-700 rounded-md px-3 py-2">
              <MessageCircle size={20} className="text-gray-400 mt-1" />
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesan kamu di sini..."
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 resize-none w-full"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby="message-error"
                required
                disabled={sending}
              />
            </div>
            {errors.message && (
              <p id="message-error" className="text-red-500 text-xs mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className={`w-full bg-blue-600 hover:bg-blue-700 rounded-md py-3 font-semibold text-white flex justify-center items-center gap-2 shadow-lg transition-colors ${
              sending ? "opacity-60 cursor-not-allowed" : ""
            }`}
            aria-label="Kirim pesan"
          >
            {sending ? "Mengirim..." : "Kirim"} <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
