import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import { vertexShader, fragmentShader } from "@/shaders/shaders";
import { Socials } from "@/components/shared/Socials";
import { hexToRgb } from "@/lib/hexToRgb";

gsap.registerPlugin(ScrollTrigger, SplitText);

const CONFIG = {
  spread: 0.8,
  speed: 1.4,
  color: "#F8F7ED",
};

export function ShaderSection() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useGSAP(
    () => {
      if (!heroRef.current || !heroContentRef.current || !canvasRef.current)
        return;

      const hero = heroRef.current;
      const canvas = canvasRef.current;
      const heroContent = heroContentRef.current;

      // --- THREE.JS SETUP ---
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(hero.offsetWidth, hero.offsetHeight);

      const rgb = hexToRgb(CONFIG.color);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight),
          },
          uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
          uSpread: { value: CONFIG.spread },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      materialRef.current = material;

      // Animation Loop
      let running = true;
      const animate = () => {
        if (!running) return;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      // --- SHADER SCROLL PROGRESS ---
      ScrollTrigger.create({
        trigger: hero,
        start: "top 10%",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (materialRef.current) {
            materialRef.current.uniforms.uProgress.value =
              self.progress * CONFIG.speed;
          }
        },
      });

      // --- SPLIT TEXT ANIMATION ---
      // 1. Target the specific text elements inside the ref
      const textElements = heroContentRef.current.querySelectorAll("h2, p");

      const split = new SplitText(textElements, { type: "words" });

      // 2. Create a timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContentRef.current,
          start: "top 20%",
          end: "bottom 100%",
          scrub: 0.5,
        },
      });

      // 3. Animate with stagger
      tl.fromTo(
        split.words,
        { opacity: 0 }, // Start state (faintly visible or 0)
        {
          opacity: 1,
          stagger: 0.1, // This creates the "word-by-word" effect automatically
          ease: "none",
        },
      );

      const resize = () => {
        renderer.setSize(hero.offsetWidth, hero.offsetHeight);
        material.uniforms.uResolution.value.set(
          hero.offsetWidth,
          hero.offsetHeight,
        );
      };
      window.addEventListener("resize", resize);

      return () => {
        running = false;
        window.removeEventListener("resize", resize);
        material.dispose();
        geometry.dispose();
        renderer.dispose();
      };
    },
    { scope: heroRef },
  );

  return (
    <section className="p-24">
      <div
        ref={heroRef}
        className="relative w-full h-[125svh] overflow-hidden rounded-4xl"
      >
        <div className="absolute w-full h-full">
          <img
            src="/src/assets/images/backgrounds/annie-spratt-zA7I5BtFbvw-unsplash.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <section className="absolute w-full h-[75svh] flex flex-col gap-2">
          <h1
            className="flex flex-col items-start uppercase leading-[0.9] text-sm
              font-extrabold w-fit pt-8 px-8 backdrop-blur-md"
          >
            About Me
          </h1>
          <p
            className="text-5xl items-start font-semibold backdrop-blur-md
              px-8 pt-4"
          >
            A versatile Full Stack Engineer, who's been developing proffesionally for over three years. I strive for elegant design in all of my work and maintain a disciplined focus on the pursuit of mastering my craft.
          </p>
        </section>

        <canvas
          ref={canvasRef}
          className="absolute bottom-0 w-full h-full pointer-events-none"
        />

        <section
          ref={heroContentRef}
          className="absolute bottom-0 w-full h-[100svh] flex flex-col
            justify-center items-center text-start"
        >
          <h2
            className="font-medium text-[clamp(2.5rem,4.5vw,5rem)] w-3/4
              leading-none p-2"
          >
            The landing page has been animated with GSAP and Three.js.
          </h2>
          <p
            className="font-medium text-[clamp(1rem,2vw,3rem)] w-3/4
              text-blue-600"
          >
            Scroll to see the projects ⬇️
          </p>
        </section>
      </div>
    </section>
  );
}
