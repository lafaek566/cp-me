import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPaintBrush, FaVideo } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

const About = () => {
  const roles = [
    {
      title: "Programmer Fullstack",
      description:
        "Ahli dalam pengembangan aplikasi web dan mobile dengan teknologi frontend dan backend modern.",
      details: [
        "Pembuatan website dan aplikasi responsif",
        "Pengembangan sistem informasi dan integrasi API",
        "Frontend: React, Vue, atau framework modern lainnya",
        "Backend: Node.js, Express, dan teknologi server-side",
        "Database: MySQL, MongoDB, PostgreSQL",
        "Deployment ke server atau cloud (AWS, Vercel, Netlify, dll)",
      ],
      icon: <FaCode className="text-4xl text-blue-400 drop-shadow" />,
    },
    {
      title: "Designer UI/UX",
      description:
        "Spesialis dalam merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang optimal.",
      details: [
        "Desain visual branding, poster, & sosial media",
        "Membuat wireframe dan prototype interaktif",
        "Optimasi UX agar ramah & nyaman digunakan",
        "Pemilihan warna, font, dan layout yang serasi",
      ],
      icon: <FaPaintBrush className="text-4xl text-pink-400 drop-shadow" />,
    },
    {
      title: "Videografer",
      description:
        "Membuat video berkualitas tinggi untuk berbagai kebutuhan promosi dan dokumentasi.",
      details: [
        "Video promosi, edukasi, dan konten sosial media",
        "Editing dengan Adobe Premiere & After Effects",
        "Template video siap pakai untuk efisiensi produksi",
        "Teknik sinematografi dan storytelling visual",
      ],
      icon: <FaVideo className="text-4xl text-orange-400 drop-shadow" />,
    },
  ];

  const [openStates, setOpenStates] = useState(Array(roles.length).fill(false));

  const toggleItem = (index) => {
    setOpenStates((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black px-4 pt-16 pb-10 flex flex-col items-center"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Tentang
      </motion.h2>

      <motion.p
        className="text-center text-gray-300 mb-10 max-w-3xl px-4 text-sm sm:text-base leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Saya mengedepankan kreativitas dan dedikasi dalam setiap proyek digital
        yang saya kerjakan. Dengan keahlian di bidang pemrograman, desain, dan
        videografi, saya berkomitmen untuk mewujudkan ide Anda menjadi solusi
        digital yang efektif dan menarik.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            className={`rounded-2xl p-6 flex flex-col text-white border backdrop-blur-md transition-all duration-300 ${
              index === 2
                ? "bg-orange-900/20 border-orange-500"
                : "bg-white/5 border-gray-700"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.035,
              boxShadow: "0px 8px 20px rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              duration: 0.4,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">{role.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {role.title}
            </h3>
            <p className="text-gray-300 text-sm text-center mb-3">
              {role.description}
            </p>

            <button
              onClick={() => toggleItem(index)}
              className="flex items-center justify-center text-sm text-orange-400 hover:text-orange-300 hover:underline mb-2 transition"
              aria-expanded={openStates[index]}
              aria-controls={`details-${index}`}
            >
              {openStates[index] ? (
                <>
                  Tutup Detail <FiChevronUp className="ml-1" />
                </>
              ) : (
                <>
                  Lihat Detail <FiChevronDown className="ml-1" />
                </>
              )}
            </button>

            <AnimatePresence initial={false}>
              {openStates[index] && (
                <motion.ul
                  id={`details-${index}`}
                  className="text-gray-200 text-sm mt-2 space-y-2 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {role.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <BsCheckCircleFill className="text-green-400 mt-1 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
