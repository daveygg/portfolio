import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LOGOS = [
  "dotnet-logo.svg",
  "gsap-logo.svg",
  "motion-logo.svg",
  "react-logo.svg",
  "tailwindcss-logo.svg",
  "typescript-logo.svg",
  "azure-logo.svg",
  "tanstack-logo.svg",
  "figma-logo.svg",
  "docker-logo.svg",
  "javascript-logo.svg",
];

export default function LogosGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  // Track the loading of the images (DOM) to get the correct dimensions of the highlighting box
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = LOGOS.length;

  // Highlighting Box Measurement Function
  const positionHighlighter = useCallback(
    (targetItem: Element, index: number) => {
      if (!highlighterRef.current || !containerRef.current) return;

      setActiveIndex(index);

      const bounds = targetItem.getBoundingClientRect();
      const containerBounds = containerRef.current.getBoundingClientRect();
      const borderTop =
        parseFloat(getComputedStyle(containerRef.current).borderTopWidth) || 0;
      const borderLeft =
        parseFloat(getComputedStyle(containerRef.current).borderLeftWidth) || 0;

      gsap.to(highlighterRef.current, {
        width: bounds.width,
        height: bounds.height,
        x: bounds.left - containerBounds.left - borderLeft,
        y: bounds.top - containerBounds.top - borderTop,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [],
  );

  // Fade in
  useGSAP(
    () => {
      gsap.set(containerRef.current, { autoAlpha: 0 });
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: containerRef },
  );

  // On load, put the box on the first item
  useEffect(() => {
    if (loadedImages === totalImages) {
      const firstItem = containerRef.current?.querySelector(".logo-item");
      if (firstItem) {
        positionHighlighter(firstItem, 0);
      }
    }
  }, [loadedImages, totalImages, positionHighlighter]);

  // Position highlighter on mouse enter
  const { contextSafe } = useGSAP({ scope: containerRef });
  const handleMouseEnter = contextSafe(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const index = parseInt(target.getAttribute("data-index") || "0");
      positionHighlighter(target, index);
    },
  );

  return (
    <div
      ref={containerRef}
      className="row-start-4 col-span-4 border-2 border-black rounded-xl
        divide-y-2 divide-black flex flex-col bg-white h-fit overflow-hidden
        relative"
    >
      <div
        ref={highlighterRef}
        className="absolute top-0 left-0 bg-neutral-900 pointer-events-none z-0"
      />

      {/* Top Row */}
      <div className="flex divide-x-2 divide-black z-10">
        {LOGOS.filter((_, i) => i % 2 === 0).map((logo, localIndex) => {
            const actualIndex = localIndex * 2;
            return (
                <LogoItem 
                    key={logo} 
                    logo={logo} 
                    index={actualIndex}
                    isActive={activeIndex === actualIndex}
                    onEnter={handleMouseEnter} 
                    onLoad={() => setLoadedImages(prev => prev + 1)} 
                />
            );
        })}
      </div>

      {/* Bottom Row */}
      <div className="flex divide-x-2 divide-black z-10">
        {LOGOS.filter((_, i) => i % 2 === 1).map((logo, localIndex) => {
            const actualIndex = localIndex * 2 + 1;
            return (
                <LogoItem 
                    key={logo} 
                    logo={logo} 
                    index={actualIndex}
                    isActive={activeIndex === actualIndex}
                    onEnter={handleMouseEnter} 
                    onLoad={() => setLoadedImages(prev => prev + 1)} 
                />
            );
        })}
      </div>
    </div>
  );
}

interface LogoItemProps {
    logo: string;
    index: number;
    isActive: boolean;
    onEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    onLoad: () => void;
}

function LogoItem({ logo, isActive, onEnter, onLoad, index }: LogoItemProps) {
  const name = logo.replace("-logo.svg", "");
  return (
    <div
      onMouseEnter={onEnter}
      className="logo-item flex-1 flex items-center justify-center p-4
        cursor-pointer group"
        data-index={index}
    >
      <img
        src={`/svg/logos/${logo}`}
        alt={name}
        onLoad={onLoad} // Trigger callback when image is ready
        className={`w-full h-full object-contain max-h-12 relative z-20 transition-all duration-300 
          ${isActive ? "invert brightness-200" : ""}`}
      />
    </div>
  );
}
