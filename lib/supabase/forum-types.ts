export type ForumPost = {
  id: string;
  author_id: string;
  author_name: string;
  is_anonymous: boolean;
  body: string;
  created_at: string;
};

export type ForumReply = ForumPost & { post_id: string };
export type PostLike = { post_id: string; user_id: string };
export type ReplyLike = { reply_id: string; user_id: string };

export type InitialForumData = {
  posts: ForumPost[];
  replies: ForumReply[];
  postLikes: PostLike[];
  replyLikes: ReplyLike[];
  error?: string;
};
