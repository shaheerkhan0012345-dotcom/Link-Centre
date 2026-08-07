import { LinkItem, Category, Profile, AnalyticsData } from '../types';
import { INITIAL_PROFILE, INITIAL_CATEGORIES, INITIAL_LINKS, INITIAL_ANALYTICS } from '../data/initialData';

const KEYS = {
  LINKS: 'link_center_links_v9',
  CATEGORIES: 'link_center_categories_v9',
  PROFILE: 'link_center_profile_v4',
  ANALYTICS: 'link_center_analytics_v1',
  THEME: 'link_center_theme_v1',
};

export function getStoredProfile(): Profile {
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : INITIAL_PROFILE;
  } catch {
    return INITIAL_PROFILE;
  }
}

export function saveStoredProfile(profile: Profile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function getStoredCategories(): Category[] {
  try {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: Category[]): void {
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
}

export function getStoredLinks(): LinkItem[] {
  try {
    const data = localStorage.getItem(KEYS.LINKS);
    return data ? JSON.parse(data) : INITIAL_LINKS;
  } catch {
    return INITIAL_LINKS;
  }
}

export function saveStoredLinks(links: LinkItem[]): void {
  localStorage.setItem(KEYS.LINKS, JSON.stringify(links));
}

export function recordLinkClick(linkId: string): void {
  const links = getStoredLinks();
  const updated = links.map((link) => {
    if (link.id === linkId) {
      return { ...link, clicks: (link.clicks || 0) + 1 };
    }
    return link;
  });
  saveStoredLinks(updated);

  // Update analytics
  const analytics = getStoredAnalytics();
  const today = new Date().toISOString().split('T')[0];
  const updatedAnalytics: AnalyticsData = {
    ...analytics,
    totalClicks: analytics.totalClicks + 1,
    dailyClicks: {
      ...analytics.dailyClicks,
      [today]: (analytics.dailyClicks[today] || 0) + 1,
    },
  };
  saveStoredAnalytics(updatedAnalytics);
}

export function getStoredAnalytics(): AnalyticsData {
  try {
    const data = localStorage.getItem(KEYS.ANALYTICS);
    return data ? JSON.parse(data) : INITIAL_ANALYTICS;
  } catch {
    return INITIAL_ANALYTICS;
  }
}

export function saveStoredAnalytics(analytics: AnalyticsData): void {
  localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(analytics));
}

export function incrementPageViews(): void {
  const analytics = getStoredAnalytics();
  const updated = {
    ...analytics,
    totalVisitors: analytics.totalVisitors + 1,
  };
  saveStoredAnalytics(updated);
}

export function resetAllToDefaults(): void {
  localStorage.removeItem(KEYS.LINKS);
  localStorage.removeItem(KEYS.CATEGORIES);
  localStorage.removeItem(KEYS.PROFILE);
  localStorage.removeItem(KEYS.ANALYTICS);
}
