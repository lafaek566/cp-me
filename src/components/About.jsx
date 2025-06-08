import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPaintBrush, FaVideo } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16 flex flex-col items-center"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Tentang Kami
      </motion.h2>

      <motion.p
        className="text-center text-gray-300 mb-10 max-w-3xl px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        èlv Service mengedepankan kreativitas dan dedikasi untuk memberikan
        solusi digital terbaik. Dengan keahlian di bidang pemrograman, desain,
        dan videografi, kami siap mewujudkan ide Anda menjadi kenyataan.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 flex flex-col text-white border backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl ${
              index === 2
                ? "bg-orange-900/20 border-orange-500"
                : "bg-white/5 border-gray-700"
            }`}
          >
            <div className="flex justify-center mb-4">{role.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {role.title}
            </h3>
            <p className="text-gray-300 text-sm text-center mb-4">
              {role.description}
            </p>

            <button
              onClick={() => toggleItem(index)}
              className="flex items-center justify-center text-sm text-orange-400 hover:text-orange-300 hover:underline transition mb-2"
              aria-expanded={openIndex === index}
              aria-controls={`details-${index}`}
            >
              {openIndex === index ? (
                <>
                  Tutup Detail <FiChevronUp className="ml-1" />
                </>
              ) : (
                <>
                  Lihat Detail <FiChevronDown className="ml-1" />
                </>
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.ul
                  id={`details-${index}`}
                  className="text-gray-200 text-sm mt-2 pl-1 pr-2 space-y-2 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
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
