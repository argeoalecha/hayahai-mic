export const createErrorMessage = (error: unknown, fallback = 'An unexpected error occurred'): string => {
  return error instanceof Error ? error.message : typeof error === 'string' ? error : fallback;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error ? /fetch|network|failed to fetch/i.test(error.message) : false;
};

export const createUserFriendlyError = (error: unknown): string => {
  const message = createErrorMessage(error);

  switch (true) {
    case isNetworkError(error):
      return 'Network error. Please check your internet connection and try again.';
    case /api key/i.test(message):
      return 'YouTube API key issue. Please check your configuration.';
    case /quota/i.test(message):
      return 'YouTube API quota exceeded. Please try again later.';
    default:
      return message;
  }
};