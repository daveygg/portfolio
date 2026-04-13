import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import CurveDividerLeft from "./CurveDividerLeft";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef?.current;
      if (!container) return;

      const paragraphs = gsap.utils.toArray(".animate-sweep-text");
      const splits: SplitText[] = [];

      paragraphs.forEach((p : any) => {
        const split = new SplitText(p, {
          type: "lines",
          linesClass: "split-line",
        });

        splits.push(split);

        // Apply gradient to EACH line individually
        split.lines.forEach((line) => {
          gsap.set(line, {
            backgroundImage: "linear-gradient(to right, #000 50%, #9ca3af 50%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          });
        });

        // Create timeline (this is key)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: p,
            start: 'top 95%',
            endTrigger: p,
            end: 'bottom 45%',
            scrub: true,
          },
        });

        // Animate each line separately
        tl.to(split.lines, {
          backgroundPosition: "0% 0%",
          stagger: 0.3,
          ease: "none",
        });
      });

      return () => splits.forEach((split) => split.revert());
    },
    { scope: containerRef },
  );

  const aboutTexts = [
    {
      emoji: "❤️",
      text: (
        <>
          I've been lucky enough to have been a developer for the last 3 years and counting.
        </>
      ),
      shortText: <>Lucky</>,
    },
    {
      emoji: "🛠️",
      text: (
        <>
          My skillset is diverse, allowing me to create solutions from scratch,
          carefully architect them and then ship it with a beautiful UI. I work in back-end, front-end, integrations and everything in between.
        </>
      ),
      shortText: <>Diverse</>,
    },
    {
      emoji: "🚀",
      text: (
        <>
          Development enables me to pursue mastery of a craft that I love. I
          enjoy staying on top of the latest and best ways of doing things.
          Focusing on the details, to provide quality work.
        </>
      ),
      shortText: <>Pursuing mastery</>,
    },
    {
      emoji: "😊",
      text: (
        <>
          Outside of programming, I'm a keen downhill
          mountainbiker, and a lover of travelling, getting outside and enjoying
          past times with my friends and family.
        </>
      ),
      shortText: <>Not just a developer</>,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ backgroundColor: "#58BB90" }}
    >
      <CurveDividerLeft title="About" fillColor="#58BB90" bgColor="#FFFFFF" />

      {/* Content */}
      <div className="p-16 flex flex-col items-start relative">
        <div className="flex flex-row w-full gap-4">
          <div
            className="grid grid-cols-1 divide-y-2 divide-black rounded-lg
              border-2 border-black w-3/4 bg-white overflow-hidden"
          >
            {aboutTexts.map((text, index) => (
              <AboutLine key={index} {...text} />
            ))}
          </div>
          <div className="flex justify-end items-center w-1/4">
            <img
              src="images/me/me.jpg"
              alt="David Gilchrist"
              className="rounded-lg border-2 border-black w-auto h-full
                object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface AboutLineProps {
  emoji: string;
  shortText: React.ReactNode;
  text: React.ReactNode;
}

function AboutLine({ emoji, text, shortText }: AboutLineProps) {
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
      // Added h-full and removed overflow-hidden here, it goes inside
      className="flex items-center p-4 relative cursor-default h-full"
    >
      {/* BASE LAYER: Large Short Text + Emoji */}
      <div className="flex items-center w-full h-full justify-between">
        <p
          className="animate-sweep-text text-6xl font-bold text-muted-foreground
            uppercase w-full"
        >
          {shortText}
        </p>
        <p className="text-4xl ml-4">{emoji}</p>
      </div>

      {/* REVEAL LAYER: Full Description */}
      <div
        ref={revealRef}
        className="absolute -inset-[1px] bg-neutral-800 p-4 flex items-center
          justify-between z-10 overflow-hidden"
      >
        <p className="text-lg w-full text-white font-medium">{text}</p>
        <p className="text-4xl ml-4">{emoji}</p>
      </div>
    </div>
  );
}
