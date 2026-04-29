import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import this
import SplitText from "gsap/SplitText";
import heroVideo from "@/assets/video/hero-video.mp4";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  ease: "power3.out",
  duration: 0.8,
  delay: 0.2,
};

interface HeroProps {
  play: boolean;
}

export default function Hero({ play }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const hasShrunk = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const div = container.querySelector(".div-reveal");
      const revealElements = container.querySelectorAll(".reveal-text");
      const button = container.querySelector(".reveal-button");
      const mm = gsap.matchMedia();

      const parentSplit = new SplitText(revealElements, {
        type: "lines",
        linesClass: "line-parent",
      });

      const childSplit = new SplitText(parentSplit.lines, {
        type: "lines",
        linesClass: "line-child",
      });

      gsap.set(parentSplit.lines, { overflow: "hidden" });
      gsap.set(childSplit.lines, { display: "block", yPercent: -120 });
      gsap.set(div, { yPercent: -120 });
      gsap.set(button, { opacity: 0 });

      // 1. Entrance Timeline
      tl.current = gsap
        .timeline({ paused: true })
        .to(div, {
          yPercent: 0,
          ease: CONFIG.ease,
          duration: CONFIG.duration,
          delay: CONFIG.delay,
        })
        .to(
          childSplit.lines,
          {
            yPercent: 0,
            duration: CONFIG.duration,
            ease: CONFIG.ease,
            delay: CONFIG.delay,
          },
          "<",
        )
        .to(
          button,
          {
            opacity: 1,
            duration: CONFIG.duration / 2,
            ease: CONFIG.ease,
          },
          "<",
        );

      // 2. Separate the Shrink Animation
      const triggerShrink = () => {
        if (hasShrunk.current) return;
        hasShrunk.current = true;

        mm.add(
          {
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
          },
          (context) => {
            const { isDesktop } = context.conditions as any;

            gsap.to(container, {
              // Shrinks to 90vh on desktop, stays 60vh on mobile
              height: isDesktop ? "90vh" : "60vh",
              duration: CONFIG.duration * 1.6,
              ease: "power3.inOut",
              overwrite: "auto",
            });
          },
        );        
      };

      // 3. ScrollTrigger to catch manual scrolling
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          onEnter: triggerShrink,
        });

      // 4. The 8-second fallback
      const timer = setTimeout(triggerShrink, 8000);

      return () => {
        clearTimeout(timer);
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [play] },
  );

  useEffect(() => {
    if (play && tl.current) {
      tl.current.play();
    }
  }, [play]);

  return (
    <section
      ref={containerRef}
      className="h-[60vh] md:h-[101vh] w-full overflow-hidden"
    >
      <div
        className="flex flex-col h-[60vh] md:h-[101vh] justify-center
          items-center relative"
      >
        <Navbar />
        <div
          className="overflow-hidden w-4/5 h-3/10 sm:w-3/5 sm:h-3/5 md:h-7/20
            lg:w-2/5 lg:h-2/5 rounded-md z-10"
        >
          <div className="overflow-hidden rounded-md div-reveal w-full h-full">
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-[8vw] font-bold shrink-0 reveal-text">
          David Gilchrist
        </div>
      </div>
    </section>
  );
}
