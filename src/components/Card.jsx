import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Paintbrush2 } from "lucide-react";

// Gambar aset
import dbImage from "../assets/db.jpg";
import cpHomeImage from "../assets/cp home.jpg";
import homeImage from "../assets/home.jpg";
import homecb from "../assets/cb.jpg";
import db1 from "../assets/1.png";
import db2 from "../assets/2.png";
import db3 from "../assets/3.png";
import db4 from "../assets/4.png";
import v1 from "../assets/v1.jpg";
import v2 from "../assets/v2.jpg";
import v3 from "../assets/v3.jpg";
import v4 from "../assets/v4.jpg";

// Modal
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
        <p className="text-gray-800 dark:text-white text-sm">
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
  highlighted = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const handleDetailClick = (detail) => {
    setSelectedDetail(detail);
    setModalOpen(true);
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
      className={`w-full max-w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mx-auto cursor-pointer transition-all duration-300 ${
        highlighted ? "ring-4 ring-blue-400 scale-[1.01]" : ""
      }`}
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-xl">
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

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </motion.span>
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
          onClick={() => setIsExpanded(!isExpanded)}
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
                <DetailCard
                  key={idx}
                  detail={detail}
                  onClick={handleDetailClick}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        detail={selectedDetail}
      />
    </motion.div>
  );
};

export default function Portfolio() {
  const projects = [
    {
      title: "Full Stack Developer",
      description: "Sistem pemesanan Sesuai Keinginanmu.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tags: [
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "PHP",
        "Python",
        "MySQL",
      ],
      demoLink: null,
      codeLink: "https://github.com/lafaek566",
      category: "Programming",
      details: [
        {
          image: homecb,
          description: "Halaman web Stream Video",
          detailLink: "https://cinemaindo.cam/",
        },
        {
          image: homeImage,
          description: "Website CoffeeShop",
          detailLink: "https://coffe-shop-ebon.vercel.app/",
        },
        {
          image: cpHomeImage,
          description: "Real Estate",
          detailLink: "https://real-estate-web.pages.dev/",
        },
        {
          image: dbImage,
          description: "Barbershop",
          detailLink: "https://github.com/lafaek566/Car",
        },
      ],
    },
    {
      title: "Creative Media Projects",
      description:
        "Desain grafis & video promosi kreatif untuk media sosial & branding.",
      image:
        "https://i.pinimg.com/736x/d9/5b/69/d95b69ff6e716b718d68759b0c4c82a1.jpg",
      tags: [
        "Adobe Premiere",
        "After Effects",
        "Illustrator",
        "Photoshop",
        "Filmora",
        "Canva",
      ],
      demoLink: null,
      codeLink: null,
      category: "Creative Media",
      details: [
        {
          image: v1,
          description: "Editing video dengan transisi halus",
          detailLink:
            "https://www.tiktok.com/@suarasoares/video/7505358372309437714",
        },
        {
          image: v2,
          description: "Fokus produk kosmetik & pencahayaan",
          detailLink:
            "https://www.tiktok.com/@suarasoares/video/7501663490139049224",
        },
        {
          image: v3,
          description: "Durasi efektif untuk kampanye sosial media",
          detailLink:
            "https://www.tiktok.com/@suarasoares/video/7461220448685100306",
        },
        {
          image: v4,
          description: "Musik latar yang mendukung visual promosi",
          detailLink:
            "https://www.tiktok.com/@suarasoares/video/7455885733253991698",
        },
        {
          image: db1,
          description: "Poster: Adobe Illustrator",
          detailLink: db1,
        },
        { image: db2, description: "Warna menarik perhatian", detailLink: db2 },
        { image: db3, description: "Tipografi konsisten", detailLink: db3 },
        {
          image: db4,
          description: "Komposisi poster profesional",
          detailLink: db4,
        },
      ],
    },
  ];

  return (
    <section
      id="portfolio"
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-48"
    >
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Pekerjaan
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <PortfolioCard
            key={index}
            {...project}
            highlighted={project.title === "Full Stack Developer"}
          />
        ))}
      </div>
    </section>
  );
}
