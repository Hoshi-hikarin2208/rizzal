# Admin-managed music library

Only the site admin manages this playlist in the project files. Visitors can select its entries, but cannot add or upload songs. Add audio files you have permission to use to this folder, then add one entry per song to `playlist.json`.

```json
{
  "tracks": [
    {
      "name": "Local song title",
      "artist": "Artist name",
      "src": "/music/song-file.mp3"
    },
    {
      "name": "Spotify song title",
      "artist": "Artist name",
      "platform": "spotify",
      "url": "https://open.spotify.com/track/your-track-id"
    },
    {
      "name": "YouTube song title",
      "artist": "Artist name",
      "platform": "youtube",
      "url": "https://www.youtube.com/watch?v=your-video-id"
    }
  ]
}
```

Local audio paths must begin with `/music/` and match the filename exactly. MP3 is the safest choice across browsers. Spotify and YouTube entries open the song on that service; use an HTTPS URL from the matching service. Add only content you have permission to share.
