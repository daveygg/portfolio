import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type NewsType from "@/types/NewsType";

export default function News({ title, time, category, postsCount }: NewsType) {
    return (
        <article className="flex flex-col px-4 py-2 hover:bg-accent-muted hover:cursor-pointer transition-all duration-duration ease-out">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex flex-row w-full justify-start items-center py-1">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-3 *:data-[slot=avatar]:ring-2 mr-2">
                    <Avatar className="size-6!">
                            <AvatarImage src="/avatars/avatar4.jpg" alt="@avatar1" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6!">
                            <AvatarImage
                                src="/avatars/avatar6.jpg"
                                alt="@avatar2"
                            />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar className="size-6!">
                            <AvatarImage
                                src="/avatars/avatar1.jpg"
                                alt="@avatar3"
                            />
                            <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-xs text-muted-foreground">
                    {`${time} · ${category} · ${postsCount}`}
                </div>
            </div>            
        </article>
    );
}