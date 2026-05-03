'use client';

import { IFile } from '@/types';
import { FileIcon, List, LayoutGrid } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import FileActions from './file-actions';
import { useView } from '@/hooks/use-view';
import { useViewMode } from '@/hooks/use-view-mode';
import FileListItem from './file-list-item';

interface FileListProps {
  files: IFile[];
}

const FileList = ({ files }: FileListProps) => {
  const { view } = useView();
  const { mode, setMode } = useViewMode();

  if (files.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium">Files</h2>
        <div className="flex items-center bg-secondary rounded-lg p-1">
          <div
            role="button"
            onClick={() => setMode('grid')}
            className={`p-1 rounded-md transition ${mode === 'grid' ? 'bg-white shadow-sm dark:bg-black' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div
            role="button"
            onClick={() => setMode('list')}
            className={`p-1 rounded-md transition ${mode === 'list' ? 'bg-white shadow-sm dark:bg-black' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          >
            <List className="w-4 h-4" />
          </div>
        </div>
      </div>

      {mode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <div className="h-32 w-full bg-secondary flex items-center justify-center relative">
                {file.type.startsWith('image/') ? (
                  <Image
                    src={file.fileUrl}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FileIcon className="w-12 h-12 text-blue-500" />
                )}
              </div>
              <div className="p-3 flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-2 truncate">
                  <FileIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <FileActions file={file} isTrash={view === 'trash'} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-2 bg-secondary text-xs font-medium text-muted-foreground border-b">
            <span className="flex-1">Name</span>
            <div className="hidden md:flex items-center gap-x-8 w-[40%] justify-end mr-12">
              <span>Last modified</span>
              <span className="w-20 text-right">File size</span>
            </div>
          </div>
          {files.map((file) => (
            <FileListItem key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
