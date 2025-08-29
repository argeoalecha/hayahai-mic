import React from 'react';
import type { YouTubeSong } from '../types';

interface SongResultsProps {
  songs: YouTubeSong[];
  onSongSelect: (song: YouTubeSong) => void;
  isLoading: boolean;
  error: string;
}

const LoadingState = () => (
  <div className="text-blue-600 italic text-lg animate-pulse">🔍 Searching for karaoke versions...</div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="text-red-600 bg-red-50 p-6 rounded-2xl border border-red-200">
    <strong>Search failed:</strong> {error}<br />
    <small>Check your API key and internet connection.</small>
  </div>
);

const NoResultsState = () => (
  <div className="text-orange-600 bg-orange-50 p-6 rounded-2xl border border-orange-200">
    No karaoke songs found. Try a different search term!
  </div>
);

const Results = ({ songs, onSongSelect }: { songs: YouTubeSong[], onSongSelect: (song: YouTubeSong) => void }) => (
  <div className="grid gap-4">
    {songs.map((song) => (
      <div
        key={song.id}
        className="p-6 bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200/50 rounded-2xl hover:from-blue-100 hover:to-sky-100 hover:border-blue-400 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-bl-2xl"></div>
        <div className="font-semibold text-lg text-gray-900 mb-2 relative z-10">{song.title}</div>
        <div className="text-blue-600 font-medium mb-4 relative z-10">by {song.channelTitle}</div>
        <button
          onClick={() => onSongSelect(song)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-sky-600 transform hover:scale-105 transition-all duration-200 shadow-md relative z-10"
        >
          ➕ Add to Queue
        </button>
      </div>
    ))}
  </div>
);

export const SongResults: React.FC<SongResultsProps> = ({ 
  songs, 
  onSongSelect, 
  isLoading, 
  error 
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} />;
    }

    if (songs.length === 0) {
      return <NoResultsState />;
    }

    return <Results songs={songs} onSongSelect={onSongSelect} />;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-blue-200/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-3xl"></div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        🎵 Search Results
      </h3>
      {renderContent()}
    </div>
  );
};