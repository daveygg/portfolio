import * as React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  to: string;
  children: React.ReactNode;
}

export function ListItem({ title, to, children, ...props }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className="block select-none rounded-md p-3 leading-tight no-underline
            outline-hidden transition-colors hover:bg-accent
            hover:text-accent-foreground focus:bg-accent
            focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground text-xs">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
