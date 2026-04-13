import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText'; // Ensure you have the GSAP bonus plugin

gsap.registerPlugin(useGSAP, SplitText);

interface TextRevealProps {
  children: React.ReactNode;
  play: boolean;
  ease?: string;
  yPercent?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

const TextReveal = ({
  children,
  play,
  ease = "power3.out",
  yPercent = -120,
  delay = 0,
  duration = 1,
  className = ""
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Split the text
    const parentSplit = new SplitText(containerRef.current, {
      type: "lines",
      linesClass: "line-parent",
    });

    const childSplit = new SplitText(parentSplit.lines, {
      type: "lines",
      linesClass: "line-child",
    });

    // 2. Set initial styles
    gsap.set(parentSplit.lines, { overflow: "hidden" });
    gsap.set(childSplit.lines, { 
      display: "block", 
      yPercent: yPercent 
    });

    // 3. Create the timeline
    tl.current = gsap.timeline({ paused: true })
      .to(childSplit.lines, {
        yPercent: 0,
        duration: duration,
        ease: ease,
        delay: delay,
        stagger: 0.1 // Optional: adds a nice sequential feel to lines
      });

    // Cleanup function to revert splits when component unmounts
    return () => {
      childSplit.revert();
      parentSplit.revert();
    };
  }, { scope: containerRef });

  // 4. Respond to the 'play' prop
  useGSAP(() => {
    if (play && tl.current) {
      tl.current.play();
    } else if (!play && tl.current) {
      tl.current.reverse();
    }
  }, [play]);

  return (
    <div ref={containerRef} className={`reveal-container ${className}`}>
      {children}
    </div>
  );
};

export default TextReveal;