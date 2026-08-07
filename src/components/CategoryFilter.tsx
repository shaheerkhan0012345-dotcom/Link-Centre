import React from 'react';
import { Category, ThemeMode } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  getCategoryCount: (categoryId: string) => number;
  totalCount: number;
  theme: ThemeMode;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  getCategoryCount,
  totalCount,
  theme,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 my-2 flex items-center gap-2">
      {/* All pill */}
      <button
        onClick={() => onSelectCategory('all')}
        className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-lg shadow-purple-900/30 scale-105'
            : theme === 'dark'
            ? 'bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/15'
            : 'bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 shadow-sm'
        }`}
        id="category-pill-all"
      >
        <span>✨ All Resources</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
            selectedCategory === 'all'
              ? 'bg-white/20 text-white'
              : 'bg-purple-500/15 text-purple-300'
          }`}
        >
          {totalCount}
        </span>
      </button>

      {/* Individual category pills */}
      {categories.map((cat) => {
        const count = getCategoryCount(cat.id);
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-lg shadow-purple-900/30 scale-105'
                : theme === 'dark'
                ? 'bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/15'
                : 'bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 shadow-sm'
            }`}
            id={`category-pill-${cat.id}`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.name}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-500/15 text-purple-300'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
