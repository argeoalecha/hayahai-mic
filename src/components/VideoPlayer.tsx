import React, { useEffect, useRef } from 'react';
import type { YouTubeSong } from '../types';
import type { YouTubePlayerEvent } from '../types/youtube';
import { YOUTUBE_CONFIG, YOUTUBE_PLAYER_EVENTS } from '../constants';

interface VideoPlayerProps {
  currentSong: YouTubeSong | null;
  onVideoEnd?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentSong, onVideoEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for YouTube player events via postMessage
    const handleMessage = (event: MessageEvent) => {
      const trustedOrigins: readonly string[] = YOUTUBE_CONFIG.TRUSTED_ORIGINS;
      if (!trustedOrigins.includes(event.origin)) {
        return;
      }
      
      if (event.data && typeof event.data === 'string') {
        try {
          const data: YouTubePlayerEvent = JSON.parse(event.data);
          if (data.event === 'video-event' && data.info === YOUTUBE_PLAYER_EVENTS.VIDEO_ENDED) {
            onVideoEnd?.();
          }
        } catch {
          // Ignore parsing errors for non-JSON messages
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onVideoEnd]);

  if (!currentSong) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-blue-200/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-3xl"></div>
        <div className="py-16 text-gray-400">
          <div className="text-6xl mb-4">🎤</div>
          <h3 className="text-xl font-medium">Ready to sing?</h3>
          <p>Search for songs and add them to your queue!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-blue-200/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-3xl"></div>
      <div className="bg-gradient-to-r from-blue-500 to-sky-500 text-white p-4 rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-3xl"></div>
        <h3 className="text-2xl font-bold relative z-10">
          🎵 Now Playing
        </h3>
        <p className="text-lg mt-2 font-medium relative z-10">{currentSong.title}</p>
      </div>
      <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`${YOUTUBE_CONFIG.EMBED_BASE_URL}/${currentSong.id}?autoplay=1&controls=1&enablejsapi=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="mt-6 bg-blue-50 p-4 rounded-2xl border border-blue-200/50">
        <p className="text-blue-700 font-medium">
          🎤 Grab your mic and start singing! Use YouTube controls for volume.
        </p>
      </div>
    </div>
  );
};