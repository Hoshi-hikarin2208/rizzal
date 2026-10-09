import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type {
  ForumPost,
  ForumReply,
  PostLike,
  ReplyLike,
  InitialForumData,
} from "@/lib/supabase/forum-types";
import LegacyAppScripts from "./legacy-app-scripts";

export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderServerForumPost(post: ForumPost, isReply = false) {
  const authorName = post.is_anonymous ? "Anonymous reader" : post.author_name;
  const date = new Date(post.created_at);
  const formattedDate = Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);

  return `<li class="${isReply ? "forum-post forum-reply" : "forum-post"}">
    <div class="${isReply ? "forum-reply-head" : "forum-post-head"}">
      <div class="forum-author">
        <span class="forum-avatar" aria-hidden="true">${escapeHtml(authorName.trim().charAt(0).toUpperCase() || "A")}</span>
        <span class="forum-author-name">${escapeHtml(authorName)}</span>
      </div>
      <time class="forum-post-time" datetime="${escapeHtml(post.created_at)}">${formattedDate}</time>
    </div>
    <p class="forum-post-body">${escapeHtml(post.body)}</p>
  </li>`;
}

function renderServerForumFeed(
  markup: string,
  initialForumData: InitialForumData,
) {
  const repliesByPost = new Map<string, ForumReply[]>();
  initialForumData.replies.forEach((reply) => {
    const replies = repliesByPost.get(reply.post_id) ?? [];
    replies.push(reply);
    repliesByPost.set(reply.post_id, replies);
  });

  const feedItems = initialForumData.posts.length
    ? initialForumData.posts
        .map((post) => {
          const postHtml = renderServerForumPost(post);
          const replies = repliesByPost.get(post.id) ?? [];
          if (replies.length === 0) return postHtml;
          return postHtml.replace(
            /<\/li>$/,
            `<ol class="forum-replies">${replies
              .map((reply) => renderServerForumPost(reply, true))
              .join("")}</ol></li>`,
          );
        })
        .join("")
    : '<li class="forum-empty">The first note is waiting to be written.</li>';
  const count = initialForumData.posts.length;
  const feedStatus = initialForumData.error
    ? `Could not load server-rendered posts: ${initialForumData.error}`
    : count
      ? "Shared with readers across the project."
      : "You’re here first—start the conversation.";

  return markup
    .replace(
      /(<ol class="forum-feed" id="forum-feed"[^>]*>)[\s\S]*?(<\/ol>)/,
      (_match, openingTag: string, closingTag: string) =>
        `${openingTag}${feedItems}${closingTag}`,
    )
    .replace(
      /(<span id="forum-post-count">)[\s\S]*?(<\/span>)/,
      (_match, openingTag: string, closingTag: string) =>
        `${openingTag}${count} ${count === 1 ? "note" : "notes"}${closingTag}`,
    )
    .replace(
      /(<p class="forum-status forum-feed-status" id="forum-feed-status"[^>]*>)[\s\S]*?(<\/p>)/,
      (_match, openingTag: string, closingTag: string) =>
        `${openingTag}${escapeHtml(feedStatus)}${closingTag}`,
    );
}

async function getInitialForumData(): Promise<InitialForumData> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: posts, error: postsError } = await supabase
    .from("forum_posts")
    .select("id, author_id, author_name, is_anonymous, body, created_at")
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<ForumPost[]>();

  const initialForumData: InitialForumData = {
    posts: posts ?? [],
    replies: [],
    postLikes: [],
    replyLikes: [],
  };
  if (postsError) {
    return { ...initialForumData, error: postsError.message };
  }

  const postIds = initialForumData.posts.map((post) => post.id);
  if (postIds.length === 0) return initialForumData;

  const [repliesResult, postLikesResult] = await Promise.all([
    supabase
      .from("forum_replies")
      .select("id, post_id, author_id, author_name, is_anonymous, body, created_at")
      .in("post_id", postIds)
      .order("created_at", { ascending: true })
      .limit(1000)
      .returns<ForumReply[]>(),
    supabase
      .from("forum_post_likes")
      .select("post_id, user_id")
      .in("post_id", postIds)
      .limit(5000)
      .returns<PostLike[]>(),
  ]);

  if (repliesResult.error || postLikesResult.error) {
    return {
      ...initialForumData,
      error: repliesResult.error?.message ?? postLikesResult.error?.message,
    };
  }
  initialForumData.replies = repliesResult.data ?? [];
  initialForumData.postLikes = postLikesResult.data ?? [];

  const replyIds = initialForumData.replies.map((reply) => reply.id);
  if (replyIds.length > 0) {
    const { data, error } = await supabase
      .from("forum_reply_likes")
      .select("reply_id, user_id")
      .in("reply_id", replyIds)
      .limit(5000)
      .returns<ReplyLike[]>();
    if (error) return { ...initialForumData, error: error.message };
    initialForumData.replyLikes = data ?? [];
  }

  return initialForumData;
}

async function getSiteMarkup() {
  const source = await readFile(
    join(process.cwd(), "app", "site-content.html"),
    "utf8",
  );
  const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (!body) throw new Error("Could not find the site body in app/site-content.html.");
  return body[1];
}

export default async function Home() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  const [initialForumData, sourceMarkup] = await Promise.all([
    getInitialForumData(),
    getSiteMarkup(),
  ]);
  const siteMarkup = renderServerForumFeed(sourceMarkup, initialForumData);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: siteMarkup }} />
      <LegacyAppScripts
        supabaseUrl={supabaseUrl}
        supabaseKey={supabaseKey}
        initialForumData={initialForumData}
      />
    </>
  );
}
