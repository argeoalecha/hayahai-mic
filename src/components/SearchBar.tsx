import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery !== lastSearched) {
      onSearch(debouncedQuery.trim());
      setLastSearched(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, lastSearched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && query !== lastSearched) {
      onSearch(query.trim());
      setLastSearched(query);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl mb-8 border border-blue-200/30 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-t-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      <form onSubmit={handleSubmit} className="flex gap-4 relative z-10">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs (e.g., 'Bohemian Rhapsody', 'Let it Go')"
            className="w-full px-6 py-4 border border-blue-200/50 rounded-2xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:bg-white/95"
            disabled={isLoading}
          />
          {query && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
              </svg>
              Searching
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </span>
          )}
        </button>
      </form>
    </div>
  );
};