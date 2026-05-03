'use client';

import { IFolder } from '@/types';
import { Folder } from 'lucide-react';
import React from 'react';
import { useFolder } from '@/hooks/use-folder';
import FolderActions from './folder-actions';
import { useView } from '@/hooks/use-view';

interface FolderListProps {
  folders: IFolder[];
}

const FolderList = ({ folders }: FolderListProps) => {
  const { setFolder } = useFolder();
  const { view } = useView();

  if (folders.length === 0) return null;

  return (
    <div className="mt-4">
      <h2 className="text-sm font-medium mb-4">Folders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            role="button"
            onClick={() => setFolder(folder.id, folder.name)}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary transition"
          >
            <div className="flex items-center gap-x-2 truncate">
              <Folder className="w-5 h-5 fill-gray-400 text-gray-400" />
              <span className="text-sm font-medium truncate">{folder.name}</span>
            </div>
            <FolderActions folder={folder} isTrash={view === 'trash'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
