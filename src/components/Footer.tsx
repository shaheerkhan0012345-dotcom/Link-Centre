import React from 'react';
import { Instagram, Github, Linkedin, Mail, Heart, Sparkles, Settings } from 'lucide-react';
import { Profile, ThemeMode } from '../types';

interface FooterProps {
  profile: Profile;
  theme: ThemeMode;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, theme, onOpenAdmin }) => {
  return (
    <footer className="w-full py-10 mt-16 border-t transition-colors duration-300 border-purple-500/15">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Branding & Made with Love */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold flex items-center justify-center sm:justify-start gap-1.5 text-[#2e1065]">
            <span>Made with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by</span>
            <span className="font-bold text-purple-800">
              {profile.name}
            </span>
          </p>
          <p className="text-xs text-purple-900/70 mt-1">
            High-converting Link Center for AI creators & developers.
          </p>
        </div>

        {/* Center Social Links */}
        <div className="flex items-center gap-3">
          {profile.instagramUrl && (
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-purple-900 hover:text-purple-950 hover:bg-purple-900/10 transition-colors"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
          )}
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-purple-900 hover:text-purple-950 hover:bg-purple-900/10 transition-colors"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-purple-900 hover:text-purple-950 hover:bg-purple-900/10 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-xl text-purple-900 hover:text-purple-950 hover:bg-purple-900/10 transition-colors"
              title="Email"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        {/* Right Studio Button */}
        <button
          onClick={onOpenAdmin}
          className="text-xs font-semibold text-purple-900 hover:text-purple-950 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/10 hover:bg-purple-900/20 border border-purple-900/20 transition-colors cursor-pointer"
        >
          <Settings size={13} />
          <span>Admin Link Studio</span>
        </button>
      </div>
    </footer>
  );
};
