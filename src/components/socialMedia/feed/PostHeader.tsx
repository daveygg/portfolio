import formatRelativeDate from "@/lib/dateFormatter";
import { BadgeCheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PostHeaderProps {
    username: string;
    className?: string;
    displayName: string;
    createdAt: Date;
}
export default function PostHeader({ username, className, displayName, createdAt }: PostHeaderProps) {
    return (
        <header className={className}>
            <div className="flex gap-1 items-center">
                <h2 className="font-semibold hover:underline">{displayName}</h2>
                <Badge 
                className="bg-social-media-primary text-white rounded-full size-5 p-1 border-none"
                >
                <BadgeCheckIcon size="30" />
                </Badge>
                <h3 className="text-muted-foreground text-sm">@{username}</h3>
                <h3 className="text-muted-foreground text-sm">&nbsp;&middot;&nbsp;<span className="hover:underline">{formatRelativeDate(createdAt)}</span></h3>
            </div>
        </header>
    );
}