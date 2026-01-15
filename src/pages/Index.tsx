import { useState, useEffect } from "react";
import HeroScene from "@/components/3d/HeroScene";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import MatrixRain from "@/components/MatrixRain";
import FloatingElements from "@/components/3d/FloatingElements";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <CustomCursor />

      {/* Matrix rain background - always visible */}
      <MatrixRain />
      
      {/* Floating code elements */}
      <FloatingElements />
      
      {/* 3D Scene - only in hero area, with pointer-events-none */}
      {isLoaded && <HeroScene />}

      {/* Main content - highest z-index for proper interaction */}
      <div className="relative z-[20]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
