import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import projectBg from "@/assets/images/backgrounds/christina-deravedisian-4ZudLA265hw-unsplash.jpg";
import socialMediaImg from "@/assets/images/project-images/x.png";

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  title: string;
  description: string;
  link: string;
  imagePath: string;
}

export function ProjectGallery() {

  const projects : Project[] = [
    {
      title: "Social Media",
      description: "View and interact with social media posts",
      link: "socialMedia",
      imagePath: socialMediaImg,
    },
    {
      title: "Dashboard",
      description: "Access your personal dashboard",
      link: ".",
      imagePath: socialMediaImg,
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      link: ".",
      imagePath: socialMediaImg,
    },
  ];

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const parentSplit = SplitText.create(".reveal-text", {
        type: "lines",
        linesClass: "line-parent",
      });

      const childSplit = SplitText.create(parentSplit.lines, {
        type: "lines",
        linesClass: "line-child",
      });

      gsap.set(parentSplit.lines, { overflow: "hidden" });
      gsap.set(childSplit.lines, { display: "block" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 5%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        [".reveal-text", ".card"],
        { yPercent: -120 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      ).fromTo(
        childSplit.lines,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="project-gallery"
      ref={sectionRef}
      className="w-full flex flex-col px-4 text-center h-dvh items-center gap-2 pt-2 justify-center bg-cover bg-center bg-no-repeat rounded-lg"      
    >
      {/* TITLE & DESCRIPTION */}
      <div className="w-3/4 flex flex-col items-center gap-2">
      <div className=" overflow-hidden rounded-md">
        <h2 className="text-7xl font-semibold leading-snug reveal-text  backdrop-blur-xl w-fit px-4">
          Projects
        </h2>
        </div>
        <div className=" overflow-hidden rounded-md">
        <p className="text-xl reveal-text backdrop-blur-xl w-fit p-4">Here are my projects! 
          My personal favourite project is my Social Media project, where I
          recreated Twitter. I love the Twitter UI and its presentation. I also
          created a corporate website to show a more formal style of UI.
        </p>
        </div>
      </div>

      {/* CARD GRID */}
      <div className="relative flex w-4/5 items-start justify-start gap-6 p-6 rounded-sm"
      style={{ 
        backgroundImage: `url(${projectBg})`,
      }}>
        {projects.map((project) => (
          <div
            key={project.title}
            className="overflow-hidden group inset-y-0 w-1/3"
          >
            <div className="card">
              <Link to={project.link} resetScroll={true}>
                <div
                  className="relative w-full aspect-3/4 rounded-lg
                    overflow-hidden border border-border cursor-pointer"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center
                      transition-transform duration-500 ease-out
                      group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.imagePath})` }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Text Overlay */}
                  <div
                    className="relative z-10 h-full p-6 flex flex-col
                      justify-end items-start text-white transition-all
                      duration-500 ease-out group-hover:scale-105 text-start"
                  >
                    <h3 className="font-semibold text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-90">{project.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
