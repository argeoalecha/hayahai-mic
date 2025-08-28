# 🎤 YouTube Videoke App

A modern karaoke application built with React + TypeScript + Vite that lets you search for songs on YouTube and create karaoke playlists with real-time scoring.

## ✨ Features

- **YouTube Integration**: Search for karaoke songs with automatic embedding support
- **Smart Filtering**: Only shows embeddable videos (no "Video unavailable" errors)
- **Queue Management**: Drag-and-drop song reordering, auto-advance between songs
- **Real-time Scoring**: Live scoring system with microphone controls
- **Modern UI**: Beautiful blue gradient design with glass-morphism effects
- **Responsive Design**: Works on desktop and mobile devices
- **Three-Panel Interface**: Professional karaoke layout (Queue | Video | Score)

## 🚀 Quick Start for External Testers

### Prerequisites
- Node.js 18+ installed
- YouTube Data API v3 key (see setup below)

### 1. Clone & Install
```bash
git clone [repository-url]
cd videoke-app
npm install
```

### 2. Set Up YouTube API Key
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
6. Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key

### 3. Run the App
```bash
npm run dev
```
Open http://localhost:5173 in your browser

## 🧪 Testing Guide

### Core Features to Test
1. **Search**: Try searching for popular songs (e.g., "Yesterday Beatles", "Bohemian Rhapsody")
2. **Queue Management**: Add multiple songs, drag to reorder, remove songs
3. **Playback**: Videos should auto-play and advance to next song
4. **Scoring**: Watch the score change during playback
5. **Microphone**: Test volume controls and mute functionality
6. **Responsive**: Test on different screen sizes

### Expected Behavior
- ✅ All returned videos should be playable (no embedding restrictions)
- ✅ Queue should update immediately when adding songs
- ✅ Search should work even when a song is playing
- ✅ Videos should auto-advance when finished
- ✅ Drag-and-drop should reorder queue smoothly

### Known Limitations
- Requires active internet connection
- YouTube API has daily quota limits
- Some videos may still fail due to regional restrictions

## 🛠️ Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run preview    # Preview production build
npm run lint       # Check code quality
```

## 📁 Project Structure
```
src/
├── components/     # React components
├── hooks/         # Custom React hooks  
├── types/         # TypeScript definitions
├── constants/     # App configuration
└── utils/         # Helper functions
```

## 🔒 Security Notes
- API keys are stored in environment variables
- `.env` files are excluded from git
- Only embeddable videos are displayed to users

## 🐛 Issue Reporting
If you encounter any issues during testing, please report:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Console errors (if any)

## 📞 Support
For technical issues or questions during testing, contact the development team.
