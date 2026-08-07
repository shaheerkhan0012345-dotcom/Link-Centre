import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Flame, Globe } from 'lucide-react';
import { LinkItem, ThemeMode } from '../types';
import { IconResolver } from './IconResolver';

interface ResourceCardProps {
  link: LinkItem;
  theme: ThemeMode;
  onLinkClick: (link: LinkItem) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  link,
  theme,
  onLinkClick,
}) => {
  const [rippling, setRippling] = useState(false);

  const handleClick = () => {
    setRippling(true);
    setTimeout(() => setRippling(false), 500);
    onLinkClick(link);
  };

  if (link.subLinks && link.subLinks.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`relative overflow-hidden w-full p-4 sm:p-5 rounded-3xl flex flex-col gap-3 transition-all duration-200 border-0 ${
          theme === 'dark'
            ? 'bg-white text-gray-900 shadow-md hover:shadow-xl'
            : 'bg-white text-gray-900 shadow-sm hover:shadow-lg'
        }`}
        id={`link-card-${link.id}`}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="relative shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-100/80 text-purple-900 border-0 shadow-sm overflow-hidden">
              <IconResolver
                name={link.icon}
                size={20}
                className="text-purple-800 font-bold"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-gray-900">
                  {link.title}
                </h3>
                {link.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border-0">
                    <Flame size={9} /> Featured
                  </span>
                )}
                {link.isNew && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border-0">
                    NEW
                  </span>
                )}
              </div>
              {link.description && (
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {link.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Clickable Sub-Links Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
          {link.subLinks.map((sub, idx) => (
            <a
              key={idx}
              href={sub.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-purple-100/80 hover:bg-purple-700 text-purple-950 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-all duration-200 shadow-sm group/btn cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Globe size={15} className="text-purple-800 group-hover/btn:text-white shrink-0" />
                <span className="truncate">{sub.title}</span>
              </div>
              <ArrowUpRight size={15} className="text-purple-800 group-hover/btn:text-white shrink-0" />
            </a>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative overflow-hidden w-full px-5 py-3.5 sm:py-4 rounded-full flex items-center justify-between gap-4 group cursor-pointer transition-all duration-200 border-0 ${
        theme === 'dark'
          ? 'bg-white hover:bg-purple-50 text-gray-900 shadow-md hover:shadow-xl'
          : 'bg-white hover:bg-purple-50 text-gray-900 shadow-sm hover:shadow-lg'
      }`}
      id={`link-card-${link.id}`}
    >
      {/* Ripple Animation Circle */}
      {rippling && (
        <span className="absolute inset-0 rounded-full bg-purple-500/10 animate-ping pointer-events-none" />
      )}

      {/* Left Section: Circular Icon + Title + Badges */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Circular Icon Container */}
        <div className="relative shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-100/80 text-purple-900 border-0 group-hover:scale-105 transition-transform duration-200 shadow-sm overflow-hidden">
          <IconResolver
            name={link.icon}
            size={20}
            className="text-purple-800 font-bold"
          />
        </div>

        {/* Content Title */}
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-sm sm:text-base tracking-tight text-gray-900 group-hover:text-purple-700 transition-colors truncate">
              {link.title}
            </h3>

            {/* Badges */}
            {link.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border-0">
                <Flame size={9} /> Featured
              </span>
            )}
            {link.isNew && (
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border-0">
                NEW
              </span>
            )}
          </div>
          {link.description && (
            <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">
              {link.description}
            </p>
          )}
        </div>
      </div>

      {/* Right Section: Arrow Action Icon */}
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100/80 group-hover:bg-purple-600 text-purple-800 group-hover:text-white transition-all duration-200 shadow-sm">
        <ArrowUpRight size={16} />
      </div>
    </motion.a>
  );
};
