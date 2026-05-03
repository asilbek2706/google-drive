import { create } from 'zustand';

interface FolderStore {
  folderId: string;
  folderName: string;
  setFolder: (folderId: string, folderName: string) => void;
}

export const useFolder = create<FolderStore>((set) => ({
  folderId: 'root',
  folderName: 'My Drive',
  setFolder: (folderId, folderName) => set({ folderId, folderName }),
}));
