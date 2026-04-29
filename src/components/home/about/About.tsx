import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import CurveDividerLeft from "../shared/CurveDividerLeft";
import AboutLine from "./AboutLine";

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
      <div className="p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start relative -mt-1">
        <div className="flex flex-row w-full gap-2 md:gap-3 lg:gap-4">
          <div
            className="grid grid-cols-1 divide-y-2 divide-black rounded-lg
              border-2 border-black w-full sm:w-3/4 bg-white overflow-hidden"
          >
            {aboutTexts.map((text, index) => (
              <AboutLine key={index} {...text} />
            ))}
          </div>
          <div className="flex justify-end items-center sm:w-1/4 w-0 invisible sm:visible">
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
