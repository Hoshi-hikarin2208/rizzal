# Admin-curated MP3 playlist

Only the site admin manages this playlist in the project files. Visitors can select and play its entries, but cannot add or upload songs. Add MP3 files you have permission to use to this folder, then add one entry per song to `playlist.json`.

```json
{
  "tracks": [
    {
      "name": "Song title",
      "artist": "Artist name",
      "src": "/music/song-file.mp3"
    }
  ]
}
```

Use one entry per file. The `src` must be a local path under `/music/`, end in `.mp3`, and match the filename exactly. Add only content you have permission to share.
