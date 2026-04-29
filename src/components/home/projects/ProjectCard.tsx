import { forwardRef } from "react";
import { Button } from "../../ui/button";
import { Play, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ProjectProps {
  project: {
    title: string;
    description: string;
    image: string;
    link?: string;
    suit: "hearts" | "diamonds" | "clubs" | "spades";
    rank: string;
  };
  index: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, index, onClick }, ref) => {
    const suitMap = {
      hearts: { symbol: "♥", color: "text-red-600" },
      diamonds: { symbol: "♦", color: "text-red-600" },
      clubs: { symbol: "♣", color: "text-black" },
      spades: { symbol: "♠", color: "text-black" },
    };

    const { symbol, color } = suitMap[project.suit];

    return (
      <div
        ref={ref}
        key={project.title}
        className="group col-start-1 row-start-1 card"
        onClick={(e) => onClick(e, index)}
      >
        <div
          className="flex flex-col aspect-5/4 md:aspect-square rounded-4xl border-2
            border-black bg-white"
        >
          {/* Top Left Rank & Suit */}
          <div
            className={`w-full md:px-8 py-2 px-4 flex flex-row justify-between
              items-center leading-none border-b-2 border-black ${color}`}
          >
            <div className="flex flex-col items-start">
              <span className="text-md lg:text-3xl font-bold">{project.rank}</span>
              <span className="text-md lg:text-3xl">{symbol}</span>
            </div>

            {project.link ? (
              <Button
                size="sm"
                asChild
                className="rounded-full px-4 py-2 lg:px-10 lg:py-5 flex items-center gap-1 lg:gap-2
                  opacity-0 project-button z-200"
              >
                <Link
                  to={project.link}
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    console.log("Link clicked");
                    e.stopPropagation();
                  }}
                >
                  See Project
                  <Play className="size-2 lg:size-4 fill-current" />
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-4 py-2 lg:px-10 lg:py-5 flex items-center gap-1 lg:gap-2
                  opacity-0 project-button z-200"
                variant={"destructive"}
              >
                No Link
                <X className="size-4 fill-current" />
              </Button>
            )}
          </div>

          {/* Main Content Area */}
          <div className="relative flex flex-col h-full">
            {/* Dark Overlay */}
            <div
              className="absolute inset-0 bg-linear-to-t from-black/80
                via-black/30 to-transparent"
            />
            <img
              src={project.image}
              alt={project.title}
              className="h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex flex-col">
              <h3 className="text-lg lg:text-2xl font-bold text-start text-white">
                {project.title}
              </h3>
              <p className="text-sm lg:text-lg text-start text-white font-semibold">
                {project.description}
              </p>
            </div>
          </div>

          {/* Bottom Right Rank & Suit (Inverted) */}
          <div
            className={`w-full px-4 md:px-8 py-4 flex flex-col items-start align-top
              leading-none border-b-2 border-black rotate-180 ${color}`}
          >
            <span className="text-md lg:text-3xl font-bold">{project.rank}</span>
            <span className="text-md lg:text-3xl">{symbol}</span>
          </div>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
