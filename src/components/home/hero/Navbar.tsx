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

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/david-gilchrist-61b158301/",
    icon: <img src={linkedInImg} alt="LinkedIn" className="lg:size-5 md:size-4 sm:size-4 size-3" />,
  },
  {
    name: "Email",
    href: "mailto:david.gilchrist@outlook.com",
    icon: <SendHorizontal className="lg:size-5 md:size-4 sm:size-4 size-3 text-white" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/daveygg",
    icon: <img src={githubImg} alt="GitHub" className="lg:size-5 md:size-4 sm:size-4 size-3" />,
  },
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
      className="w-full flex justify-between items-center absolute top-0 z-50 py-4 lg:px-16 md:px-8 sm:px-4 px-2"
    >
      {/* Nav Sections */}
      {navSections.map((sec, idx) => (
        <NavSection key={idx} {...sec} />
      ))}

      {/* The Button */}
      <div className="relative flex items-center justify-center">
        {/* Hidden Icons */}
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            asChild
            size="icon"
            className="social-pop absolute opacity-0 z-0 rounded-full border-white/20 bg-slate-900"
          >
            <a href={link.href} target={link.href.startsWith('http') ? "_blank" : undefined} rel="noreferrer">
              {link.icon}
            </a>
          </Button>
        ))}

        {/* Main Button */}
        <Button
          onClick={toggleMenu}
          size="sm"
          className="reveal-button relative z-10 rounded-full hover:cursor-pointer lg:px-4 md:px-3 sm:px-2 px-1 lg:py-6 md:py-5 sm:py-4 py-3 lg:text-2xl md:text-xl sm:text-lg text-xs"
        >
          Get in touch
        </Button>
      </div>
    </div>
  );
}