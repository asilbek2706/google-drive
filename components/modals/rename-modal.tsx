'use client';

import { useModal } from '@/hooks/use-modal';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const RenameModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === 'rename';

  // Synchronize value with data during rendering instead of useEffect
  const [prevDataId, setPrevDataId] = useState('');
  if (isModalOpen && data?.id !== prevDataId) {
    setValue(data?.name || '');
    setPrevDataId(data?.id || '');
  }

  const onSubmit = async () => {
    if (!value || !data?.id || !data?.type) return;

    setLoading(true);
    try {
      const collectionName = data.type === 'folder' ? 'folders' : 'files';
      await updateDoc(doc(db, collectionName, data.id), {
        name: value,
      });
      onClose();
      setValue('');
      setPrevDataId('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <input
            className="w-full h-10 border rounded-md px-3 outline-none focus:border-blue-500 bg-transparent"
            placeholder="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            autoFocus
          />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading} className="rounded-full">
            Cancel
          </Button>
          <Button
            className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full"
            variant="ghost"
            onClick={onSubmit}
            disabled={loading || !value || value === data.name}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
