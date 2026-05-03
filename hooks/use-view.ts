import { create } from 'zustand';

interface ViewStore {
  view: 'dashboard' | 'starred' | 'recent' | 'trash' | 'storage';
  setView: (view: 'dashboard' | 'starred' | 'recent' | 'trash' | 'storage') => void;
}

export const useView = create<ViewStore>((set) => ({
  view: 'dashboard',
  setView: (view) => set({ view }),
}));
