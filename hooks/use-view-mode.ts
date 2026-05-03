import { create } from 'zustand';

interface ViewModeStore {
  mode: 'grid' | 'list';
  setMode: (mode: 'grid' | 'list') => void;
}

export const useViewMode = create<ViewModeStore>((set) => ({
  mode: 'grid',
  setMode: (mode) => set({ mode }),
}));
