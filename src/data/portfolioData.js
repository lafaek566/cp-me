// src/data/projectsData.js
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

export const projects = [
  {
    title: "Full Stack Developer",
    description: "Sistem pemesanan Sesuai Keinginanmu.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tags: [
      "JavaScript",
      "Java",
      "React",
      "Node.js",
      "Express.js",
      "PHP",
      "Python",
      "MySQL",
      "PostgreSQL",
      "SQL Server",
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
        image: dbImage,
        description: "Website CoffeeShop",
        detailLink: "https://github.com/lafaek566/fullstack-BarberShop",
      },
      {
        image: cpHomeImage,
        description: "Real Estate",
        detailLink: "https://github.com/lafaek566/e-commerce",
      },
      {
        image: homeImage,
        description: "Product Coffee Shop",
        detailLink: "https://github.com/lafaek566/Car",
      },
    ],
  },
  {
    title: "Designer",
    description: "Poster digital Project",
    image:
      "https://i.pinimg.com/736x/4b/b7/f8/4bb7f81def271b7e9cefafdc81687728.jpg",
    tags: [
      "Illustrator",
      "Graphic Design",
      "Poster",
      "UX",
      "Canva",
      "Adobe Photoshop",
      "Corel Draw",
      "Blender",
    ],
    demoLink: null,
    codeLink: null,
    category: "Design Grafis",
    details: [
      {
        image: db1,
        description: "Menggunakan Adobe Illustrator",
        detailLink: db1,
      },
      {
        image: db2,
        description: "Pemilihan warna yang menarik perhatian",
        detailLink: db2,
      },
      {
        image: db3,
        description: "Desain tipografi yang kuat dan konsisten",
        detailLink: db3,
      },
      {
        image: db4,
        description: "Komposisi poster yang seimbang & profesional",
        detailLink: db4,
      },
    ],
  },
  {
    title: "Video Promosi Produk",
    description:
      "Video pendek 30 detik untuk promosi produk di TikTok, Instagram, YouTube, dan Facebook",
    image:
      "https://i.pinimg.com/736x/d9/5b/69/d95b69ff6e716b718d68759b0c4c82a1.jpg",
    tags: ["Adobe Premiere", "After Effects", "Canva", "Filmora"],
    demoLink: null,
    codeLink: null,
    category: "Video Maker",
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
    ],
  },
];
