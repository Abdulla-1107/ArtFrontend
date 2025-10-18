import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string, title: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, title: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast({
          title: "Removed from favorites",
          description: `${title} has been removed from your favorites`,
        });
        return prev.filter((fav) => fav !== id);
      } else {
        toast({
          title: "Added to favorites",
          description: `${title} has been added to your favorites`,
        });
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
