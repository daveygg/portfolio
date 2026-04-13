
import { Button } from "@/components/ui/button";
import SocialMediaSidebarOption, { type SocialMediaSideBarOptionProps } from "./SocialMediaSidebarOption";
import UserSection from "./UserSection";
import type UserType from "@/types/UserType";

interface SocialMediaSidebarProps {
  items: SocialMediaSideBarOptionProps[];
  user: UserType;
  setActive: (id: string) => void;
}

export default function 
SocialMediaSidebar({ items = [], user, setActive }: SocialMediaSidebarProps) {
  return (
    <div className="ml-10 pb-6 flex flex-col h-full justify-between hover:cursor-pointer">
      <div>
      {items.map((item) => (
        <SocialMediaSidebarOption
          key={`${item.title}`}
          {...item}
          onClick={() => setActive(item.id)}
        />
      ))}
      <Button variant="default" size="lg" className="cursor-pointer ml-4 mt-6 rounded-full w-[80%] flex py-4! lg:min-h-13">
        <span className="font-bold text-lg! tracking-wide">
          Post
        </span>
      </Button>
      </div>
      <UserSection user={user} />
    </div>
  );
}
