import { useRef } from "react";
import SkillCard, { type SkillCardProps } from "./SkillCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LogosGrid from "./LogosGrid";
  
  const skills: SkillCardProps[] = [
    {
      title: "API ⭐",
      shortDescription: "What I'm best at",
      ramblingDescription:
        "Extensive technical knowledge of API architecture. Building with a focus on flexibility, extensibility, and scalability. I keep up to date with current industry best practices. This is my strongest skill and the majority of my professional work.",
      colorClass: "bg-pastel-green",
      gridAreaClass: "col-start-1 col-end-3 row-start-1",
      tags: [
        "C#",
        ".NET",
        "Microservices",
        "Entity Framework Core",
        "Mass Transit",
        "Hybrid Cache",
        "Redis",
        "Identity",
        "AutoMapper",
      ],
    },
    {
      title: "Front End",
      shortDescription: "What I enjoy the most",
      ramblingDescription:
        "Experience in working with data-intensive front-end applications. Making complex data handling and state management simple. Excellent CSS skills, allow me to create bespoke creative designs if required.",
      colorClass: "bg-pastel-orange",
      gridAreaClass: "col-start-3 col-end-4 row-start-1 row-span-3",
      tags: [
        "JavaScript",
        "TypeScript",
        "React",
        "Tailwind",
        "React Query",
        "Tanstack Query",
        "Tanstack Table",
        "Tanstack Router",
        "API Integration",
        "Data Management",
        "Zod",
        "ZuStand",
      ],
    },
    {
      title: "System Integrations",
      shortDescription: "Bringing systems together",
      ramblingDescription:
        "Bring systems together with asynchronous distributed messaging. Securely integrate with external partner systems via cloud APIM gateways.",
      colorClass: "bg-pastel-orange",
      gridAreaClass: "col-start-1 col-end-2 row-start-2",
      tags: [
        "Azure Service Bus",
        "RabbitMQ",
        "Biztalk",
        "Schema Translation",
      ],
    },
    {
      title: "Cloud",
      shortDescription: "Infrastructure as Code",
      ramblingDescription:
        "Build and maintain cloud infrastructure using IAC pipelines. For consistent, bespoke configuration of infrastructure.",
      colorClass: "bg-pastel-blue",
      gridAreaClass: "col-start-2 col-end-3 row-start-2",
      tags: ["Azure", "IAC", "Bicep"],
    },
    {
      title: "CI/CD",
      shortDescription: "Test and ship",
      ramblingDescription:
        "Automate deployments, testing and database migrations with feature-rich, modular CI/CD pipelines.",
      colorClass: "bg-pastel-blue",
      gridAreaClass: "col-start-1 col-end-2 row-start-3",
      tags: ["Azure", "YAML"],
    },
    {
      title: "SQL",
      shortDescription: "I know my way around a database",
      ramblingDescription:
        "Strong SQL knowledge, which has turned around failing data migration projects.",
      colorClass: "bg-pastel-green",
      gridAreaClass: "col-start-2 col-end-3 row-start-3",
      tags: ["SQL Server", "PostgreSQL"],
    },
    {
      title: "UI Design",
      shortDescription: "Make things pretty",
      ramblingDescription: "Experience in working with Figma.",
      colorClass: "bg-pastel-blue",
      gridAreaClass: "col-start-4 col-end-5 row-start-1",
      tags: ["Figma"],
    },
    {
      title: "Animation",
      shortDescription: "Make things fun",
      ramblingDescription:
        "I use animation libraries to bring websites to life with smooth and engaging animations.",
      colorClass: "bg-pastel-green",
      gridAreaClass: "col-start-4 col-end-5 row-start-2 row-span-2",
      tags: ["GSAP", "Motion"],
    },
  ];

export default function SkillsGrid() {

  const logosRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const logos = logosRef.current;
      if (!logos) return;

      gsap.set(logosRef.current, { autoAlpha: 0 });

      gsap.to(logosRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.Out",
        scrollTrigger: {
          trigger: logosRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: logosRef },
  );

  return (
    <div
      className="grid grid-cols-[0.8fr_0.8fr_0.5fr_0.5fr]
        grid-rows-[0.8fr_0.8fr_0.8fr_0.8fr] gap-2 w-full"
    >
      {skills.map((skill, index) => (
        <SkillCard key={index} {...skill} />
      ))}
      <LogosGrid />
    </div>
  );
}
