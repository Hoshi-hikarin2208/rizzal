# Rizal: The Power of Ideas, Unity & Revolution

An interactive, static history website about José Rizal, the Propaganda Movement, La Liga Filipina, Rizal's exile in Dapitan, and the Philippine Revolution.

## Run locally

Install dependencies with `npm install`, then start the Next.js app with `npm run dev`. The site preserves its interactive timeline, quiz, audio player, community forum, and history memes.

## Theme and creator photos

Choose **Light mode** or **Dark mode** from the fixed navigation; the preference is remembered in the current browser. Member photos and names are read-only for visitors and managed by the site admin in [`public/images/creators`](./public/images/creators) and the creator cards in [`app/site-content.html`](./app/site-content.html) (or [`index.html`](./index.html) for the static page). There are no photo or name editing controls on the site.

Select a historical portrait or monument to open an enlarged, keyboard-accessible view with its caption, historical role, and connection to Rizal. The same viewer is available on the Next.js and standalone pages.

## Shared forum setup

The forum needs a Supabase project; until configured, the site displays setup guidance and the rest of the website still works.

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` for local development and in the deployment environment. The local file is ignored by Git.
2. In Supabase, enable **Anonymous Sign-Ins** under **Authentication → Sign In / Providers**, then run [`forum-schema.sql`](./forum-–schema.sql) in the project's SQL Editor. If the forum was already set up, run the script again to apply its explicit Data API grants; row-level security remains enabled.
3. Deploy the app over HTTPS. The forum uses cookie-based Supabase sessions, server-renders available community notes, and supports anonymous or display-name posts, replies, likes, sorting, refresh, and deleting your own posts and their replies.

The Supabase URL and publishable key are intended for browser use; row-level security in the SQL schema limits writes and deletions to the signed-in account that owns each item. Never put a service-role key in frontend code. A public anonymous forum can attract spam: enable Supabase's CAPTCHA protection for anonymous sign-in where available, monitor the discussion, and rotate/disable access if abuse occurs. The site does not provide moderator tooling.

## Listening room

The site admin curates the MP3 song list in [`public/music/playlist.json`](./public/music/playlist.json). Add MP3 files you have permission to use to [`public/music`](./public/music) and list them in the playlist JSON. Visitors can choose from the approved list and play songs in the site player; the site has no visitor upload control. See [`public/music/README.md`](./public/music/README.md) for the playlist format.

The quiz contains 10 questions: 8 multiple-choice and 2 true-or-false questions.
