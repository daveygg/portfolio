import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PostHeader from "./PostHeader";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import PostActionButton from "./PostActionButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { PostType } from "@/types/PostType";
import { BadgeCheckIcon } from "lucide-react"

export default function Post({ avatarUrl, username, content, displayName, createdAt, comments, retweets, likes, views, imageUrl }: PostType) {

    return (
        <article className="border-b border-border p-4 hover:bg-accent-muted cursor-pointer grid grid-cols-[auto_1fr_auto]">
            <Avatar className="col-start-1 row-start-1 row-span-2 size-10!">
                <AvatarImage
                    src={avatarUrl}
                    alt="User Avatar" />
                <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <PostHeader displayName={displayName} username={username} className="col-start-2 row-start-1 pl-3" createdAt={new Date(createdAt)} />
            <MoreHorizIcon className="col-start-3 hover:bg-social-media-primary/10 hover:text-social-media-primary rounded-full transition-all duration-duration ease-out ml-2" />
            <p className="col-start-2 row-start-2 px-3 wrap-anywhere">
                {content}
            </p>
            {imageUrl && <img src={imageUrl} alt="Post image" className="overflow-hidden col-start-2 row-start-3 mt-2 rounded-xl w-full h-auto border-border border-2" />}
            <div className={`col-start-2 ${imageUrl ? 'row-start-4' : 'row-start-3'} mt-3 flex justify-between text-muted-foreground items-center px-3`}>
                <PostActionButton icon={ChatBubbleOutlineIcon} hoverColor="social-media-primary" count={comments} />
                <PostActionButton icon={RepeatIcon} hoverColor="social-media-retweet" count={retweets} />
                <PostActionButton icon={FavoriteBorderIcon} hoverColor="social-media-like" count={likes} />
                <PostActionButton icon={BarChartIcon} hoverColor="social-media-primary" count={views} />
            </div>
        </article>
    );
}