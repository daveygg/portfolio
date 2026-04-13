import { useRef, useState } from "react";
import TagList from "./TagList";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface SkillCardProps {
  title: string;
  shortDescription: string;
  ramblingDescription: string;
  tags: string[];
  colorClass: string;
  gridAreaClass: string;
  containerClass?: string;
}

export default function SkillCard({
  title,
  ramblingDescription,
  tags,
  colorClass,
  gridAreaClass,
  containerClass,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const baseContentRef = useRef<HTMLDivElement>(null);
  const ramblingRef = useRef<HTMLDivElement>(null);

  // The Slide Transition
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.inOut", delay: 0.05 }
    });

    if (isExpanded) {
      // 1. Slide base content down and out
      tl.to(baseContentRef.current, { yPercent: 150 }, 0);
      // 2. Slide rambling content down from top into view
      tl.to(ramblingRef.current, { yPercent: 0 }, 0);
    } else {
      tl.to(baseContentRef.current, { yPercent: 0 }, 0);
      tl.to(ramblingRef.current, { yPercent: -150 }, 0);
    }
  }, { dependencies: [isExpanded], scope: cardRef });

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`${gridAreaClass} ${colorClass} relative overflow-hidden rounded-xl flex flex-col
        text-left items-start w-full cursor-default border-2 border-black`}
    >
      {/* STATIONARY TITLE: This stays put */}
      <h3 className={`font-bold text-2xl relative z-30 w-full px-4 pt-4 ${colorClass}`}>{title}</h3>

      <div className="relative grow w-full">
        {/* BASE LAYER: Short Text and TagList */}
        <div 
          ref={baseContentRef}
          className="absolute inset-0 flex flex-col justify-end w-full h-full z-10 px-4"
        >
          {/* <p>{shortDescription}</p> */}
          <div className={containerClass || "w-full pb-4"}>
            <TagList tags={tags} />
          </div>
        </div>

        {/* RAMBLING LAYER: Appears centered in the space below title */}
        <div
          ref={ramblingRef}
          className="absolute inset-0 flex items-start justify-center z-20 pointer-events-none px-4 w-full"
        >
          <p className="text-sm md:text-base font-medium text-start w-full">
            {ramblingDescription}
          </p>
        </div>
      </div>
    </div>
  );
}