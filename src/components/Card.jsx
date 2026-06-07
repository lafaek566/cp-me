import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Paintbrush2, Search } from "lucide-react";
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
    initial={{ opacity: 0, y: 30, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -30, scale: 0.85 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    whileHover={{
      scale: 1.12,
      y: -10,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.6)",
    }}
    whileTap={{ scale: 0.92 }}
    className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-0 text-sm text-gray-800 dark:text-white flex flex-col items-center cursor-pointer transition-all hover:shadow-2xl border-2 border-blue-200 dark:border-blue-400 overflow-hidden"
    onClick={() => onClick(detail)}
    title="🔥 Klik untuk lihat detail proyek"
  >
    {/* Image Container - Sangat Tinggi */}
    <div className="relative w-full aspect-[1/2.5] overflow-hidden bg-gray-900">
      <motion.img
        src={detail.image}
        alt="detail"
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Content Container - Jauh Lebih Besar */}
    <div className="w-full px-6 py-8 flex flex-col items-center flex-grow justify-center gap-5">
      <p className="text-center font-bold text-base line-clamp-2 leading-snug text-white dark:text-white">
        {detail.description}
      </p>
      <motion.span 
        animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-lg text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-2 hover:scale-110 transition-transform"
      >
        ✨ Klik →
      </motion.span>
    </div>
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
  detailsExpanded,
  onToggleDetailsExpand,
  projectIndex,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 3;
  const shouldShowSeeMore = details.length > ITEMS_PER_PAGE;
  const displayedDetails = detailsExpanded ? details : details.slice(0, ITEMS_PER_PAGE);
  const remainingItems = details.length - ITEMS_PER_PAGE;

  const handleDirectLink = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (details.length === 0 && demoLink) {
        window.open(demoLink, '_blank');
      } else if (details.length === 0 && codeLink) {
        window.open(codeLink, '_blank');
      }
      setIsLoading(false);
    }, 800);
  };
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

        <motion.button
          onClick={() => {
            if (details.length === 0) {
              handleDirectLink();
            } else {
              onToggle();
            }
          }}
          whileHover={{
            scale: 1.12,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.6)",
          }}
          whileTap={{ scale: 0.92 }}
          animate={!isExpanded && details.length > 0 ? { 
            y: [0, -5, 0],
            boxShadow: [
              "0 10px 20px rgba(59, 130, 246, 0.3)",
              "0 20px 40px rgba(59, 130, 246, 0.6)",
              "0 10px 20px rgba(59, 130, 246, 0.3)"
            ]
          } : {}}
          transition={{
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          }}
          className={`mt-6 w-full inline-flex items-center justify-center gap-3 text-base md:text-lg font-bold px-8 py-4 rounded-xl transition duration-300 border-2 shadow-2xl transform ${
            isExpanded && details.length > 0
              ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white border-red-600 hover:shadow-red-600/60"
              : "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white border-blue-400 hover:shadow-blue-500/60"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>
            {details.length === 0 
              ? (demoLink ? "Buka Demo" : "Lihat Proyek")
              : (isExpanded ? "Sembunyikan Detail" : "Lihat Detail Proyek")
            }
          </span>
          {!isExpanded && details.length > 0 && <span className="ml-2 animate-bounce">→</span>}
        </motion.button>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-600 border-t-blue-600 dark:border-t-cyan-400"></div>
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Membuka proyek...
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-700 dark:via-gray-650 dark:to-gray-600 rounded-xl border border-blue-300 dark:border-blue-500 shadow-lg"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayedDetails.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <DetailCard detail={detail} onClick={onDetailClick} />
                  </motion.div>
                ))}
              </div>

              {/* See More Button */}
              {shouldShowSeeMore && (
                <motion.button
                  onClick={() => onToggleDetailsExpand(projectIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {detailsExpanded ? `← Sembunyikan (${remainingItems} item lainnya)` : `Lihat Lebih Banyak (+${remainingItems})`}
                </motion.button>
              )}
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
  const [expandedDetailsIndex, setExpandedDetailsIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
    setExpandedDetailsIndex(null); // Reset details expansion
  };

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    setModalOpen(true);
  };

  const toggleDetailsExpand = (index) => {
    setExpandedDetailsIndex((prev) => (prev === index ? null : index));
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <PortfolioCard
                {...project}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
                onDetailClick={handleDetailClick}
                highlighted={project.title === "Full Stack Developer"}
                detailsExpanded={expandedDetailsIndex === index}
                onToggleDetailsExpand={toggleDetailsExpand}
                projectIndex={index}
              />
            </motion.div>
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
