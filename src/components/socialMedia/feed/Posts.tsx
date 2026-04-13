import Post from "./Post";
import type { PostType } from "@/types/PostType";

interface PostsProps {
    posts: PostType[];
}

export default function Posts({ posts }: PostsProps) {
    console.log(posts);
    return (
        <div className="flex flex-col border-border">
            {posts.map((post) => (
                <Post key={post.id}
                    {...post} />
            ))}
        </div>
    );
};