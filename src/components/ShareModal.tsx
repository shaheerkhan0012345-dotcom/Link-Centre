import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  Check,
  Share2,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  Mail,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Profile, ThemeMode } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  theme: ThemeMode;
  onOpenQR: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  profile,
  theme,
  onOpenQR,
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Check out ${profile.name}'s Link Center - curated AI tools, dev utilities & resources!`;

  const socialShares = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'bg-black text-white hover:bg-gray-800',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`,
      color: 'bg-emerald-600 text-white hover:bg-emerald-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'bg-blue-600 text-white hover:bg-blue-500',
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'bg-sky-500 text-white hover:bg-sky-400',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(`${profile.name}'s Link Center`)}&body=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`,
      color: 'bg-purple-600 text-white hover:bg-purple-500',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 relative border shadow-2xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#181028] text-white border-purple-500/20'
              : 'bg-white text-gray-900 border-purple-200'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-purple-400 hover:bg-purple-500/10 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Share2 size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Share Link Center</h2>
          </div>
          <p className="text-xs text-purple-300/70 mb-6">
            Share Shaheer's hub directly with your community or social channels.
          </p>

          {/* Open Graph Card Simulation */}
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 mb-6 flex items-center gap-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/40"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Link Center Preview
              </p>
              <h4 className="font-bold text-sm text-white truncate">{profile.name}</h4>
              <p className="text-xs text-purple-200/70 truncate">{profile.title}</p>
            </div>
          </div>

          {/* Copy Link Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-purple-300/80 mb-2">
              Direct Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono bg-purple-950/60 border border-purple-500/20 text-purple-200 outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick Social Shares */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-purple-300/80 mb-2">
              Share to Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {socialShares.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md ${social.color}`}
                  >
                    <Icon size={14} />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Open QR Code Option */}
          <button
            onClick={() => {
              onClose();
              onOpenQR();
            }}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <QrCode size={16} />
            <span>Generate & Download QR Code</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
