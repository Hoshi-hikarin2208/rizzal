# Rizal: The Power of Ideas, Unity & Revolution

An interactive, static history website about José Rizal, the Propaganda Movement, La Liga Filipina, Rizal's exile in Dapitan, and the Philippine Revolution.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server. The site uses `styles.css` for presentation and `app.js` for its interactive timeline, quiz, audio player, community forum, and history memes.

## Theme and creator credits

Choose **Light mode** or **Dark mode** from the navigation; the preference is remembered in the current browser. In **Website creators**, enter your team name above the prefilled member names, then upload each member's photo. Names and resized photos are saved in that browser only. To include the final credits for all visitors, add the approved photos to the project and update the creator cards in `index.html`.

## Shared forum setup

The forum needs a Supabase project; until configured, the site displays setup guidance and the rest of the website still works.

1. Create a Supabase project and enable **Anonymous Sign-Ins** under **Authentication → Sign In / Providers**.
2. Open the project's SQL Editor and run [`forum-schema.sql`](./forum-schema.sql).
3. In [`forum-config.js`](./forum-config.js), replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the project's URL and publishable (or legacy anon) key. Never put a service-role key in frontend code.
4. Deploy the site over HTTPS. The public forum supports anonymous or display-name posts, replies, likes, sorting, refresh, and deleting your own posts and their replies.

The Supabase URL and publishable/anon key are intended for browser use; row-level security in the SQL schema limits writes and deletions to the signed-in anonymous account that owns each item. A public anonymous forum can attract spam: enable Supabase's CAPTCHA protection for anonymous sign-in where available, monitor the discussion, and rotate/disable access if abuse occurs. The site does not provide moderator tooling.

## Listening room

The turntable plays audio files selected by the visitor in their browser. Audio is not uploaded or bundled with the site. The listening room also links to YouTube Music and Spotify searches for classic OPM; check that results are from official artist or rights-holder accounts. Use local recordings you have permission to play, since OPM recordings may be copyrighted.