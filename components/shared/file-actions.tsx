'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  MoreVertical,
  Star,
  Trash,
  Download,
  FilePenLine,
  Undo,
  Trash2,
} from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IFile } from '@/types';
import { useModal } from '@/hooks/use-modal';

interface FileActionsProps {
  file: IFile;
  isTrash?: boolean;
}

const FileActions = ({ file, isTrash }: FileActionsProps) => {
  const { onOpen } = useModal();

  const onRestore = async () => {
    await updateDoc(doc(db, 'files', file.id), {
      isTrash: false,
    });
  };

  const onDeletePermanently = async () => {
    await deleteDoc(doc(db, 'files', file.id));
  };

  const onStar = async () => {
    await updateDoc(doc(db, 'files', file.id), {
      isStar: !file.isStar,
    });
  };

  const onTrash = async () => {
    await updateDoc(doc(db, 'files', file.id), {
      isTrash: true,
    });
  };

  const onDownload = () => {
    window.open(file.fileUrl, '_blank');
  };

  const onRename = () => {
    onOpen('rename', { id: file.id, name: file.name, type: 'file' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="p-1 hover:bg-secondary rounded-full transition"
        >
          <MoreVertical className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {isTrash ? (
          <>
            <DropdownMenuItem
              onClick={onRestore}
              className="flex items-center gap-x-2"
            >
              <Undo className="w-4 h-4" />
              <span>Restore</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDeletePermanently}
              className="flex items-center gap-x-2 text-red-500"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete permanently</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={onDownload}
              className="flex items-center gap-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onRename}
              className="flex items-center gap-x-2"
            >
              <FilePenLine className="w-4 h-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onStar}
              className="flex items-center gap-x-2"
            >
              <Star
                className={`w-4 h-4 ${file.isStar ? 'fill-yellow-400 text-yellow-400' : ''}`}
              />
              <span>{file.isStar ? 'Remove star' : 'Star'}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onTrash}
              className="flex items-center gap-x-2 text-red-500"
            >
              <Trash className="w-4 h-4" />
              <span>Move to trash</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileActions;
