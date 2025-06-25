import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Paintbrush2 } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaFilm,
  FaVideo,
} from "react-icons/fa";
import {
  SiMysql,
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiJavascript,
  SiCanva,
} from "react-icons/si";
import projects from "../data/projectData";

const tagIconMap = {
  JavaScript: <SiJavascript className="text-yellow-400" />,
  React: <FaReact className="text-cyan-400" />,
  "Node.js": <FaNodeJs className="text-green-500" />,
  Express: <FaNodeJs className="text-gray-300" />,
  PHP: <FaPhp className="text-indigo-400" />,
  Python: <FaPython className="text-blue-400" />,
  MySQL: <SiMysql className="text-blue-500" />,
  Photoshop: <FaVideo className="text-blue-400" />,
  Illustrator: <SiAdobeillustrator className="text-orange-400" />,
  Filmora: <FaFilm className="text-red-400" />,
  Canva: <SiCanva className="text-blue-300" />,
  "Adobe Premiere": <FaVideo className="text-pink-400" />,
  "After Effects": <SiAdobeaftereffects className="text-purple-400" />,
  TikTok: <FaVideo className="text-black" />,
};

const Modal = ({ isOpen, onClose, detail }) => {
  if (!isOpen || !detail) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>
        <img
          src={detail.image}
          alt="detail"
          className="w-full h-52 object-cover rounded mb-4"
        />
        <p className="text-gray-800 dark:text-white text-sm whitespace-pre-line">
          {detail.description}
        </p>
        {detail.detailLink && (
          <a
            href={detail.detailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline text-xs"
          >
            Buka link proyek
          </a>
        )}
      </div>
    </div>
  );
};

const getCategoryIcon = (category, isActive) => {
  const base = "w-6 h-6 transition-colors duration-300";
  switch (category) {
    case "Programming":
      return (
        <Code2
          className={`${base} ${isActive ? "text-blue-600" : "text-blue-400"}`}
        />
      );
    case "Creative Media":
      return (
        <Paintbrush2
          className={`${base} ${isActive ? "text-pink-600" : "text-pink-400"}`}
        />
      );
    default:
      return null;
  }
};

const DetailCard = ({ detail, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-3 text-xs text-gray-800 dark:text-white flex flex-col items-center cursor-pointer transition"
    onClick={() => onClick(detail)}
    title="Klik untuk lihat detail proyek"
  >
    <img
      src={detail.image}
      alt="detail"
      className="w-full aspect-[4/3] object-cover rounded mb-2"
      loading="lazy"
    />
    <p className="text-center">{detail.description}</p>
  </motion.div>
);

const PortfolioCard = ({
  title,
  description,
  image,
  tags = [],
  demoLink,
  codeLink,
  category,
  details = [],
  status,
  location,
  highlighted = false,
  isExpanded,
  onToggle,
  onDetailClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: highlighted ? 1.03 : 1.01,
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`w-full max-w-full sm:max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mx-auto cursor-pointer transition-all duration-300 ${
        highlighted ? "ring-4 ring-blue-400 scale-[1.01]" : ""
      }`}
    >
      <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 xl:h-80 2xl:h-96 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isExpanded ? 360 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {getCategoryIcon(category, isExpanded)}
          </motion.div>
          <h3
            className={`text-lg font-semibold ${
              highlighted
                ? "text-blue-600 dark:text-blue-400 animate-pulse"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>📍 {location || "Indonesia"}</span>
        </div>

        {status && (
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              status === "Completed"
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                : status === "Ongoing"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {status}
          </span>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.15 }}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 text-xs rounded-full shadow-sm"
              title={tag}
            >
              {tagIconMap[tag] || <Code2 className="text-gray-400" />}
              <span className="hidden sm:inline">{tag}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          {demoLink && (
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow"
            >
              Demo
            </motion.a>
          )}
          {codeLink && (
            <motion.a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-xs text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg shadow"
            >
              Code
            </motion.a>
          )}
        </div>

        <button
          onClick={onToggle}
          className={`mt-4 inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition duration-300 border border-blue-400 shadow-sm hover:shadow-md ${
            isExpanded
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          👁️ {isExpanded ? "Sembunyikan Detail" : "Lihat Detail"}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {details.map((detail, idx) => (
                <DetailCard key={idx} detail={detail} onClick={onDetailClick} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    setModalOpen(true);
  };

  return (
    <section
      id="portfolio"
      className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10"
        >
          Proyek & Portofolio
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <PortfolioCard
              key={index}
              {...project}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
              onDetailClick={handleDetailClick}
              highlighted={project.title === "Full Stack Developer"}
            />
          ))}
        </motion.div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        detail={selectedDetail}
      />
    </section>
  );
}
