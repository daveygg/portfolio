import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingProps {
  duration: number;
  onComplete: () => void;
}

export default function LoadingScreen({ duration, onComplete }: LoadingProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Instant disappearance
        gsap.set(containerRef.current, { 
          display: "none" 
        });
        setIsVisible(false);
        onComplete(); // Unlock scroll in parent
      },
    });

    tl.to(counterRef.current, {
      value: 100,
      duration: duration,
      ease: "power1.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterRef.current.value));
      },
    });
  }, { scope: containerRef });

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
    >
      <span className="text-xl font-bold tabular-nums text-muted-foreground">
        {count}
      </span>
    </div>
  );
}