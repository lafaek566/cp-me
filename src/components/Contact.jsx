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
        "service_mqocanv",
        "template_2iuulz7",
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10 mt-[-80px]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-wide text-center">
        Kontak
      </h1>

      <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start gap-8">
        {/* Contact info */}
        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">Kontak</h2>

          {/* Card Email */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 shadow-md flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-900 text-blue-400 shrink-0">
              <Mail size={24} />
            </div>
            <a
              href="mailto:michaelenahak@gmail.com"
              className="text-blue-400 hover:underline break-words text-base sm:text-lg font-medium"
            >
              michaelenahak@gmail.com
            </a>
          </div>

          {/* Card Phone */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 shadow-md flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-900 text-green-400 shrink-0">
              <Phone size={24} />
            </div>
            <a
              href="https://wa.me/6281318660725?text=Hi%2C%20terima%20kasih%20sudah%20menghubungi.%20Saya%20Elv%2C%20ada%20yang%20ingin%20ditanyakan%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline break-words text-base sm:text-lg font-medium"
            >
              +62 813-186-60725
            </a>
          </div>

          {/* Card Address */}
          <div
            className="bg-gray-700 rounded-lg p-4 border border-gray-600 shadow-md flex items-center gap-3 cursor-default select-none"
            aria-label="Alamat"
          >
            <div className="p-2 rounded-full bg-yellow-900 text-yellow-400 shrink-0">
              <MapPin size={24} />
            </div>
            <p className="text-yellow-400 text-base sm:text-lg font-medium">
              Jl. Proklamasi, NTT - Indonesia
            </p>
          </div>

          {/* Google Maps embed selalu muncul */}
          <div
            id="map-container"
            className="mt-4 w-full h-64 rounded-lg overflow-hidden border border-yellow-400 shadow-md"
          >
            <iframe
              title="Lokasi Peta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.562921393636!2d124.89124777501974!3d-9.103519990960788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2cffbe68c14ee4ff%3A0xe1f486929a0e42bb!2sJl.%20Proklamasi%2C%20Berdao%2C%20Kec.%20Atambua%20Bar.%2C%20Kabupaten%20Belu%2C%20Nusa%20Tenggara%20Tim.!5e0!3m2!1sen!2sid!4v1749395446642!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-lg p-5 sm:p-7 w-full md:w-1/2 shadow-md"
          noValidate
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Pesan</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-sm text-gray-300"
            >
              Nama
            </label>
            <div className="flex items-center gap-2 bg-gray-700 rounded-md px-3 py-2">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 w-full text-sm sm:text-base"
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

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-sm text-gray-300"
            >
              Email
            </label>
            <div className="flex items-center gap-2 bg-gray-700 rounded-md px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 w-full text-sm sm:text-base"
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
                placeholder="Tulis pesan kamu di sini..."
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 resize-none w-full text-sm sm:text-base"
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
            {sending ? "Mengirim..." : "Kirim"} <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
