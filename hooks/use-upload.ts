import { create } from 'zustand';

interface UploadStore {
  isOpen: boolean;
  progress: number;
  fileName: string;
  onOpen: () => void;
  onClose: () => void;
  setProgress: (progress: number) => void;
  setFileName: (fileName: string) => void;
}

export const useUpload = create<UploadStore>((set) => ({
  isOpen: false,
  progress: 0,
  fileName: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, progress: 0, fileName: '' }),
  setProgress: (progress) => set({ progress }),
  setFileName: (fileName) => set({ fileName }),
}));
