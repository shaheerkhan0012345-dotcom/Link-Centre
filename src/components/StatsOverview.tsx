import React from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles, GraduationCap, MousePointerClick, Users } from 'lucide-react';
import { ThemeMode, AnalyticsData } from '../types';

interface StatsOverviewProps {
  totalLinks: number;
  aiToolsCount: number;
  freeCoursesCount: number;
  analytics: AnalyticsData;
  theme: ThemeMode;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalLinks,
  aiToolsCount,
  freeCoursesCount,
  analytics,
  theme,
}) => {
  const stats = [
    {
      label: 'Total Resources',
      value: totalLinks,
      icon: Layers,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      label: 'AI Tools',
      value: aiToolsCount,
      icon: Sparkles,
      color: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Free Courses',
      value: freeCoursesCount,
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Total Clicks',
      value: analytics.totalClicks.toLocaleString(),
      icon: MousePointerClick,
      color: 'from-purple-500 to-pink-600',
    },
    {
      label: 'Visitors',
      value: analytics.totalVisitors.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400/80 flex items-center gap-1.5">
          <Sparkles size={12} />
          <span>Live Hub Analytics</span>
        </h3>
        <span className="text-[11px] font-mono text-purple-300/60">Updated Real-time</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#181028]/80 border-purple-500/15 shadow-md hover:border-purple-500/30'
                  : 'bg-white border-purple-200/80 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-gray-500 dark:text-purple-300/70 truncate">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-xl bg-gradient-to-tr ${stat.color} text-white shadow-sm`}>
                  <Icon size={13} />
                </div>
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-purple-950 dark:text-white tracking-tight">
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
