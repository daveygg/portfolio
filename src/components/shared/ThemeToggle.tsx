import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    setTheme("light");
    navigate({ to: "/" });
  };

  return (
    <div className="fixed top-4 left-4 z-[100] flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/80 backdrop-blur-sm border-border
          shadow-md hover:cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
            dark:-rotate-90 dark:scale-0"
        />
        <Moon
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
            transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/80 backdrop-blur-sm border-border
          shadow-md animate-in fade-in slide-in-from-top-2 duration-300
          hover:cursor-pointer"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Go back</span>
      </Button>
    </div>
  );
}
