'use client';

import { IFile } from '@/types';
import { FileIcon } from 'lucide-react';
import React from 'react';
import { format } from 'date-fns';
import FileActions from './file-actions';
import { useView } from '@/hooks/use-view';

interface FileListItemProps {
  file: IFile;
}

const FileListItem = ({ file }: FileListItemProps) => {
  const { view } = useView();

  return (
    <div className="flex items-center justify-between p-2 hover:bg-secondary transition border-b group">
      <div className="flex items-center gap-x-2 flex-1 truncate">
        <FileIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <span className="text-sm font-medium truncate">{file.name}</span>
      </div>
      <div className="hidden md:flex items-center gap-x-8 text-sm text-muted-foreground w-[40%] justify-end mr-4">
        <span>{format(file.timestamp.toMillis(), 'MMM d, yyyy')}</span>
        <span className="w-20 text-right">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
      </div>
      <FileActions file={file} isTrash={view === 'trash'} />
    </div>
  );
};

export default FileListItem;
