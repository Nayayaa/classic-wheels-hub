import * as React from "react";

const FAVORITES_STORAGE_KEY = "garagem-classica-favorites";
const FAVORITES_EVENT = "garagem-classica:favorites-update";

function readFavoritesFromStorage() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function broadcastFavorites(favorites: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: favorites }));
}

export function useFavorites() {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setFavorites(readFavoritesFromStorage());

    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) {
        setFavorites(readFavoritesFromStorage());
      }
    };

    const onBroadcast = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      if (Array.isArray(customEvent.detail)) {
        setFavorites(customEvent.detail);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(FAVORITES_EVENT, onBroadcast);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FAVORITES_EVENT, onBroadcast);
    };
  }, []);

  const toggleFavorite = React.useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      broadcastFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = React.useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.filter((item) => item !== id);
      broadcastFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = React.useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  };
}
