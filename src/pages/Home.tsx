"use client";
import { CardCarousel } from "./components/CardCarousel";
import Chatbot from "./components/Chatbot";
import Footer from "../components/ui/Footer";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Hero />
      <CardCarousel />
      <Chatbot />
      <Testimonials />
      <Footer />
    </div>
  );
}
