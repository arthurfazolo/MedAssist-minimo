import { authService } from './authService';

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  favorites: {
    calculators: string[];
    medications: string[];
    protocols: string[];
    diseases?: string[];
  };
}

const getUserId = (): string => {
  const user = authService.getCurrentUser();
  return user ? user.id : 'guest';
};

const getPrefsKey = (userId?: string): string => {
  const id = userId || getUserId();
  return `medassist_prefs_${id}`;
};

const DEFAULT_PREFS: UserPreferences = {
  theme: 'light',
  fontSize: 'medium',
  favorites: {
    calculators: [],
    medications: [],
    protocols: [],
    diseases: [],
  }
};

export const preferencesService = {
  getPreferences: (userId?: string): UserPreferences => {
    const key = getPrefsKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      const prefs = { ...DEFAULT_PREFS };
      try {
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        prefs.theme = systemPrefersDark ? 'dark' : 'light';
      } catch (e) {}
      return prefs;
    }
    try {
      const parsed = JSON.parse(raw);
      return {
        theme: parsed.theme || 'light',
        fontSize: parsed.fontSize || 'medium',
        favorites: {
          calculators: parsed.favorites?.calculators || [],
          medications: parsed.favorites?.medications || [],
          protocols: parsed.favorites?.protocols || [],
          diseases: parsed.favorites?.diseases || [],
        }
      };
    } catch (e) {
      return DEFAULT_PREFS;
    }
  },

  savePreferences: (prefs: Partial<UserPreferences>, userId?: string): void => {
    const current = preferencesService.getPreferences(userId);
    const updated: UserPreferences = {
      ...current,
      ...prefs,
      favorites: {
        ...current.favorites,
        ...(prefs.favorites || {})
      }
    };
    const key = getPrefsKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
    preferencesService.applyPreferencesDOM(updated);
  },

  applyPreferencesDOM: (prefs: UserPreferences): void => {
    if (typeof document !== 'undefined') {
      if (prefs.theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
      }
      document.documentElement.setAttribute('data-font-size', prefs.fontSize);
    }
  },

  toggleFavorite: (type: 'calculators' | 'medications' | 'protocols' | 'diseases', itemId: string, userId?: string): boolean => {
    const prefs = preferencesService.getPreferences(userId);
    const list = (prefs.favorites as any)[type] || [];
    const isFav = list.includes(itemId);
    
    let newList: string[];
    if (isFav) {
      newList = list.filter((id: string) => id !== itemId);
    } else {
      newList = [...list, itemId];
    }

    (prefs.favorites as any)[type] = newList;
    preferencesService.savePreferences(prefs, userId);
    return !isFav;
  },

  isFavorite: (type: 'calculators' | 'medications' | 'protocols' | 'diseases', itemId: string, userId?: string): boolean => {
    const prefs = preferencesService.getPreferences(userId);
    return ((prefs.favorites as any)[type] || []).includes(itemId);
  }
};
