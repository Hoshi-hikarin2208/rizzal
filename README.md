# Rizal: The Power of Ideas, Unity & Revolution

An interactive history website exploring the life, ideas, and legacy of Dr. José Rizal, one of the Philippines' most influential national heroes. It covers the Propaganda Movement, the founding of La Liga Filipina, his exile in Dapitan, and the events surrounding the Philippine Revolution.

---

## 🔗 GitHub Repository

### 👉 **https://github.com/Hoshi-hikarin2208/rizzal** 👈

Click **Code** (green button) → **Download ZIP**, or clone it with Git.

---

## 🚀 How to Open It Locally

Pick **one** of the two options below.

### Option A: Quick Open (no installation)

Use this if you just want to view the site.

1. Go to **https://github.com/Hoshi-hikarin2208/rizzal**
2. Click the green **`<> Code`** button.
3. Click **Download ZIP**.
4. Right-click the downloaded ZIP and choose **Extract All** (Windows) or double-click it (Mac).
5. Open the extracted folder.
6. **Double-click `index.html`**. It opens in your browser.

> This opens the standalone static version. The shared community forum needs Supabase and will only show setup guidance in this mode. Everything else works.

### Option B: Full Next.js App (recommended for developers)

**Before you start, install:**
- [Node.js](https://nodejs.org) (npm comes with it)
- [Git](https://git-scm.com) (optional, only needed for cloning)

**Steps:**

1. Open a terminal (Command Prompt, PowerShell, Terminal, or the VS Code terminal).
2. Clone the repository and enter the folder:
   ```bash
   git clone https://github.com/Hoshi-hikarin2208/rizzal.git
   cd rizzal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. **Click or open this link in your browser:**

   👉 **http://localhost:3000**

To stop the server, press `Ctrl + C` in the terminal.

> The main website runs without any Supabase setup. Only the community forum needs it (see [Setting Up the Community Forum](#-setting-up-the-community-forum)).

---

## ✨ Features

- **Interactive Historical Timeline**: Explore key events in Rizal's life and why they matter.
- **Educational Quiz**: 10 questions (8 multiple-choice, 2 true-or-false).
- **Listening Room**: Play local audio files or open approved Spotify and YouTube links.
- **Community Forum**: Post, reply, like, sort, refresh, and delete your own posts and replies.
- **Light and Dark Modes**: Switch from the fixed navigation; your choice is remembered in the browser.
- **Historical Image Viewer**: Click a portrait or monument for an enlarged, keyboard-accessible view with a caption and its connection to Rizal.
- **History Memes**: A lighter, more informal take on historical topics.
- **Creator Profiles**: Names and photos managed by the site administrator.
- **Standalone Static Page**: A standalone version (`index.html`) alongside the Next.js app.

## 📚 Historical Topics

- **The Propaganda Movement**: The campaign for reforms and equal rights under Spanish colonial rule.
- **La Liga Filipina**: Rizal's organization promoting unity, mutual aid, and peaceful reform.
- **Exile in Dapitan**: His work in education, medicine, agriculture, and community development.
- **The Philippine Revolution**: The historical context of the revolution and Rizal's influence on Filipino nationalism.
- **Rizal's Legacy**: His lasting contributions to Filipino identity and civic consciousness.

## 🛠 Technology

| Tool | Use |
|------|-----|
| Next.js | Web application framework |
| JavaScript, HTML, CSS | Functionality and presentation |
| Supabase | Authentication and database for the community forum |
| JSON | Listening-room playlist configuration |

Exact versions are defined in `package.json`.

---

## 💬 Setting Up the Community Forum

The forum is optional. Without Supabase, the site shows setup guidance and every other feature still works.

1. **Create a Supabase project** at [supabase.com](https://supabase.com) and copy its project URL and publishable key.
2. **Create `.env.local`** in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```
   Keep this file private. It is ignored by Git. Never put a Supabase **service-role** key in frontend code.
3. **Enable anonymous sign-ins:** Supabase dashboard → **Authentication → Sign In / Providers** → turn on **Anonymous Sign-Ins** → Save.
4. **Apply the database schema:** open the Supabase **SQL Editor** and run `forum-schema.sql`. If the forum was set up before, run it again to apply updated grants. Keep **Row-Level Security (RLS)** enabled.
5. **Restart** `npm run dev`.

### Forum security and moderation

A public anonymous forum can attract spam or abuse. Recommended precautions:

- Enable Supabase CAPTCHA for anonymous sign-ins where available.
- Review database policies and grants before deployment.
- Monitor discussions and handle abuse through appropriate administrative steps.
- Rotate credentials or disable public access if abuse becomes a problem.

**Limitation:** There is no dedicated moderator tooling. Database policies are not a substitute for content moderation.

---

## 🎵 Managing the Listening Room

```
public/
└── music/
    ├── playlist.json
    └── README.md
```

1. Add permitted audio files to `public/music/`.
2. Update `public/music/playlist.json` using the format in `public/music/README.md`.
3. Or add supported HTTPS Spotify or YouTube links.
4. Check that every entry points to a valid file or link.

Visitors can only pick from the approved playlist; they cannot upload songs. Local files play in the site's player, and streaming links open on their own services. Only add audio you own or have permission to use.

## 🖼 Managing Creator Profiles

Creator names and photos are read-only for visitors.

1. Put photos in `public/images/creators/`.
2. Edit the creator cards in `app/site-content.html`.
3. Edit `index.html` to update the standalone page too.

## 🎨 Theme Preferences

Use the fixed navigation to switch between Light and Dark Mode. Your choice is remembered in your current browser.

## 📝 Quiz Structure

10 questions: 8 multiple-choice and 2 true-or-false, covering key events, figures, and concepts around Rizal and the Philippine Revolution.

## 📁 Important Project Files

| Path | Purpose |
|------|---------|
| `app/` | Next.js application files and site content |
| `app/site-content.html` | Creator cards and site content |
| `public/images/creators/` | Creator photographs |
| `public/music/playlist.json` | Listening-room playlist |
| `public/music/README.md` | Playlist format guide |
| `forum-schema.sql` | Supabase forum schema and security setup |
| `index.html` | Standalone static website |
| `.env.local` | Local environment variables (not committed) |
| `package.json` | npm scripts and dependencies |

Check paths against the current repository if the structure changes.

## 🌐 Deployment

1. Push the project to your Git repository.
2. Import it into a host that supports Next.js (such as Vercel).
3. If you want the forum, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the host's environment settings.
4. Confirm anonymous sign-ins, the schema, and RLS policies are set up.
5. Deploy over **HTTPS**.
6. Test the timeline, quiz, theme switching, image viewer, listening room, and forum on the deployed site.

## 🔒 Privacy and Security

- Never commit `.env.local` or any file with private credentials.
- Never put a Supabase service-role key in client-side code.
- Keep RLS enabled and review all policies before deployment.
- Use HTTPS in production.
- Protect anonymous sign-in with CAPTCHA where available.
- Only add properly licensed or authorized media.

## 🤝 Contributing

Contributions that improve historical accuracy, accessibility, usability, educational value, or reliability are welcome.

Before submitting a change:

1. Review the existing code and conventions.
2. Test affected features locally.
3. Verify historical claims and cite reliable references.
4. Avoid committing secrets, unauthorized media, or unnecessary personal information.
5. Describe your changes clearly in the pull request.

## 📖 Historical Accuracy

This project is for educational purposes. Interpretations should be backed by reliable sources such as scholarly publications, archival materials, and reputable Philippine historical institutions. Rizal's ideas, the Propaganda Movement, and the Revolution should be understood in their broader colonial context.

## 📄 License

No license has been specified yet. To allow others to reuse, modify, or distribute this project, add a `LICENSE` file and update this section.

## 🙏 Acknowledgment

This project celebrates the life, ideas, and legacy of Dr. José Rizal and the Filipino pursuit of education, unity, reform, and national freedom.

> "The youth is the hope of our future."
> A sentiment commonly associated with Rizal's legacy. Verify the exact wording and attribution against a reliable historical source before using it as a direct quotation.

**Explore history. Question ideas. Learn from the past.**
