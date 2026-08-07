export interface SubLink {
  title: string;
  url: string;
}

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string; // lucide icon name or image URL
  isFeatured?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  isPro?: boolean;
  clicks: number;
  enabled: boolean;
  createdAt: string;
  scheduledDate?: string;
  subLinks?: SubLink[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Emoji or Lucide icon key
  description?: string;
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatarUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  followersCount: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  email: string;
  websiteUrl: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalClicks: number;
  dailyClicks: { [date: string]: number };
}

export type ThemeMode = 'dark' | 'light';
