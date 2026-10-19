Rizal: The Power of Ideas, Unity & Revolution

An interactive history website exploring the life, ideas, and legacy of Dr. José Rizal, one of the Philippines’ most influential national heroes. Through engaging content and interactive features, the project highlights Rizal’s role in the Propaganda Movement, the founding of La Liga Filipina, his exile in Dapitan, and the events surrounding the Philippine Revolution.

 Explore the project: Rizal: The Power of Ideas, Unity & Revolution

 About the Project

This website aims to make Philippine history more engaging and accessible through a combination of historical content, interactive learning tools, community discussions, and multimedia experiences.

Visitors can explore important events in Rizal’s life, test their historical knowledge, listen to curated music, and participate in community discussions.

 Features
Interactive Historical Timeline — Explore key events in José Rizal’s life and their historical significance.
Educational Quiz — Test your knowledge with 10 questions, including 8 multiple-choice questions and 2 true-or-false questions.
Listening Room — Play locally hosted audio files or open approved Spotify and YouTube links.
Community Forum — Share historical insights, reply to posts, like discussions, sort and refresh posts, and delete your own posts and replies.
Light and Dark Modes — Switch between themes using the fixed navigation. Your preference is remembered in the current browser.
Historical Image Viewer — Select a historical portrait or monument to open an enlarged, keyboard-accessible view with its caption, historical role, and connection to Rizal.
History Memes — Explore a more informal and engaging perspective on historical topics.
Creator Profiles — Display creator names and photos managed by the site administrator.
Standalone Static Page — Access a standalone version of the website alongside the Next.js application.
 Historical Topics

The website explores several important themes in Philippine history:

The Propaganda Movement — The campaign for reforms and equal rights under Spanish colonial rule.
La Liga Filipina — Rizal’s organization promoting unity, mutual assistance, and peaceful reform.
Exile in Dapitan — Rizal’s work in education, medicine, agriculture, and community development.
The Philippine Revolution — The historical context of the revolution and Rizal’s influence on Filipino nationalism.
Rizal’s Legacy — His enduring contributions to Filipino identity, civic consciousness, and the pursuit of reform.
 Technology

The project includes a Next.js application and a standalone static page, with Supabase providing optional backend services for the community forum.

Next.js — Web application framework.
JavaScript, HTML, and CSS — Website functionality and presentation.
Supabase — Authentication and database services for the shared community forum.
JSON — Configuration of the curated music playlist.

The exact framework and library versions are defined by the project's package configuration.

 Getting Started
Prerequisites

Before running the Next.js application, make sure you have:

Node.js installed.
npm, which is included with standard Node.js installations.
Git, if you plan to clone the repository.
1. Clone the repository
git clone https://github.com/Hoshi-hikarin2208/rizzal.git
cd rizzal

2. Install dependencies
npm install

3. Configure environment variables

The main website can run without Supabase configuration. The shared community forum requires a Supabase project.

Create a .env.local file in the project root and add the following variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key


Replace the placeholder values with your project's actual Supabase URL and publishable key.

Keep .env.local private. It is ignored by Git so that local environment configuration is not committed to the repository.

Security note: The Supabase publishable key is intended for client-side use. Never expose a Supabase service-role key in frontend code.

4. Start the development server
npm run dev


Open the local address shown in your terminal, typically:

http://localhost:3000

The Next.js application should now be available in your browser.

 Setting Up the Community Forum

The community forum uses Supabase for authentication and data storage. Without a configured Supabase project, the website displays setup guidance while the other features remain available.

1. Create a Supabase project

Create a project at Supabase and obtain its project URL and publishable key.

Add both values to .env.local for local development. Configure the same variables in your hosting provider's environment settings when deploying.

2. Enable anonymous sign-ins

In the Supabase dashboard:

Navigate to Authentication → Sign In / Providers.
Enable Anonymous Sign-Ins.
Save the changes.

Anonymous authentication allows visitors to participate without creating a conventional account.

3. Apply the database schema

Open the Supabase SQL Editor and run the repository's forum-schema.sql script.

This script sets up the forum's database structure, security policies, and the explicit Data API grants needed by the application. If the forum was previously configured, run the script again to apply the updated grants.

Important: Row-level security (RLS) must remain enabled. The database policies should restrict users to the actions permitted by the schema, including deleting only their own posts and replies.

4. Deploy over HTTPS

Deploy the application to an HTTPS-enabled hosting environment and configure the required environment variables.

The forum uses cookie-based Supabase sessions and supports server-rendering of available community notes, anonymous or display-name posts, replies, likes, sorting, refreshing, and deletion of a user's own posts and their replies.

Forum security and moderation

A publicly accessible anonymous forum may attract spam or abusive content.

Recommended precautions:

Enable Supabase CAPTCHA protection for anonymous sign-ins where available.
Review database access policies and grants before deployment.
Monitor community discussions and address abuse through appropriate administrative procedures.
Rotate credentials or disable public access if abuse becomes a concern.

Current limitation: The website does not include dedicated moderator tooling. Database security policies should not be treated as a substitute for content moderation.

 Managing the Listening Room

The listening room uses a curated playlist maintained by the site administrator.

Playlist location
public/
└── music/
    ├── playlist.json
    └── README.md

Adding music
Add permitted local audio files to public/music/.
Update public/music/playlist.json using the format documented in public/music/README.md.
Alternatively, add supported HTTPS Spotify or YouTube links to the playlist.
Verify that each entry points to a valid audio file or streaming destination.

Visitors can select tracks from the approved playlist but cannot upload audio or add their own songs through the website.

Local audio files play in the site's music player. Streaming links open on their respective services.

Only add audio you own or have permission to distribute or use.

 Managing Creator Profiles

Creator names and photographs are read-only for visitors and are maintained by the site administrator.

Relevant locations include:

public/images/creators/
app/site-content.html
index.html

Store creator photographs in public/images/creators/.
Update the creator cards in app/site-content.html for the relevant site content.
Update index.html when changing the corresponding standalone static page.

The Next.js and standalone pages provide a historical image viewer for supported portraits and monuments. Selecting an image opens an enlarged, keyboard-accessible view with descriptive historical information.

There are no visitor-facing controls for editing creator names or photographs.

 Theme Preferences

Visitors can switch between Light Mode and Dark Mode through the fixed navigation.

The selected preference is remembered in the current browser, providing a more consistent experience when the visitor returns.

 Quiz Structure

The educational quiz contains 10 questions:

8 multiple-choice questions.
2 true-or-false questions.

The quiz provides an interactive way to review important events, historical figures, and concepts related to Rizal and the Philippine Revolution.

 Important Project Files
Path	Purpose
app/	Next.js application files and related site content
app/site-content.html	Creator cards and associated site content
public/images/creators/	Creator photographs
public/music/playlist.json	Curated listening-room playlist
public/music/README.md	Playlist format and music configuration guidance
forum-schema.sql	Supabase forum database schema and security configuration
index.html	Standalone static website
.env.local	Local environment variables; not committed to Git
package.json	npm scripts and project dependencies

File names and paths should be checked against the current repository if the project structure changes.

 Deployment

To publish the Next.js application:

Push the project to your Git repository.
Import the repository into a hosting platform that supports Next.js.
Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in the deployment environment if the forum is required.
Confirm that anonymous sign-ins, the database schema, and row-level security policies are configured correctly.
Deploy the application over HTTPS.
Test the timeline, quiz, theme switching, image viewer, listening room, and forum in the deployed environment.

The main website can operate without Supabase, but the shared forum requires the backend configuration described above.

 Privacy and Security
Never commit .env.local or other files containing private credentials.
Never place a Supabase service-role key in client-side code.
Keep row-level security enabled and review all database policies before deployment.
Use HTTPS for production deployments.
Protect anonymous sign-in with CAPTCHA where available.
Add only properly licensed or authorized media assets.
 Contributing

Contributions that improve historical accuracy, accessibility, usability, educational value, or technical reliability are welcome.

Before submitting a change:

Review the existing implementation and project conventions.
Test the affected features locally.
Verify historical claims and cite reliable references when adding factual content.
Avoid committing secrets, unauthorized media, or unnecessary personal information.
Describe your changes clearly when opening a pull request.
 Historical Accuracy

This project is intended for educational purposes. Historical interpretations should be supported by reliable sources, such as scholarly publications, archival materials, and reputable Philippine historical institutions.

Rizal's ideas, the Propaganda Movement, and the Philippine Revolution should be understood within their broader colonial and historical context.

 License

No license information is specified here. If you intend to allow others to reuse, modify, or distribute the project, add an appropriate LICENSE file and update this section.

 Acknowledgment

This project celebrates the life, ideas, and enduring legacy of Dr. José Rizal and the Filipino pursuit of education, unity, reform, and national freedom.

“The youth is the hope of our future.”

— A sentiment commonly associated with Rizal's legacy; verify the exact wording and attribution against a reliable historical source before using it as a direct quotation.

Explore history. Question ideas. Learn from the past.
