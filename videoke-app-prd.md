# Videoke App - Product Requirements Document (PRD)

## 1. Executive Summary

### Product Vision
Create a web-based videoke application that leverages YouTube's karaoke video library to provide users with an interactive singing experience featuring search, queue management, voice detection, and scoring capabilities.

### Success Metrics
- **Phase 1**: 100+ active users, 50+ songs in rotation, 80% user session completion
- **Phase 2**: 1000+ active users, TV casting adoption >30%, average session length >15 minutes

### Target Launch
- **Phase 1 MVP**: 8 weeks from development start
- **Phase 2 Enhancement**: Additional 6 weeks

## 2. Problem Statement

### Current Pain Points
- Existing karaoke apps require expensive licensing or limited song libraries
- Physical karaoke systems are expensive and location-dependent
- No seamless solution for group videoke sessions using readily available content
- Poor user experience with complex setup requirements

### Opportunity
YouTube contains thousands of high-quality karaoke videos that can be legally embedded, providing a vast, free content library for karaoke applications.

## 3. Target Users

### Primary Persona: Social Singers
- **Demographics**: Ages 18-45, tech-savvy, social media active
- **Behavior**: Enjoys group activities, parties, social gatherings
- **Pain Points**: Limited access to karaoke venues, expensive karaoke equipment
- **Goals**: Easy-to-use karaoke experience for home parties and gatherings

### Secondary Persona: Solo Practitioners
- **Demographics**: Ages 16-35, aspiring singers, music enthusiasts
- **Behavior**: Practices singing alone, wants feedback on performance
- **Pain Points**: No convenient way to practice with backing tracks
- **Goals**: Improve singing skills with scoring feedback

## 4. Product Requirements

### Phase 1 MVP Requirements

#### 4.1 Core Features

**F1.1 YouTube Video Search & Integration**
- Search YouTube videos using "karaoke", "instrumental", "backing track" keywords
- Filter results by duration, view count, and upload date
- Integrate YouTube IFrame Player API for legal video embedding
- Display video thumbnails, titles, and basic metadata

**F1.2 Song Queue Management**
- Add songs to performance queue
- Reorder queue items via drag-and-drop
- Remove songs from queue
- Display current song and next 3 songs in queue
- Auto-advance to next song after completion

**F1.3 Basic Voice Detection**
- Capture user microphone input using Web Audio API
- Real-time audio visualization (waveform or volume meter)
- Basic pitch detection to confirm user is singing
- Mute/unmute microphone controls

**F1.4 Simple User Interface**
- Responsive web design for desktop and mobile
- Search bar with autocomplete suggestions
- Video player with basic controls (play, pause, volume)
- Queue sidebar with song list
- Minimal user profile (name entry only)

#### 4.2 Technical Requirements

**T1.1 Frontend Architecture**
- React 18+ with TypeScript
- Responsive CSS framework (Tailwind CSS)
- YouTube IFrame Player API integration
- Web Audio API for microphone access

**T1.2 Backend Architecture (Optional for MVP)**
- Node.js/Express server OR Firebase/Supabase
- Session storage for temporary queue management
- Basic logging and analytics

**T1.3 Performance Requirements**
- Page load time < 3 seconds
- Search results display < 2 seconds
- Video load time < 5 seconds on average connection
- Support for 10 concurrent users minimum

### Phase 2 Enhancement Requirements

#### 4.3 Advanced Features

**F2.1 Enhanced Scoring System**
- Pitch accuracy detection and scoring (0-100 scale)
- Timing accuracy measurement
- Real-time score display during performance
- Performance history and statistics
- Leaderboard for group sessions

**F2.2 TV Casting Capability**
- Chromecast integration for video display
- AirPlay support for Apple devices
- Mobile device as remote control interface
- Separate audio routing (vocals to phone, backing track to TV)

**F2.3 Curated Song Database**
- Manual curation of high-quality karaoke videos
- Lyrics synchronization with WebVTT format
- Song metadata (artist, genre, difficulty level)
- Popular songs recommendation engine
- Favorites and recently played tracking

**F2.4 Enhanced User Experience**
- User account creation and login
- Personal playlists and favorites
- Performance recording and playback
- Social sharing capabilities
- Group session management with host controls

#### 4.4 Advanced Technical Requirements

**T2.1 Enhanced Audio Processing**
- Advanced pitch detection algorithms
- Noise cancellation and audio filtering
- Real-time audio effects (reverb, echo)
- Multi-user audio mixing

**T2.2 Database and Storage**
- PostgreSQL or MongoDB for user data
- Redis for session management
- Cloud storage for performance recordings
- CDN for static assets

**T2.3 Scalability Requirements**
- Support for 100+ concurrent users
- Auto-scaling infrastructure
- Load balancing for multiple regions
- 99.5% uptime requirement

## 5. User Stories

### Phase 1 User Stories

**As a party host, I want to:**
- Search for karaoke songs quickly so I can set up entertainment
- Queue multiple songs so the party flows smoothly
- See what's coming up next so I can manage expectations

**As a singer, I want to:**
- Find backing tracks for my favorite songs easily
- See if my microphone is working before I start singing
- Control the video playback while performing

### Phase 2 User Stories

**As a competitive singer, I want to:**
- Get scored on my performance so I can improve
- Compare my scores with friends for fun competition
- Track my progress over time

**As a tech-savvy host, I want to:**
- Cast the video to my TV for better viewing
- Control everything from my phone while the TV shows the video
- Save our group's favorite songs for next time

## 6. Success Metrics & KPIs

### Phase 1 Metrics
- **User Engagement**: Average session duration >10 minutes
- **Feature Adoption**: Queue usage rate >70%
- **Technical Performance**: Video load success rate >95%
- **User Satisfaction**: User completion rate >80%

### Phase 2 Metrics
- **Advanced Feature Adoption**: Scoring feature usage >60%
- **Platform Growth**: TV casting usage >30% of sessions
- **User Retention**: Weekly active users growth >20%
- **Content Quality**: Curated songs usage >50% vs. search results

## 7. Technical Specifications

### 7.1 Architecture Overview
```
Frontend (React) ↔ YouTube API ↔ YouTube Videos
       ↕                ↕
Backend API ↔ Database ↔ User Data/Sessions
       ↕
Web Audio API ↔ Microphone Input
```

### 7.2 API Dependencies
- **YouTube Data API v3**: Search and metadata
- **YouTube IFrame Player API**: Video embedding and control
- **Web Audio API**: Microphone access and audio processing
- **Cast SDK**: Chromecast/casting functionality (Phase 2)

### 7.3 Data Models

**Song Object:**
```json
{
  "id": "youtube_video_id",
  "title": "Song Title - Artist",
  "duration": 240,
  "thumbnail": "thumbnail_url",
  "addedBy": "user_name",
  "queuePosition": 1
}
```

**Performance Object (Phase 2):**
```json
{
  "songId": "youtube_video_id",
  "userId": "user_id",
  "score": 85,
  "pitchAccuracy": 78,
  "timingAccuracy": 92,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## 8. Risk Assessment

### High Risk Items
- **YouTube API Limitations**: Rate limits and policy changes
- **Copyright Issues**: Lyrics display and content usage
- **Audio Processing Performance**: Real-time processing on various devices

### Mitigation Strategies
- Implement API rate limiting and caching
- Use only YouTube's provided captions, avoid third-party lyrics
- Optimize audio processing with Web Workers and fallback options

## 9. Implementation Timeline

### Phase 1 (8 weeks)
- **Weeks 1-2**: Project setup, YouTube API integration, basic search
- **Weeks 3-4**: Video player implementation, queue management
- **Weeks 5-6**: Voice detection, basic UI polish
- **Weeks 7-8**: Testing, deployment, MVP launch

### Phase 2 (6 weeks)
- **Weeks 1-2**: Scoring system implementation
- **Weeks 3-4**: TV casting integration
- **Weeks 5-6**: Curated database, enhanced UX, production deployment

## 10. Dependencies & Assumptions

### Critical Dependencies
- YouTube Data API availability and stability
- Browser support for Web Audio API
- Reliable internet connection for video streaming

### Key Assumptions
- Users have access to microphones (built-in or external)
- Target audience is comfortable with browser-based applications
- YouTube's karaoke video content remains accessible
- Legal compliance through official YouTube APIs

## 11. Post-Launch Considerations

### Monitoring & Analytics
- User engagement tracking
- Performance monitoring
- Error logging and alerting
- A/B testing framework for feature improvements

### Future Enhancements (Phase 3+)
- Mobile app development (React Native)
- Multi-language support
- Advanced vocal effects and filters
- Integration with music streaming services
- Commercial venue licensing options