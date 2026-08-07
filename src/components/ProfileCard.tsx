import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Check,
  Copy,
} from 'lucide-react';
import { Profile, ThemeMode } from '../types';

interface ProfileCardProps {
  profile: Profile;
  theme: ThemeMode;
  onToggleTheme: () => void;
  totalLinksCount: number;
  totalClicksCount: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  theme,
  onToggleTheme,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full lg:sticky lg:top-24 p-2 sm:p-4 flex flex-col items-center text-center transition-all duration-300"
      id="profile-card-container"
    >
      {/* Profile Picture - Natural & Clean */}
      <div className="relative mb-4 mt-2">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md border-0 ring-4 ring-purple-600/20">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-[#2e1065]">
        {profile.name}
      </h1>
      
      {/* Bio / Welcome Line */}
      <p className="text-sm font-semibold text-purple-900/80 mb-5 max-w-sm flex items-center justify-center gap-1.5">
        <span>Welcome to my Link Center</span>
        <span className="inline-block animate-bounce">🚀</span>
      </p>

      {/* Instagram Button */}
      <a
        href={profile.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-[200px] py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 active:scale-98 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 mb-4 cursor-pointer flex items-center justify-center gap-2"
        title="Follow on Instagram"
        id="profile-instagram-follow-btn"
      >
        <Instagram size={20} />
        <span>Instagram</span>
      </a>

      {/* Copy Link Footer Trigger */}
      <button
        onClick={handleCopyProfileLink}
        className="w-full max-w-[200px] mt-1 py-2 px-3 rounded-xl text-xs font-semibold text-purple-900/70 hover:text-purple-950 transition-colors flex items-center justify-center gap-2 hover:bg-purple-900/10 cursor-pointer"
        id="profile-copy-link-btn"
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-400" />
            <span className="text-emerald-400">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Copy Bio Center Link</span>
          </>
        )}
      </button>
    </motion.aside>
  );
};
