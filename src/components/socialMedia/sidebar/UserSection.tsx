import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type UserType from "@/types/UserType";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface UserSectionProps {
    user: UserType;
}

export default function UserSection({ user }: UserSectionProps) {
    return (
        <section className="flex flex-row items-center gap-4 px-4 py-2 w-[80%] ml-4 hover:bg-accent rounded-full justify-between">
            <div className="flex flex-row gap-4 items-center">
            <Avatar className="size-10!">
                    <AvatarImage
                        src={user.avatarUrl}
                        alt="User Avatar" />
                    <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h3 className="font-bold">{user.displayName}</h3>
                <span className="text-muted-foreground">@{user.username}</span>
            </div>
            </div>
            <MoreHorizIcon />
        </section>
    );    
}