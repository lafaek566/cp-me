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

const projects = [
  {
    title: "Full Stack Developer",
    description: "Sistem pemesanan Sesuai Keinginanmu.",
    image:
      "https://i.pinimg.com/736x/4b/c8/a1/4bc8a1873b16f428b6c209a09bdd9165.jpg",
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
      "https://i.pinimg.com/736x/4b/87/0f/4b870fa5bb0a0bff0f872559d1c8628d.jpg",
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
  {
    title: "Video Editing Projects",
    description:
      "Contoh hasil editing video untuk keperluan promosi, branding, dan sosial media.",
    image:
      "https://i.pinimg.com/736x/59/2a/a3/592aa3485b737bb07f0a52c09232dcbd.jpg",
    tags: ["TikTok", "Video Editing", "After Effects", "Adobe Premiere"],
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
    ],
  },
];

export default projects;
