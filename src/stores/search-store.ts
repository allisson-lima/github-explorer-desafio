import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_RECENT = 5;

interface SearchState {
  recentUsernames: string[];
  addRecentSearch: (username: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      recentUsernames: [],
      addRecentSearch: (username) => {
        const normalized = username.trim().toLowerCase();
        const current = get().recentUsernames.filter(
          (item) => item !== normalized,
        );

        set({
          recentUsernames: [normalized, ...current].slice(0, MAX_RECENT),
        });
      },
    }),
    {
      name: 'github-explorer-searches',
    },
  ),
);
