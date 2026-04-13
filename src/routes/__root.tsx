import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const RootLayout = () => (
  <div className="h-dvh">    
    <Outlet />
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
});
