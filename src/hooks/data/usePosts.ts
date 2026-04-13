import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/postsApi';
import type { FeedType } from '@/types/enums/FeedType';

export function usePosts(
  feedType: FeedType,
  searchTerm?: string,  
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', { searchTerm, feedType }],
    queryFn: async () => {
      // simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getPosts();
    },
    select: (posts) => {

      if (searchTerm && searchTerm.trim() !== "") {
          return posts.filter((post) =>
          post.content?.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      if (feedType === 'following') {
          return posts.filter((post) => post.following === true);
      }

      return posts;      
    },
  });
  return { posts: data, isLoading, isError, error };
}