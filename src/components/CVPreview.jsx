import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Code2,
  Briefcase,
  Award,
  GraduationCap,
} from "lucide-react";
import { FaReact, FaNodeJs, FaPython, FaPhp } from "react-icons/fa";
import { SiMysql, SiJavascript } from "react-icons/si";

const CVPreview = () => {
  const cvData = {
    name: "Elvren",
    title: "Full Stack Developer",
    email: "michaelenahak@gmail.com",
    phone: "+6281318660725",
    location: "Jakarta, Indonesia",
    summary:
      "Full Stack Developer dengan passion untuk membangun web applications yang robust dan user-friendly. Pengalaman dalam JavaScript, React, Node.js, Python, dan database design.",

    experience: [
      {
        role: "Full Stack Developer",
        company: "Freelance",
        period: "2023 - Present",
        description:
          "Mengembangkan website interaktif, aplikasi real-time, dan sistem scraping data dengan teknologi modern.",
      },
      {
        role: "Web Developer",
        company: "Project Based",
        period: "2022 - 2023",
        description:
          "Membuat website e-commerce, real estate platform, dan sistem management berbasis web.",
      },
    ],

    skills: [
      { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "PHP"] },
      { category: "Database", items: ["MySQL", "MongoDB"] },
      { category: "Tools", items: ["Git", "Webpack", "Vite"] },
    ],

    projects: [
      {
        name: "Stream Video Platform (cinemaindo.cam)",
        desc: "Platform streaming video dengan authentication dan database",
      },
      {
        name: "Real Estate Website",
        desc: "Aplikasi real estate dengan map integration dan search filter",
      },
      {
        name: "CoffeeShop Website",
        desc: "Website toko kopi dengan portfolio dan contact system",
      },
      {
        name: "Data Scraping System",
        desc: "Automation tool untuk mengambil dan process data dari berbagai sumber",
      },
    ],

    languages: [
      { name: "Bahasa Indonesia", level: "Native" },
      { name: "English", level: "Professional" },
    ],

    certifications: [
      "Full Stack Web Development Certification",
      "JavaScript Advanced Concepts",
      "React & Node.js Mastery",
    ],
  };

  const skillIcons = {
    React: <FaReact className="text-cyan-400 text-xl" />,
    "Node.js": <FaNodeJs className="text-green-500 text-xl" />,
    Python: <FaPython className="text-blue-400 text-xl" />,
    PHP: <FaPhp className="text-indigo-400 text-xl" />,
    MySQL: <SiMysql className="text-blue-500 text-xl" />,
    JavaScript: <SiJavascript className="text-yellow-400 text-xl" />,
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
      >
        <h2 className="text-4xl font-bold mb-2">{cvData.name}</h2>
        <p className="text-xl text-blue-100 mb-4">{cvData.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{cvData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>{cvData.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{cvData.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {cvData.summary}
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-orange-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Pengalaman</h3>
          </div>
          <div className="space-y-4">
            {cvData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.1 }}
                className="bg-gray-800/50 border-l-4 border-orange-400 pl-4 py-3 rounded"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-white">{exp.role}</p>
                  <span className="text-xs text-gray-400">{exp.period}</span>
                </div>
                <p className="text-sm text-orange-300 mb-1">{exp.company}</p>
                <p className="text-sm text-gray-400">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-cyan-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Keterampilan</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cvData.skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.08 }}
                className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-3 text-center"
              >
                <p className="text-xs font-bold text-cyan-300 mb-2">
                  {skillGroup.category}
                </p>
                <p className="text-xs text-gray-300">
                  {skillGroup.items.join(", ")}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-purple-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Project Utama</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cvData.projects.map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + idx * 0.08 }}
                className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-lg p-3"
              >
                <p className="font-semibold text-purple-300 text-sm mb-1">
                  {proj.name}
                </p>
                <p className="text-xs text-gray-400">{proj.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages & Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Languages */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="text-green-400" size={20} />
              <h4 className="font-bold text-white">Bahasa</h4>
            </div>
            <div className="space-y-2">
              {cvData.languages.map((lang, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + idx * 0.05 }}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-300">{lang.name}</span>
                  <span className="text-green-400 font-semibold">
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="text-yellow-400" size={20} />
              <h4 className="font-bold text-white">Sertifikasi</h4>
            </div>
            <div className="space-y-2">
              {cvData.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + idx * 0.05 }}
                  className="text-sm text-yellow-300 flex items-start gap-2"
                >
                  <span>✓</span>
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 pt-6 border-t border-gray-700 flex-wrap"
        >
          <motion.a
            href="/CV-Michael-Enahak.pdf"
            download="CV-Michael-Enahak.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-fit flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
          >
            <Download size={18} />
            Download CV
          </motion.a>

          <motion.a
            href="https://wa.me/6281318660725?text=Halo%20Elv!%20Saya%20tertarik%20dengan%20profile%20Anda.%20Bisa%20diskusi%3F"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-fit flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
          >
            <Phone size={18} />
            Hubungi via WA
          </motion.a>

          <a
            href="mailto:michaelenahak@gmail.com"
            className="flex-1 min-w-fit flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer no-underline hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Mail size={18} />
            Email Me
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CVPreview;
