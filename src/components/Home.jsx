import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Card from "./Card";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTopButton from "../components/ScrollToTopButton"; // sesuaikan path
import ChatWidget from "./ChatWidget";
import AnalyticsViewer from "./AnalyticsViewer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Card />
      <Contact />
      <Footer />
      <ScrollToTopButton />
      <ChatWidget />
      <AnalyticsViewer />
    </div>
  );
}
