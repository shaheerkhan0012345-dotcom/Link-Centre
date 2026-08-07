import React from 'react';
import { Sun, Moon, Share2, QrCode, Settings } from 'lucide-react';
import { ThemeMode, Profile } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenShare: () => void;
  onOpenQR: () => void;
  onOpenAdmin: () => void;
  profile: Profile;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenShare,
  onOpenQR,
  onOpenAdmin,
  profile,
}) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b-0 ${
      theme === 'dark' ? 'bg-[#13101c]/80 text-white' : 'bg-[#e0cef8]/80 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-sm">
            {profile.name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
              {profile.name}
            </span>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block">
              {profile.handle}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Share Profile Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 bg-gray-200/60 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 active:scale-95 cursor-pointer border-0"
            title="Share Profile"
            id="navbar-share-btn"
          >
            <Share2 size={14} />
            <span className="hidden xs:inline">Share</span>
          </button>

          {/* QR Code Button */}
          <button
            onClick={onOpenQR}
            className="p-2 rounded-xl text-xs font-semibold transition-all duration-200 bg-gray-200/60 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 active:scale-95 cursor-pointer border-0"
            title="QR Code"
            id="navbar-qr-btn"
          >
            <QrCode size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-xs font-semibold transition-all duration-200 bg-gray-200/60 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 active:scale-95 cursor-pointer border-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="navbar-theme-toggle"
          >
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-purple-600" />}
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5 border-0"
            title="Open Admin Studio"
            id="navbar-admin-btn"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">Studio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
