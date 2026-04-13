import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLocation } from "@tanstack/react-router";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/daveygg",
    icon: {
      light: "src/assets/icons/GitHub_Invertocat_Black.svg",
      dark: "src/assets/icons/GitHub_Invertocat_White.svg",
    },
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/david-gilchrist-61b158301/",
    icon: {
      light: "src/assets/images/logos/InBug-Black.png",
      dark: "src/assets/images/logos/InBug-White.png",
    },
  },
];

export function Socials() {
  const { theme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="absolute top-2 right-2 z-[100] flex gap-2">
      {isHome &&
        socials.map((social) => (
          <Button
            key={social.name}
            asChild
            variant="outline"
            className="inline-flex items-center gap-2 rounded-full backdrop-blur-xl border-border shadow-md px-3 py-2 bg-background/20 hover:bg-background/40"
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <img src={theme === "dark" ? social.icon.dark : social.icon.light} alt={social.name} className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap text-sm">{social.name}</span>
            </a>
          </Button>
        ))}
    </div>
  );
}
