import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  children: React.ReactNode;
  fadeIn?: boolean;
  delay?: number;
  className?: string;
}

export default function SplitReveal({
  children,
  fadeIn = false,
  delay = 0,
  className,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let ctx: gsap.Context | undefined;

      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          // Reset arrays
          linesRef.current = [];

          // Collect child elements to split
          const elements = Array.from(containerRef.current!.children) as HTMLElement[];

          const splits: SplitText[] = [];

          elements.forEach((el) => {
            const split = SplitText.create(el, {
              type: "lines",
              linesClass: "line",
              mask: "lines",
            });
            splits.push(split);
            linesRef.current.push(...(split.lines as HTMLElement[]));
          });

          // Initial state
          gsap.set(linesRef.current, {
            yPercent: 100,
            opacity: fadeIn ? 0 : 1,
          });

          // Timeline with ScrollTrigger for reversible scroll animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 20%",
              scrub: 0.3,
            },
          });

          tl.to(linesRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            delay,
            stagger: 0.1,
          });

          // Cleanup SplitText on unmount
          return () => {
            splits.forEach((split) => split.revert());
            ScrollTrigger.getAll().forEach((st) => st.kill());
            gsap.killTweensOf(linesRef.current);
          };
        }, containerRef);
      });

      return () => ctx?.revert();
    },
    {
      scope: containerRef,
      dependencies: [fadeIn, delay],
    }
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true" className={`relative ${className || ''}`}>
      {children}
    </div>
  );
}
