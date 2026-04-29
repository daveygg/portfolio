import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";

interface AboutLineProps {
  emoji: string;
  shortText: React.ReactNode;
  text: React.ReactNode;
}

export default function AboutLine({ emoji, text, shortText }: AboutLineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // 1. Initial State: Set the clip-path to a flat line in the center
  useGSAP(
    () => {
      gsap.set(revealRef.current, {
        clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
      });
    },
    { scope },
  );

  // 2. Hover Animation: Expand/Collapse the clip-path
  useGSAP(
    () => {
      gsap.to(revealRef.current, {
        clipPath: isHovered
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
        duration: 0.6,
        ease: "expo2.InOut",
        overwrite: "auto",
        delay: 0.15
      });
    },
    { dependencies: [isHovered], scope },
  );

  return (
    <div
      ref={scope}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center p-4 relative cursor-default h-full"
    >
      {/* BASE LAYER: Large Short Text + Emoji */}
      <div className="flex items-center w-full h-full justify-between">
        <p
          className="animate-sweep-text text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-muted-foreground
            uppercase w-full p-4"
        >
          {shortText}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl ml-2 md:ml-4">{emoji}</p>
      </div>

      {/* REVEAL LAYER: Full Description */}
      <div
        ref={revealRef}
        className="absolute -inset-px bg-neutral-800 p-4 flex items-center
          justify-between z-10 overflow-hidden"
      >
        <p className="text-xs sm:text-md md:text-lg w-full text-white font-medium">{text}</p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl ml-2 md:ml-4">{emoji}</p>
      </div>
    </div>
  );
}
