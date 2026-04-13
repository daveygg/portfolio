import FeedViewSelector from "@/components/socialMedia/feed/FeedViewSelector";
import { Suspense, useEffect, useMemo, useState } from "react";
import XIcon from "@mui/icons-material/X";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from "@mui/icons-material/Search";
import SocialMediaSidebar from "@/components/socialMedia/sidebar/SocialMediaSidebar";
import Posts from "@/components/socialMedia/feed/Posts";
import { usePosts } from "@/hooks/data/usePosts";
import type { FeedType } from "@/types/enums/FeedType";
import RightPane from "@/components/socialMedia/rightPane/RightPane";
import StickyBox from "react-sticky-box";
import CreatePostBox from "@/components/socialMedia/feed/CreatePostBox";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import type { PostType } from "@/types/PostType";
import { PostsSkeleton } from "@/components/socialMedia/feed/FeedSkeleton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function SocialMedia() {
  // ui config
  const user = {
    id: 1,
    username: "anon1234",
    displayName: "Anon",
    bio: "Visting user.",
    avatarUrl: "/avatars/avatar6.jpg",
    bannerUrl: "/avatars/avatar6.jpg",
  };

  // sidebar code
  const [sidebarItems, setSidebarItems] = useState([
    { Icon: XIcon, active: false, id: "x" },
    { title: "Home", Icon: HomeIcon, active: true, id: "home" },
    { title: "Explore", Icon: SearchIcon, active: false, id: "explore" },
    {
      title: "Notifications",
      Icon: NotificationsNoneIcon,
      active: false,
      id: "notifications",
    },
    { title: "Messages", Icon: MailOutlineIcon, active: false, id: "messages" },
    {
      title: "Bookmarks",
      Icon: BookmarkBorderIcon,
      active: false,
      id: "bookmarks",
    },
    { title: "Lists", Icon: ListAltIcon, active: false, id: "lists" },
    { title: "Profile", Icon: PermIdentityIcon, active: false, id: "profile" },
    { title: "More", Icon: MoreHorizIcon, active: false, id: "more" },
  ]);

  const handleSetActive = (id: string) => {
    setSidebarItems((prev) =>
      prev.map((item) => ({
        ...item,
        active: item.id === id,
      })),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // tabs code
  const tabs = [
    { id: "for-you", title: "For You" },
    { id: "following", title: "Following" },
  ] as { id: FeedType; title: string }[];
  const [activeId, setActiveId] = useState<FeedType>("for-you");

  // posts code
  const { posts, isLoading, isError, error } = usePosts(activeId);
  const [addedPosts, setAddedPosts] = useState<PostType[]>([]);

  const combinedPosts = useMemo(() => {
    return [...addedPosts, ...(posts || [])];
  }, [addedPosts, posts]);

  const handleAddNewPost = (text: string) => {
    const maxId =
      combinedPosts.length > 0
        ? Math.max(...combinedPosts.map((p) => p.id))
        : 999;

    const newPost: PostType = {
      id: maxId,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      content: text,
      createdAt: new Date().toISOString(),
      comments: 0,
      retweets: 0,
      likes: 0,
      views: 0,
      following: true,
    };

    setAddedPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <ThemeToggle />
      <div
        className="flex flex-row container mx-auto min-h-screen relative px-4
          font-chirp-regular"
      >
        <div className="w-[20%] sticky top-0 border-r border-border h-screen">
          <SocialMediaSidebar
            items={sidebarItems}
            user={user}
            setActive={handleSetActive}
          />
        </div>
        <div className="w-[50%] border-r border-border">
          <FeedViewSelector
            tabs={tabs}
            activeId={activeId}
            setActiveId={setActiveId}
          />
          <CreatePostBox onPost={handleAddNewPost} />
          {isLoading ? (
            <PostsSkeleton />
          ) : isError ? (
            <div className="p-4 text-center text-red-500">
              There has been an error. Sorry about this...
            </div>
          ) : (
            <Posts posts={combinedPosts} />
          )}
        </div>
        <StickyBox className="w-[30%] flex h-fit pl-2" offsetBottom={20}>
          <RightPane />
        </StickyBox>
      </div>
    </>
  );
}
