import React, { useEffect, useRef } from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';
import { ThemeMode } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
  theme: ThemeMode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
  theme,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus input if user presses '/' or 'Cmd+K' / 'Ctrl+K' when not in another input
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sticky top-16 z-30 w-full pt-3 pb-2 backdrop-blur-xl transition-all duration-300">
      <div className="relative flex items-center w-full">
        <Search
          size={18}
          className="absolute left-4 text-purple-400 pointer-events-none"
        />

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search AI tools, prompts, courses, dev utilities... (Press '/' to focus)"
          className={`w-full pl-11 pr-24 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 outline-none ${
            theme === 'dark'
              ? 'bg-[#181028]/90 text-white placeholder-purple-300/50 border border-purple-500/25 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 shadow-lg shadow-purple-950/50'
              : 'bg-white text-gray-900 placeholder-purple-950/40 border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-md'
          }`}
          id="sticky-search-input"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="p-1.5 rounded-xl hover:bg-purple-500/20 text-purple-300 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Sparkles size={11} className="text-purple-400" />
              <span>/</span>
            </span>
          )}
        </div>
      </div>

      {searchQuery && (
        <div className="mt-2 text-xs font-medium text-purple-300/80 flex items-center justify-between px-1">
          <span>
            Showing <strong className="text-purple-300">{resultCount}</strong> of{' '}
            {totalCount} resources matching "{searchQuery}"
          </span>
          <button
            onClick={() => onSearchChange('')}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};
