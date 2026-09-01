import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../App';
import { preferencesService } from '../services/preferencesService';

export function useFavorites(category: 'protocols' | 'medications' | 'calculators' | 'diseases') {
  const { user } = useAuth();
  const [favUpdated, setFavUpdated] = useState(0);

  // Monitor storage events to stay in sync if needed, though local updates are primary
  const isFavorite = useCallback(
    (id: string) => {
      return preferencesService.isFavorite(category, id, user?.id);
    },
    [category, user?.id, favUpdated]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      preferencesService.toggleFavorite(category, id, user?.id);
      setFavUpdated(prev => prev + 1);
    },
    [category, user?.id]
  );

  return {
    isFavorite,
    toggleFavorite,
    favUpdated,
  };
}
