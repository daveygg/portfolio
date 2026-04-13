import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import NavSection, { type NavSectionProps } from "./NavSection";

// Asset imports
import linkedInImg from "@/assets/images/logos/InBug-White.png";
import githubImg from "@/assets/icons/GitHub_Invertocat_White.svg";

const navSections: NavSectionProps[] = [
  { mainText: "Based", subText: "Cambridge, UK" },
  { mainText: "Developing at", subText: "Hexcel" },
  { mainText: "Currently", subText: "Available for hire" },
];

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleMenu = contextSafe(() => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      gsap.to(".social-pop", {
        yPercent: 120,
        xPercent: (i) => (i === 0 ? -120 : i === 2 ? 120 : 0),
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.05,
      });
    } else {
      gsap.to(".social-pop", {
        yPercent: 0,
        xPercent: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-between items-center absolute top-0 z-50 py-4 px-16"
    >
      {/* 1. Nav Sections remain direct children to respect justify-between */}
      {navSections.map((sec, idx) => (
        <NavSection key={idx} {...sec} />
      ))}

      {/* 2. The Button Unit - Treated as a single child by the parent flexbox */}
      <div className="relative flex items-center justify-center">
        {/* Hidden Icons */}
        <Button asChild size="icon" className="social-pop absolute opacity-0 z-0 rounded-full border-white/20 bg-slate-900">
          <a href="https://www.linkedin.com/in/david-gilchrist-61b158301/" target="_blank" rel="noreferrer">
            <img src={linkedInImg} alt="LinkedIn" className="w-5 h-5" />
          </a>
        </Button>

        <Button asChild size="icon" className="social-pop absolute opacity-0 z-0 rounded-full border-white/20 bg-slate-900">
          <a href="mailto:david.gilchrist@outlook.com">
            <SendHorizontal className="w-5 h-5 text-white" />
          </a>
        </Button>

        <Button asChild size="icon" className="social-pop absolute opacity-0 z-0 rounded-full border-white/20 bg-slate-900">
          <a href="https://github.com/daveygg" target="_blank" rel="noreferrer">
            <img src={githubImg} alt="GitHub" className="w-5 h-5" />
          </a>
        </Button>

        {/* Main Button */}
        <Button
          onClick={toggleMenu}
          className="relative z-10 rounded-full hover:cursor-pointer px-4 py-6 text-2xl"
        >
          Get in touch
        </Button>
      </div>
    </div>
  );
}