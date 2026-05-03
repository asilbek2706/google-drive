'use client';

import { useUpload } from '@/hooks/use-upload';
import { X } from 'lucide-react';
import { Progress } from '../ui/progress';

const UploadModal = () => {
  const { isOpen, onClose, progress, fileName } = useUpload();

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-xl border z-50 overflow-hidden">
      <div className="bg-[#323232] p-3 flex items-center justify-between text-white">
        <p className="text-sm">Uploading 1 item</p>
        <div role="button" onClick={onClose} className="cursor-pointer">
          <X className="w-5 h-5" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium line-clamp-1">{fileName}</p>
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default UploadModal;
