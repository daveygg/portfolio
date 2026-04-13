import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skillset from "@/components/home/Skillset";
import Projects from "@/components/home/Projects";
import LoadingScreen from "@/components/home/LoadingScreen";
import Contact from "@/components/home/Contact";

const CONFIG = {
  counterDuration: 2,
};

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<LenisRef | null>(null);

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasLoadedBefore");
    }
    return true;
  });

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.lenis?.stop();
  }, []);

  // unlock scroll triggers after loading screen
  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasLoadedBefore", "true");
    setIsLoading(false);
    lenisRef.current?.lenis?.start();
    ScrollTrigger.refresh();
  };

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      {isLoading && (
        <LoadingScreen 
          duration={CONFIG.counterDuration} 
          onComplete={handleLoadingComplete} 
        />
      )}
      <main className="relative w-full flex flex-col">
        {/* Main Content */}
        <Hero play={!isLoading} />
        <About />
        <Skillset />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
