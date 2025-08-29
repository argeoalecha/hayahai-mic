'use client'

import { SearchBar } from '../src/components/SearchBar'
import { SongResults } from '../src/components/SongResults'
import { VideoPlayer } from '../src/components/VideoPlayer'
import { QueueSidebar } from '../src/components/QueueSidebar'
import { CompactQueue } from '../src/components/CompactQueue'
import { ScoreDisplay } from '../src/components/ScoreDisplay'
import { MicControls } from '../src/components/MicControls'
import { useYouTubeSearch } from '../src/hooks/useYouTubeSearch'
import { useQueue } from '../src/hooks/useQueue'
import { usePerformanceScoring } from '../src/hooks/usePerformanceScoring'
import type { YouTubeSong } from '../src/types'
import React from 'react'

export default function Home() {
  const { songs, isLoading, error, searchSongs } = useYouTubeSearch()
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
  } = useQueue()

  const { score, isScoring, startScoring, stopScoring, resetScore, metrics, debugInfo, songStartTime } =
    usePerformanceScoring()

  const handleSongSelect = (song: YouTubeSong) => {
    addToQueue(song)
  }

  // When a song is added to an empty queue, start playing it
  React.useEffect(() => {
    if (queue.length === 1 && currentSongIndex === -1) {
      playNext()
    }
  }, [queue, currentSongIndex, playNext])

  const handleVideoEnd = () => {
    stopScoring()
    playNext()
  }

  const handleVideoPlay = () => {
    if (!isScoring) {
      startScoring()
    }
  }

  const handleNextSong = () => {
    stopScoring()
    resetScore()
    playNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Header - only show when no queue */}
        {queue.length === 0 && (
          <div className="text-center mb-12">
            <div className="relative">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4 drop-shadow-lg animate-pulse">
                🎤 YouTube Videoke
              </h1>
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>
            <p className="text-xl text-blue-100 drop-shadow-md mb-6">Sing your heart out with thousands of karaoke tracks!</p>
            <div className="flex justify-center space-x-6 text-blue-200/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                <span className="text-sm">Search & Add</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                <span className="text-sm">Sing Along</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-sm">Get Scored</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar - Always visible */}
        <div className="mb-8">
          <SearchBar onSearch={searchSongs} isLoading={isLoading} />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Search Results & Queue */}
          <div className="lg:col-span-4 space-y-6">
            {/* Compact Header when queue exists */}
            {queue.length > 0 && (
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                  🎤 Queue
                </h2>
              </div>
            )}

            {/* Search Results */}
            {(songs.length > 0 || isLoading || error) && (
              <SongResults songs={songs} onSongSelect={handleSongSelect} isLoading={isLoading} error={error} />
            )}

            {/* Queue Sidebar */}
            {queue.length > 0 && (
              <QueueSidebar
                queue={queue}
                currentSongIndex={currentSongIndex}
                onPlaySong={playSong}
                onRemoveFromQueue={removeFromQueue}
                onReorderQueue={reorderQueue}
                onClearQueue={clearQueue}
                onNext={playNext}
                onPrevious={playPrevious}
              />
            )}
          </div>

          {/* Right Column - Video & Score */}
          {queue.length > 0 && (
            <div className="lg:col-span-8">
              {/* Video Player Container - Relative positioning for fullscreen overlay */}
              <div className="relative">
                {/* Video Player Area */}
                {currentSong ? (
                  <div className="space-y-6">
                    <VideoPlayer currentSong={currentSong} onVideoEnd={handleVideoEnd} onVideoPlay={handleVideoPlay} />

                    {/* Microphone Controls */}
                    <MicControls
                      onVolumeChange={(volume) => console.log('Volume:', volume)}
                      onMuteToggle={(muted) => console.log('Muted:', muted)}
                    />
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">🎵</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Sing!</h3>
                    <p className="text-blue-100">Select a song from your queue to start the show</p>
                  </div>
                )}

                {/* Score Display - Positioned for fullscreen visibility */}
                <div className="mt-6 relative z-50">
                  <ScoreDisplay
                    score={score}
                    onNextSong={handleNextSong}
                    isNextDisabled={currentSongIndex >= queue.length - 1}
                    metrics={metrics}
                    debugInfo={debugInfo}
                    songStartTime={songStartTime}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Queue for mobile/smaller screens */}
        {queue.length > 0 && (
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
  )
}