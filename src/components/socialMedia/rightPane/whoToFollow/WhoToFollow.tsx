import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type UserType from "@/types/UserType";

interface WhoToFollowProps {
    user: UserType;
}

export default function WhoToFollow({ user }: WhoToFollowProps) {
    return (
        <div className="flex flex-row items-center gap-4 justify-between hover:bg-accent-muted p-3 hover:cursor-pointer">
            <div className="flex gap-4 items-center">
            <Avatar className="size-10!">
                    <AvatarImage
                        src={user.avatarUrl}
                        alt="User Avatar" />
                    <AvatarFallback>DG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                    <div className="font-bold hover:underline">{user.displayName}</div>
                    <div className="text-muted-foreground">@{user.username}</div>
                </div>
                </div>
                <Button className="rounded-full hover:cursor-pointer font-bold">Follow</Button>
        </div>
    );    
}