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
  FilePenLine,
  Undo,
  Trash2,
} from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IFolder } from '@/types';
import { useModal } from '@/hooks/use-modal';

interface FolderActionsProps {
  folder: IFolder;
  isTrash?: boolean;
}

const FolderActions = ({ folder, isTrash }: FolderActionsProps) => {
  const { onOpen } = useModal();

  const onRestore = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateDoc(doc(db, 'folders', folder.id), {
      isTrash: false,
    });
  };

  const onDeletePermanently = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteDoc(doc(db, 'folders', folder.id));
  };

  const onStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateDoc(doc(db, 'folders', folder.id), {
      isStar: !folder.isStar,
    });
  };

  const onTrash = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateDoc(doc(db, 'folders', folder.id), {
      isTrash: true,
    });
  };

  const onRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen('rename', { id: folder.id, name: folder.name, type: 'folder' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
                className={`w-4 h-4 ${folder.isStar ? 'fill-yellow-400 text-yellow-400' : ''}`}
              />
              <span>{folder.isStar ? 'Remove star' : 'Star'}</span>
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

export default FolderActions;
