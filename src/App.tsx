import { SearchBar } from './components/SearchBar';
import { SongResults } from './components/SongResults';
import { VideoPlayer } from './components/VideoPlayer';
import { QueueSidebar } from './components/QueueSidebar';
import { CompactQueue } from './components/CompactQueue';
import { ScoreDisplay } from './components/ScoreDisplay';
import { MicControls } from './components/MicControls';
import { useYouTubeSearch } from './hooks/useYouTubeSearch';
import { useQueue } from './hooks/useQueue';
import { useScoring } from './hooks/useScoring';
import type { YouTubeSong } from './types';
import React from 'react';

function App() {
  const { songs, isLoading, error, searchSongs } = useYouTubeSearch();
  const {
    queue,
    currentSong,
    currentSongIndex,
    nextSongs,
    addToQueue,
    removeFromQueue,
    reorderQueue,
    playNext,
    playPrevious,
    playSong,
    clearQueue,
  } = useQueue();
  
  const { score, isScoring, startScoring, stopScoring, resetScore } = useScoring();

  const handleSongSelect = (song: YouTubeSong) => {
    addToQueue(song);
    // If no song is currently playing, start playing the first song in queue
    if (currentSongIndex === -1) {
      // Use setTimeout to ensure the queue is updated first
      setTimeout(() => {
        playNext(); // This will play the first song (index 0)
      }, 0);
    }
  };

  const handleVideoEnd = () => {
    stopScoring();
    playNext();
  };

  const handleNextSong = () => {
    stopScoring();
    resetScore();
    playNext();
    if (currentSong) {
      setTimeout(() => startScoring(), 1000); // Start scoring after video loads
    }
  };

  // Start scoring when a new song begins playing
  React.useEffect(() => {
    if (currentSong && !isScoring) {
      setTimeout(() => startScoring(), 2000); // Give video time to load
    }
  }, [currentSong, isScoring, startScoring]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            🎤 YouTube Videoke
          </h1>
          <p className="text-xl text-blue-100 drop-shadow-md">Sing your heart out with thousands of karaoke tracks</p>
        </div>
        
        {/* Search Bar - Always at top */}
        <SearchBar onSearch={searchSongs} isLoading={isLoading} />
        
        {/* Show search results - always visible when there are results or loading/error states */}
        {(songs.length > 0 || isLoading || error) && (
          <SongResults 
            songs={songs}
            onSongSelect={handleSongSelect}
            isLoading={isLoading}
            error={error}
          />
        )}

        {/* Main karaoke interface - only show when playing */}
        {currentSong && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Queue Sidebar - Left side */}
            <div className="lg:col-span-3">
              <QueueSidebar
                queue={queue}
                currentSongIndex={currentSongIndex}
                nextSongs={nextSongs}
                onPlaySong={playSong}
                onRemoveFromQueue={removeFromQueue}
                onReorderQueue={reorderQueue}
                onClearQueue={clearQueue}
                onNext={playNext}
                onPrevious={playPrevious}
              />
            </div>

            {/* Video Player - Center */}
            <div className="lg:col-span-6 space-y-6">
              <VideoPlayer currentSong={currentSong} onVideoEnd={handleVideoEnd} />
              
              {/* Microphone Controls */}
              <MicControls 
                onVolumeChange={(volume) => console.log('Volume:', volume)}
                onMuteToggle={(muted) => console.log('Muted:', muted)}
              />
            </div>

            {/* Score and Controls - Right side */}
            <div className="lg:col-span-3 space-y-6">
              <ScoreDisplay 
                score={score}
                onNextSong={handleNextSong}
                isNextDisabled={currentSongIndex >= queue.length - 1}
              />
            </div>
          </div>
        )}

        {/* Compact Queue for mobile/smaller screens when playing */}
        {currentSong && (
          <div className="lg:hidden mt-6">
            <CompactQueue
              currentSong={currentSong}
              nextSongs={nextSongs}
              onNext={handleNextSong}
              onPrevious={playPrevious}
              currentSongIndex={currentSongIndex}
              queueLength={queue.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;