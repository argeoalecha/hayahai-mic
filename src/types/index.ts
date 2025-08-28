export interface YouTubeSong {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration?: string;
}

export interface QueueItem extends YouTubeSong {
  queueId: string;
  queuePosition: number;
  addedBy: string;
  addedAt: Date;
}

export interface SearchState {
  isLoading: boolean;
  error: string;
  hasSearched: boolean;
}

export interface PlayerState {
  isReady: boolean;
  error: string | null;
}