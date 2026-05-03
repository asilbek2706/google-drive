import { create } from 'zustand';

interface ModalData {
  id?: string;
  name?: string;
  type?: 'file' | 'folder';
}

interface ModalStore {
  isOpen: boolean;
  type: 'create-folder' | 'rename' | null;
  data: ModalData;
  onOpen: (type: 'create-folder' | 'rename', data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}));
