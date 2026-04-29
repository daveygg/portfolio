import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function CurlyArrow({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
  const path = pathRef.current;
  const head = headRef.current;
  const text = textRef.current;

  if (!path || !head || !text) return;

  const length = path.getTotalLength();
  const dash = 50;
  const gap = 20;
  const stepSize = dash + gap;
  const steps = Math.ceil(length / stepSize);

  // Create the dash pattern length using dash length and gap length, repeat based on the calculated amount of steps
  const pattern = Array(steps).fill(`${dash} ${gap}`).join(" ");
  
  gsap.set(path, {
    strokeDasharray: `${pattern} 0 ${length}`,
    strokeDashoffset: steps * stepSize,
  });

  gsap.set(head, { opacity: 0, scale: 0, transformOrigin: "center center" });
  gsap.set(text, { opacity: 0 });

  const tl = gsap.timeline();

  tl.to(path, {
    delay: 0.7,
    strokeDashoffset: 0,
    duration: 0.9,
    ease: `steps(${steps})`, // animate each dash in frame by frame progress is the calculated amount of steps
  })
  .to(head, {
    opacity: 1,
    scale: 1,
    duration: 0.1,
    ease: "none"
  })
  .to(text, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  });

}, { scope: container });

  return (
    <div ref={container} className={`flex items-end ${className}`}>
      <div className="w-3/4 flex justify-center items-center">
        <svg
        width="108" //original 216
        height="296" // original 393
        viewBox="0 0 216 393"
        fill="none">
          <path
            ref={pathRef}
            d="M13 5.80246C222 60.8025 282.333 197.729 105 224.802C-26 244.802 29.3627 18.6315 142 152.802C210 233.802 93 323.802 29 365.802"
            stroke="black"
            strokeWidth="12"
            strokeLinecap="butt"
          />
          <path
            ref={headRef}
            d="M28.5 337.802L53.1817 379.052H3.81828L28.5 337.802Z"
            fill="black"
          />
        </svg>        
        </div>
        <div ref={textRef} className="flex flex-col h-full w-1/2 items-end align-bottom justify-end pb-16">
          <p className="text-sm">more<br/>about me</p>
        </div>
    </div>
  );
}