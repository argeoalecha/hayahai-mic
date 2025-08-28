export const createErrorMessage = (error: unknown, fallback = 'An unexpected error occurred'): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return fallback;
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('fetch') || 
           error.message.includes('network') || 
           error.message.includes('Failed to fetch');
  }
  return false;
};

export const createUserFriendlyError = (error: unknown): string => {
  const message = createErrorMessage(error);
  
  if (isNetworkError(error)) {
    return 'Network error. Please check your internet connection and try again.';
  }
  
  if (message.includes('API key')) {
    return 'YouTube API key issue. Please check your configuration.';
  }
  
  if (message.includes('quota')) {
    return 'YouTube API quota exceeded. Please try again later.';
  }
  
  return message;
};