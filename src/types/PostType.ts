export interface PostType {
  id: number;
  username: string;
  displayName: string;
  content: string;
  createdAt: string;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
  following: boolean;
  imageUrl?: string;
  avatarUrl: string;
}