import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Edit3,
  Trash2,
  MoveUp,
  MoveDown,
  BarChart3,
  Link2,
  User,
  FolderPlus,
  Check,
  Power,
  Sparkles,
  ExternalLink,
  Flame,
  RotateCcw,
  Save,
  Eye,
} from 'lucide-react';
import { LinkItem, Category, Profile, AnalyticsData, ThemeMode } from '../types';
import { IconResolver } from './IconResolver';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  categories: Category[];
  profile: Profile;
  analytics: AnalyticsData;
  theme: ThemeMode;
  onSaveLinks: (links: LinkItem[]) => void;
  onSaveCategories: (categories: Category[]) => void;
  onSaveProfile: (profile: Profile) => void;
  onResetDefaults: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  links,
  categories,
  profile,
  analytics,
  theme,
  onSaveLinks,
  onSaveCategories,
  onSaveProfile,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'links' | 'categories' | 'profile' | 'analytics'>('links');

  // Link Form State
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkCategory, setLinkCategory] = useState(categories[0]?.id || 'ai-tools');
  const [linkIcon, setLinkIcon] = useState('Sparkles');
  const [linkIsFeatured, setLinkIsFeatured] = useState(false);
  const [linkIsNew, setLinkIsNew] = useState(false);
  const [linkIsFree, setLinkIsFree] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);

  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🚀');

  // Profile Form State
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  // Reset Edit Form
  const resetForm = () => {
    setEditingLinkId(null);
    setLinkTitle('');
    setLinkDescription('');
    setLinkUrl('');
    setLinkCategory(categories[0]?.id || 'ai-tools');
    setLinkIcon('Sparkles');
    setLinkIsFeatured(false);
    setLinkIsNew(false);
    setLinkIsFree(false);
    setShowLinkForm(false);
  };

  const handleEditClick = (link: LinkItem) => {
    setEditingLinkId(link.id);
    setLinkTitle(link.title);
    setLinkDescription(link.description);
    setLinkUrl(link.url);
    setLinkCategory(link.category);
    setLinkIcon(link.icon);
    setLinkIsFeatured(!!link.isFeatured);
    setLinkIsNew(!!link.isNew);
    setLinkIsFree(!!link.isFree);
    setShowLinkForm(true);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkTitle || !linkUrl) return;

    if (editingLinkId) {
      // Update existing
      const updated = links.map((l) =>
        l.id === editingLinkId
          ? {
              ...l,
              title: linkTitle,
              description: linkDescription,
              url: linkUrl,
              category: linkCategory,
              icon: linkIcon,
              isFeatured: linkIsFeatured,
              isNew: linkIsNew,
              isFree: linkIsFree,
            }
          : l
      );
      onSaveLinks(updated);
    } else {
      // Create new
      const newLink: LinkItem = {
        id: `link-${Date.now()}`,
        title: linkTitle,
        description: linkDescription,
        url: linkUrl,
        category: linkCategory,
        icon: linkIcon || 'Sparkles',
        isFeatured: linkIsFeatured,
        isNew: linkIsNew,
        isFree: linkIsFree,
        clicks: 0,
        enabled: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      onSaveLinks([newLink, ...links]);
    }

    resetForm();
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Are you sure you want to delete this resource link?')) {
      onSaveLinks(links.filter((l) => l.id !== id));
    }
  };

  const handleToggleLinkStatus = (id: string) => {
    const updated = links.map((l) =>
      l.id === id ? { ...l, enabled: !l.enabled } : l
    );
    onSaveLinks(updated);
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) return;

    const newLinks = [...links];
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    onSaveLinks(newLinks);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat: Category = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName,
      icon: newCatIcon || '⚡',
    };
    onSaveCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatIcon('🚀');
  };

  const handleSaveProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  if (!isOpen) return null;

  const popularIconSuggestions = [
    'Sparkles', 'Zap', 'Wand2', 'Video', 'Terminal', 'Cpu', 'Code2',
    'Palette', 'Layers', 'Brain', 'FileText', 'Layout', 'BookOpen',
    'GraduationCap', 'Share2', 'Film', 'Globe', 'Compass', 'Flame'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-4xl rounded-3xl p-5 sm:p-8 relative border shadow-2xl my-auto max-h-[90vh] flex flex-col ${
            theme === 'dark'
              ? 'bg-[#140D24] text-white border-purple-500/20'
              : 'bg-white text-gray-900 border-purple-200'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/15">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Admin Link Studio</h2>
                <p className="text-xs text-purple-300/70">
                  Manage Shaheer's resources, categories, profile & analytics
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-purple-400 hover:bg-purple-500/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 my-4 overflow-x-auto no-scrollbar pb-1 border-b border-purple-500/10">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'links'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <Link2 size={15} />
              <span>Manage Links ({links.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <FolderPlus size={15} />
              <span>Categories ({categories.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <User size={15} />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <BarChart3 size={15} />
              <span>Analytics & Stats</span>
            </button>
          </div>

          {/* Main Tab Content Container */}
          <div className="flex-1 overflow-y-auto pr-1 my-2">
            {/* LINKS TAB */}
            {activeTab === 'links' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-purple-300">
                    All Resource Links
                  </h3>
                  {!showLinkForm && (
                    <button
                      onClick={() => {
                        resetForm();
                        setShowLinkForm(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add New Link</span>
                    </button>
                  )}
                </div>

                {/* Link Form Modal / In-line */}
                {showLinkForm && (
                  <form
                    onSubmit={handleSaveLink}
                    className="p-5 rounded-2xl bg-purple-950/50 border border-purple-500/30 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                      <h4 className="text-sm font-bold text-white">
                        {editingLinkId ? 'Edit Link Resource' : 'Create New Link Resource'}
                      </h4>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs text-purple-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                          Resource Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={linkTitle}
                          onChange={(e) => setLinkTitle(e.target.value)}
                          placeholder="e.g., Prompt Maker Studio"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                          Destination URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={linkDescription}
                        onChange={(e) => setLinkDescription(e.target.value)}
                        placeholder="Brief summary for Instagram followers..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none focus:border-purple-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                          Category
                        </label>
                        <select
                          value={linkCategory}
                          onChange={(e) => setLinkCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/60 border border-purple-500/30 text-white outline-none focus:border-purple-400"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.icon} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                          Icon (Lucide name, Emoji, or Image URL)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={linkIcon}
                            onChange={(e) => setLinkIcon(e.target.value)}
                            placeholder="Sparkles or https://..."
                            className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none focus:border-purple-400"
                          />
                          <div className="p-2 rounded-xl bg-purple-900/60 border border-purple-500/30 text-purple-300 shrink-0">
                            <IconResolver name={linkIcon} size={18} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Icon Selector Pills */}
                    <div>
                      <span className="block text-[10px] text-purple-300/70 mb-1">
                        Popular Icon Presets:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {popularIconSuggestions.map((iconName) => (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => setLinkIcon(iconName)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] border transition-colors ${
                              linkIcon === iconName
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-purple-950/60 text-purple-300 border-purple-500/20 hover:bg-purple-900/50'
                            }`}
                          >
                            {iconName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Badges Toggles */}
                    <div className="flex items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={linkIsFeatured}
                          onChange={(e) => setLinkIsFeatured(e.target.checked)}
                          className="rounded bg-purple-900 border-purple-500 text-purple-600 focus:ring-0"
                        />
                        <span>Featured Badge</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={linkIsNew}
                          onChange={(e) => setLinkIsNew(e.target.checked)}
                          className="rounded bg-purple-900 border-purple-500 text-purple-600 focus:ring-0"
                        />
                        <span>NEW Badge</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={linkIsFree}
                          onChange={(e) => setLinkIsFree(e.target.checked)}
                          className="rounded bg-purple-900 border-purple-500 text-purple-600 focus:ring-0"
                        />
                        <span>FREE Badge</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-purple-300 hover:bg-purple-900/40"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md hover:from-purple-600 hover:to-indigo-500"
                      >
                        {editingLinkId ? 'Update Resource' : 'Publish Resource'}
                      </button>
                    </div>
                  </form>
                )}

                {/* List of Resource Items with Controls */}
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <div
                      key={link.id}
                      className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
                        link.enabled
                          ? 'bg-purple-950/40 border-purple-500/20'
                          : 'bg-purple-950/10 border-purple-500/10 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300 shrink-0">
                          <IconResolver name={link.icon} size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                              {link.title}
                            </h4>
                            {!link.enabled && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-400">
                                Disabled
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-purple-300/70 truncate">
                            {link.url}
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveLink(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/20 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <MoveUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveLink(index, 'down')}
                          disabled={index === links.length - 1}
                          className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/20 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <MoveDown size={14} />
                        </button>
                        <button
                          onClick={() => handleToggleLinkStatus(link.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            link.enabled
                              ? 'text-emerald-400 hover:bg-emerald-500/20'
                              : 'text-gray-400 hover:bg-gray-500/20'
                          }`}
                          title={link.enabled ? 'Disable Link' : 'Enable Link'}
                        >
                          <Power size={14} />
                        </button>
                        <button
                          onClick={() => handleEditClick(link)}
                          className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/20 cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <div className="space-y-4">
                <form
                  onSubmit={handleAddCategory}
                  className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-3"
                >
                  <h4 className="text-xs font-bold text-purple-300 uppercase">
                    Add New Category
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Emoji (e.g. ⚡)"
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      className="w-20 px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Category Name (e.g. AI Models)"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <h4 className="font-bold text-xs text-white">{cat.name}</h4>
                          <span className="text-[10px] text-purple-300/60 font-mono">
                            ID: {cat.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfileForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                    Bio Description
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      Avatar Image URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.avatarUrl}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, avatarUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      Instagram Followers Count
                    </label>
                    <input
                      type="text"
                      value={profileForm.followersCount}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          followersCount: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.instagramUrl}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          instagramUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={profileForm.githubUrl}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          githubUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-500/30 text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  {profileSaved ? <Check size={16} /> : <Save size={16} />}
                  <span>{profileSaved ? 'Profile Saved!' : 'Save Profile Changes'}</span>
                </button>
              </form>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
                    <span className="text-xs text-purple-300">Total Unique Visitors</span>
                    <p className="text-2xl font-extrabold text-white mt-1">
                      {analytics.totalVisitors.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
                    <span className="text-xs text-purple-300">Total Outbound Clicks</span>
                    <p className="text-2xl font-extrabold text-white mt-1">
                      {analytics.totalClicks.toLocaleString()}
                    </p>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-purple-300 uppercase pt-2">
                  Top Clicked Resources
                </h4>
                <div className="space-y-2">
                  {[...links]
                    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
                    .slice(0, 5)
                    .map((link) => (
                      <div
                        key={link.id}
                        className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/15 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <IconResolver name={link.icon} size={16} />
                          <span className="text-xs font-semibold text-white truncate">
                            {link.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-purple-300">
                          {link.clicks || 0} clicks
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Reset Action */}
          <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between">
            <button
              onClick={() => {
                if (confirm('Reset Shaheer Link Center to default initial data?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset to Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
