import { LinkItem, Category, Profile, AnalyticsData } from '../types';
// @ts-ignore
import profileAvatar from '../assets/images/insta.jpg';

export const INITIAL_PROFILE: Profile = {
  name: 'Shaheer',
  handle: '@shaheer__build',
  title: 'Developer • AI Creator • Typography Designer',
  bio: 'Helping developers and creators discover the best AI tools, developer utilities, and high-conversion workflows.',
  avatarUrl: profileAvatar,
  instagramUrl: 'https://www.instagram.com/shaheer__build/',
  instagramHandle: 'shaheer__build',
  followersCount: '128.5K',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  youtubeUrl: 'https://youtube.com',
  discordUrl: 'https://discord.gg',
  email: 'hello@shaheer.dev',
  websiteUrl: 'https://shaheer.dev',
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'prompts', name: 'Prompts & AI Resources', icon: '🧠', description: 'Curated AI prompts and resource files' },
];

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'link-4',
    title: 'developer tools',
    description: 'AI developer platforms & autonomous agent frameworks',
    url: 'https://motionsites.ai/',
    category: 'prompts',
    icon: 'Code2',
    isFeatured: true,
    isFree: true,
    clicks: 0,
    enabled: true,
    createdAt: '2026-08-07',
    subLinks: [
      {
        title: 'MotionSites',
        url: 'https://motionsites.ai/',
      },
      {
        title: 'Arena Agent',
        url: 'https://arena.ai/agent',
      },
    ],
  },
  {
    id: 'link-3',
    title: 'deployment pdf',
    description: 'Google Drive resource for deployment PDF',
    url: 'https://drive.google.com/file/d/1QkLPDP2WXwx361WN6Csxw7G_MU11IT_k/view?usp=drive_link',
    category: 'prompts',
    icon: 'FileText',
    isFeatured: true,
    isFree: true,
    clicks: 0,
    enabled: true,
    createdAt: '2026-08-07',
  },
  {
    id: 'link-1',
    title: '3 portfolio website',
    description: 'Interactive portfolio showcase website',
    url: 'https://display-website-eta.vercel.app/',
    category: 'prompts',
    icon: 'Globe',
    isFeatured: true,
    isFree: true,
    clicks: 0,
    enabled: true,
    createdAt: '2026-08-07',
  },
  {
    id: 'link-2',
    title: '3D website prompt',
    description: 'Google Drive resource for 3D website prompt',
    url: 'https://drive.google.com/file/d/1xVM4y4IOP1dRLww76hZEGcogM9KAgsbg/view?usp=drive_link',
    category: 'prompts',
    icon: 'Box',
    isFeatured: false,
    isFree: true,
    clicks: 0,
    enabled: true,
    createdAt: '2026-08-07',
  },
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalVisitors: 34820,
  totalClicks: 28240,
  dailyClicks: {
    '2026-08-01': 320,
    '2026-08-02': 480,
    '2026-08-03': 610,
    '2026-08-04': 750,
    '2026-08-05': 890,
    '2026-08-06': 1020,
  },
};
