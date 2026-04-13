import socialMediaImg from "@/assets/images/project-images/x.png";
import underConstructionImg from "@/assets/images/project-images/under-construction.jpg";
import CurveDividerLeft from "./CurveDividerLeft";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import arrowRightImg from "@/assets/images/icons/arrow-right.png";

gsap.registerPlugin(ScrollTrigger);

type Suit = "hearts" | "diamonds" | "clubs" | "spades";

const projects = [
  {
    title: "HobbyR",
    description: "A social media site for hobbies.",
    image: socialMediaImg,
    link: "./socialMedia",
    suit: "spades" as Suit,
    rank: "A",
  },
  {
    title: "Under Construction",
    description: "I've got a couple of projects in mind that I'm working on.",
    image: underConstructionImg,
    suit: "hearts" as Suit,
    rank: "K",
  },
];

const CONFIG = {
  movementInPercent: 50,
  rotation: 10,
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScrollAnimating, setIsScrollAnimating] = useState(false);
  const [isClickAnimating, setIsClickAnimating] = useState(false);
  const activeIndexRef = useRef<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("isScrollAnimating changed to:", isScrollAnimating);
  }, [isScrollAnimating]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    console.log("active index changed to:", activeIndex);
  }, [activeIndex]);

  const { contextSafe } = useGSAP({ scope: cardContainerRef });

  const reEnableTriggers = contextSafe(() => {
    console.log(
      "Re-enable function called. Ref Index:",
      activeIndexRef.current,
    );
    if (activeIndexRef.current !== null) return;
    console.log("Re-enabling ScrollTriggers for project cards");
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.id?.startsWith("project-card-")) {
        st.enable();
      }
    });
    ScrollTrigger.refresh();
  });

  const closeActiveCard = contextSafe((indexToClose: number | null) => {
    console.log(
      "Attempting to close active card. Index to close:",
      indexToClose,
    );
    if (indexToClose === null) return;
    const card = cardRefs.current[indexToClose];
    if (!card) return; // Guard clause

    // 1. Create the scoped selector for this specific card
    const q = gsap.utils.selector(card);
    const otherCards = gsap.utils
      .toArray<HTMLElement>(".card")
      .filter((_, i) => i !== indexToClose);

    const cardCount = projects.length;
    const leftMostX = (-CONFIG.movementInPercent * (cardCount - 1)) / 2;
    const leftMostRot = (-CONFIG.rotation * (cardCount - 1)) / 2;
    const originalX = leftMostX + indexToClose * CONFIG.movementInPercent;
    const originalRot = leftMostRot + indexToClose * CONFIG.rotation;

    const tl = gsap.timeline();

    tl.to(
      q(".project-button"),
      {
        opacity: 0,
        duration: 0.2,
        pointerEvents: "none",
        cursor: "auto",
        ease: "power2.Out",
      },
      0,
    );

    if (indexToClose !== 0) {
      tl.to(card, {
        xPercent: 100,
        yPercent: 0,
        rotation: originalRot / 2,
        duration: 0.3,
        ease: "easeOut",
      });
    }

    tl.set(card, { zIndex: cardCount - indexToClose })
      .to(card, {
        xPercent: originalX,
        yPercent: 0,
        rotation: originalRot,
        duration: 0.4,
        ease: "easeOut",
      })
      .to(
        otherCards,
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "easeInOut",
        },
        0,
      );

    return tl;
  });

  // contextSafe allows us to create animations outside the initial load
  const handleClick = contextSafe((event: React.MouseEvent, index: number) => {
    if (isScrollAnimating || isClickAnimating) return;

    hasInteractedRef.current = true;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.3,
      pointerEvents: "none",
    });

    setIsClickAnimating(true);

    const card = event.currentTarget;

    const q = gsap.utils.selector(card);

    const tl = gsap.timeline({
      onStart: () => setActiveIndex(index),
      onComplete: () => {
        setIsClickAnimating(false);
        console.log("Click animation complete.");
      },
    });

    console.log("Card clicked. Index:", index, "Active Index:", activeIndex);
    if (activeIndex !== null && activeIndex !== index) {
      var closeTimeline = closeActiveCard(activeIndex);
      if (closeTimeline !== undefined) {
        tl.add(closeTimeline);
      }
    }

    const otherCards = gsap.utils
      .toArray<HTMLElement>(".card")
      .filter((c) => c !== card);
    // Get the current rotation to calculate "half"
    const currentRotation = gsap.getProperty(card, "rotation") as number;

    if (index !== 0) {
      tl.to(card, {
        xPercent: 75,
        rotation: currentRotation / 2,
        duration: 0.3,
        ease: "easeIn",
      });
    }

    tl.to(
      otherCards,
      {
        scale: 0.8, // Shrink background cards
        opacity: 0.7,
        duration: 0.4,
        ease: "easeInOut",
      },
      0,
    )
      .set(card, { zIndex: 100 }) // Move to front mid-animation
      .to(card, {
        xPercent: 0,
        yPercent: -10,
        duration: 0.4,
        ease: "easeIn",
        rotation: 0,
      })
      .to(
        q(".project-button"),
        {
          opacity: 1,
          duration: 0.3,
          pointerEvents: "auto",
          cursor: "pointer",
          ease: "power2.out",
        }
      );

    setActiveIndex(index);

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.id?.startsWith("project-card-")) {
        st.disable(false); // false keeps the current visual state
      }
    });
  });

  useGSAP(
    () => {
      const cardContainer = cardContainerRef?.current;
      if (!cardContainer) return;

      const cards = gsap.utils.toArray(".card");
      const cardCount = cards.length;
      const leftMostCardXPercent =
        (-CONFIG.movementInPercent * (cardCount - 1)) / 2;
      const leftMostCardRotation = (-CONFIG.rotation * (cardCount - 1)) / 2;

      cards.forEach((card: any, index: number) => {
        const zIndex = cardCount - index;
        gsap.set(card, { zIndex: zIndex });

        const movement =
          leftMostCardXPercent + index * CONFIG.movementInPercent;
        const rotation = leftMostCardRotation + index * CONFIG.rotation;

        const tl = gsap.timeline({
          scrollTrigger: {
            id: `project-card-${index}`,
            trigger: cardContainer,
            start: "top bottom",
            end: "top 50%",
            scrub: true,
            onToggle: (self) => setIsScrollAnimating(self.isActive),
            onLeave: () => {
              if (
                index === 0 &&
                activeIndexRef.current === null &&
                !hasInteractedRef.current
              ) {
                gsap.to(indicatorRef.current, { opacity: 1, duration: 0.5 });
              }
            },
          },
        });

        tl.to(card, {
          xPercent: movement,
          rotate: rotation,
        });
      });
    },
    { dependencies: [], scope: cardContainerRef },
  );

  return (
    <section className="relative w-full" style={{ backgroundColor: "#9DD5D8" }}>
      {activeIndex !== null && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => {
            if (isClickAnimating) return;

            const tl = closeActiveCard(activeIndex);
            if (tl) {
              tl.eventCallback("onStart", () => {
                setIsClickAnimating(true);
              });

              tl.eventCallback("onComplete", () => {
                setActiveIndex(null);
                activeIndexRef.current = null;
                reEnableTriggers();
                setIsClickAnimating(false);
              });
            }
          }}
        />
      )}
      <div
        className="absolute left-[25%] top-[33.33%] -translate-x-1/2
          -translate-y-1/2 flex opacity-0"
        ref={indicatorRef}
      >
        <p>Click Me</p>
        <img
          src={arrowRightImg}
          alt="Arrow pointing right"
          className="w-6 h-6 ml-2"
        />
      </div>
      <CurveDividerLeft
        bgColor="#FFFFFF"
        title="Projects"
        fillColor="#9DD5D8"
      />
      <div
        ref={cardContainerRef}
        className="flex gap-8 px-16 py-24 justify-center"
      >
        <div className="grid grid-cols-1 grid-rows-1 w-1/4">
          {projects.map((project, index) => (
            <ProjectCard
              ref={(el) => {
                cardRefs.current[index] = el;
              }} // Capture refs
              key={index}
              index={index}
              onClick={(e) => {
                if (activeIndex === index) return;
                handleClick(e, index);
              }}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
