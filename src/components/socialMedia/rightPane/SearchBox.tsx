import { Search } from "lucide-react";
import { usePosts } from "@/hooks/data/usePosts";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const { posts, isLoading } = usePosts("for-you", searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  return (
    <div className="fixed top-0 z-20 w-[100cqi] bg-background py-2">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-social-media-primary transition-colors duration-duration">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className="border-border w-full py-2 pl-12 pr-4 outline-none rounded-full border focus: focus:border-social-media-primary caret-social-media-primary bg-background transition-all duration-duration"
        />
        {isFocused && (
          <div className="absolute top-full right-0 w-[110cqi] bg-background border border-border rounded-xl shadow-lg overflow-hidden z-30">
            <div className="max-h-80 overflow-y-auto">

              {!searchTerm && (
                <div className="p-4 text-sm text-muted-foreground italic text-center">
                  Search for posts...
                </div>
              )}

              {isLoading && (
                <div className="p-4 text-sm text-muted-foreground">Searching...</div>
              )}
              
              {!isLoading && posts?.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground">No posts found.</div>
              )}

              {searchTerm && posts?.map((post: any) => (
                <div 
                  key={post.id} 
                  className="p-3 hover:bg-accent cursor-pointer gap-3 flex flex-row border-b border-border last:border-none transition-colors items-center"
                >                  
                  <Avatar className="col-start-1 row-start-1 row-span-2 size-8!">
                        <AvatarImage
                            src={post.avatarUrl}
                            alt="User Avatar" />
                        <AvatarFallback>DG</AvatarFallback>
                    </Avatar>
                  <div className="flex flex-col items-start align-middle mb-2">
                      <p className="font-bold text-md line-clamp-1 hover:underline">{post.displayName}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{post.content}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}