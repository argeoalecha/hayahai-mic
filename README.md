# 🎤 YouTube Videoke App

A professional karaoke application built with **Next.js 14** + **TypeScript** that lets you search for songs on YouTube and create karaoke playlists with real-time scoring and microphone controls.

## ✨ Features

- **🎵 YouTube Integration**: Search for karaoke songs with automatic embedding support
- **🚫 Smart Filtering**: Only shows embeddable videos (no "Video unavailable" errors)  
- **📝 Queue Management**: Drag-and-drop song reordering, auto-advance between songs
- **⚡ Real-time Scoring**: Live scoring system (0-100) with performance metrics
- **🎤 Microphone Controls**: Volume slider, mute, audio visualization
- **🎨 Modern UI**: Beautiful blue gradient design with glass-morphism effects
- **📱 Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **🏗️ Professional Architecture**: Next.js 14 App Router, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: React Spring
- **YouTube**: React YouTube + YouTube Data API v3
- **Audio**: Web Audio API
- **Testing**: Playwright
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- YouTube Data API v3 key (see setup below)

### 1. Clone & Install
```bash
git clone <your-repository-url>
cd videoke-app
npm install
```

### 2. Set Up YouTube API Key (Next.js Format)
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Create `.env.local` file:
```bash
cp .env.example .env.local
```
6. Edit `.env.local` and replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key:
```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
```

### 3. Run the Next.js App
```bash
npm run dev
```
Open **http://localhost:3000** in your browser

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
