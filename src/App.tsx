import React, { useState, useEffect, useMemo } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { ResourceCard } from './components/ResourceCard';
import { ShareModal } from './components/ShareModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { LinkItem, Category, Profile, AnalyticsData, ThemeMode } from './types';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredCategories,
  saveStoredCategories,
  getStoredLinks,
  saveStoredLinks,
  recordLinkClick,
  getStoredAnalytics,
  incrementPageViews,
  resetAllToDefaults,
} from './utils/storage';
import { ArrowRight, Layers } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<ThemeMode>('light');

  // App Data State
  const [profile, setProfile] = useState<Profile>(getStoredProfile);
  const [categories, setCategories] = useState<Category[]>(getStoredCategories);
  const [links, setLinks] = useState<LinkItem[]>(getStoredLinks);
  const [analytics, setAnalytics] = useState<AnalyticsData>(getStoredAnalytics);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal States
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Increment Page Views on Mount
  useEffect(() => {
    incrementPageViews();
    setAnalytics(getStoredAnalytics());
  }, []);

  // Sync Theme HTML root class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Handle Link Click Tracking
  const handleLinkClick = (link: LinkItem) => {
    recordLinkClick(link.id);
    setLinks(getStoredLinks());
    setAnalytics(getStoredAnalytics());
  };

  // Data Persistence Handlers
  const handleSaveLinks = (updatedLinks: LinkItem[]) => {
    setLinks(updatedLinks);
    saveStoredLinks(updatedLinks);
  };

  const handleSaveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    saveStoredCategories(updatedCategories);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  const handleResetDefaults = () => {
    resetAllToDefaults();
    setProfile(getStoredProfile());
    setCategories(getStoredCategories());
    setLinks(getStoredLinks());
    setAnalytics(getStoredAnalytics());
  };

  // Filtered Links Logic
  const activeLinks = useMemo(() => {
    return links.filter((link) => link.enabled);
  }, [links]);

  const filteredLinks = useMemo(() => {
    return activeLinks.filter((link) => {
      // Category Filter
      if (selectedCategory !== 'all' && link.category !== selectedCategory) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = link.title.toLowerCase().includes(query);
        const matchesDesc = link.description.toLowerCase().includes(query);
        const matchesCat = link.category.toLowerCase().includes(query);

        return matchesTitle || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [activeLinks, selectedCategory, searchQuery]);

  // Category counts helper
  const getCategoryCount = (catId: string) => {
    return activeLinks.filter((l) => l.category === catId).length;
  };

  // Counts for Stats
  const aiToolsCount = useMemo(() => {
    return activeLinks.filter((l) => l.category === 'ai-tools').length;
  }, [activeLinks]);

  const freeCoursesCount = useMemo(() => {
    return activeLinks.filter((l) => l.category === 'free-courses').length;
  }, [activeLinks]);

  const totalClicksCount = useMemo(() => {
    return activeLinks.reduce((acc, l) => acc + (l.clicks || 0), 0);
  }, [activeLinks]);

  // Group links by Category for visual section headings when viewing All and no search
  const groupedLinks = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) {
      return null;
    }

    return categories.map((cat) => ({
      category: cat,
      items: activeLinks.filter((l) => l.category === cat.id),
    })).filter((group) => group.items.length > 0);
  }, [categories, activeLinks, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#e0cef8] text-gray-900 relative selection:bg-purple-600 selection:text-white">
      {/* Main Responsive Grid Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side (30% on desktop, top on mobile): Profile Card */}
          <div className="lg:col-span-4 w-full flex justify-center">
            <ProfileCard
              profile={profile}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              totalLinksCount={activeLinks.length}
              totalClicksCount={totalClicksCount}
            />
          </div>

          {/* Right Side (70% on desktop): Resource Feed */}
          <div className="lg:col-span-8 w-full space-y-4">
            
            {/* Links Content Listing */}
            {filteredLinks.length === 0 ? (
              <div className="p-10 rounded-3xl text-center border my-8 bg-white border-purple-200 text-gray-700 shadow-sm">
                <div className="p-4 rounded-full bg-purple-500/10 text-purple-600 inline-block mb-3">
                  <Layers size={32} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#2e1065]">No resources found</h3>
                <p className="text-xs text-purple-900/70 mb-4">
                  No matching links found for "{searchQuery}". Try a different term or clear filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-700 text-white hover:bg-purple-800 cursor-pointer shadow-sm"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : groupedLinks ? (
              /* Grouped View by Category Sections */
              <div className="space-y-8">
                {groupedLinks.map(({ category, items }) => (
                  <section key={category.id} className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2 text-[#2e1065]">
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-purple-900/10 text-[#2e1065] font-bold">
                          {items.length}
                        </span>
                      </h2>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className="text-xs font-bold text-[#2e1065] hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Section</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      {items.map((link) => (
                        <ResourceCard
                          key={link.id}
                          link={link}
                          theme={theme}
                          onLinkClick={handleLinkClick}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              /* Flat Filtered Grid */
              <div className="grid grid-cols-1 gap-3.5">
                {filteredLinks.map((link) => (
                  <ResourceCard
                    key={link.id}
                    link={link}
                    theme={theme}
                    onLinkClick={handleLinkClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        theme={theme}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={profile}
        theme={theme}
        onOpenQR={() => setIsQROpen(true)}
      />

      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        profile={profile}
        theme={theme}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        links={links}
        categories={categories}
        profile={profile}
        analytics={analytics}
        theme={theme}
        onSaveLinks={handleSaveLinks}
        onSaveCategories={handleSaveCategories}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
