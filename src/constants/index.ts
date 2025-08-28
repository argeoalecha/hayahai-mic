export const YOUTUBE_CONFIG = {
  API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY_HERE',
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  MAX_SEARCH_RESULTS: 6, // Increased to account for filtering out non-embeddable videos
  MAX_DISPLAY_RESULTS: 3, // Still only show 3 to user
  EMBED_BASE_URL: 'https://www.youtube.com/embed',
  TRUSTED_ORIGINS: ['https://www.youtube.com', 'https://www.youtube-nocookie.com'] as const
} as const;

export const QUEUE_CONFIG = {
  MAX_NEXT_SONGS_PREVIEW: 3,
  DEFAULT_USER_NAME: 'User'
} as const;

export const UI_CONFIG = {
  SEARCH_DEBOUNCE_MS: 300,
  ANIMATION_DURATION_MS: 200,
  MAX_TITLE_LENGTH: 100
} as const;

export const YOUTUBE_PLAYER_EVENTS = {
  VIDEO_ENDED: 0,
  VIDEO_PLAYING: 1,
  VIDEO_PAUSED: 2
} as const;