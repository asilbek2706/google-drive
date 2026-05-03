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
  const [value, setValue] = useState(data?.name || '');
  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === 'rename';

  if (isModalOpen && value === '' && data?.name && !loading) {
    setValue(data.name);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <input
            className="w-full h-10 border rounded-md px-3 outline-none focus:border-blue-500"
            placeholder="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            className="text-blue-500 hover:bg-blue-50"
            variant="ghost"
            onClick={onSubmit}
            disabled={loading || !value}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
