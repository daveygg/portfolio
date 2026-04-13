import type { PostType} from '@/types/PostType';
import { execute }from '@/api/util';

const BASE_URL = '/data';

export async function getPosts(): Promise<PostType[]> {
  const response = await execute<PostType[]>(
    `${BASE_URL}/posts.json`,
    'GET'
  );

  return response;
};