'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IFile, IFolder } from '@/types';
import FolderList from '@/components/shared/folder-list';
import FileList from '@/components/shared/file-list';
import { useFolder } from '@/hooks/use-folder';
import { ChevronRight } from 'lucide-react';
import { useView } from '@/hooks/use-view';
import { useSearch } from '@/hooks/use-search';

const Homepage = () => {
  const { user, isLoaded } = useUser();
  const { view } = useView();
  const { query: searchQuery } = useSearch();
  const { folderId, folderName, setFolder } = useFolder();
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    let folderQuery = query(
      collection(db, 'folders'),
      where('uid', '==', user.id),
      where('isTrash', '==', view === 'trash')
    );

    let fileQuery = query(
      collection(db, 'files'),
      where('uid', '==', user.id),
      where('isTrash', '==', view === 'trash')
    );

    if (view === 'starred') {
      folderQuery = query(folderQuery, where('isStar', '==', true));
      fileQuery = query(fileQuery, where('isStar', '==', true));
    }

    if (view === 'dashboard') {
      folderQuery = query(folderQuery, where('parentFolder', '==', folderId));
      fileQuery = query(fileQuery, where('parentFolder', '==', folderId));
    }

    const unsubFolders = onSnapshot(folderQuery, (snapshot) => {
      let folders = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as IFolder
      );
      if (view === 'recent') {
        folders = folders.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );
      }
      if (searchQuery) {
        folders = folders.filter((f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFolders(folders);
    });

    const unsubFiles = onSnapshot(fileQuery, (snapshot) => {
      let files = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as IFile
      );
      if (view === 'recent') {
        files = files.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );
      }
      if (searchQuery) {
        files = files.filter((f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFiles(files);
    });

    return () => {
      unsubFolders();
      unsubFiles();
    };
  }, [user, isLoaded, folderId, view, searchQuery]);

  return (
    <div className="h-full w-full">
      {view === 'dashboard' && (
        <div className="flex items-center text-xl font-medium mb-8">
          <div
            className="hover:bg-secondary px-2 py-1 rounded-md cursor-pointer transition"
            onClick={() => setFolder('root', 'My Drive')}
          >
            My Drive
          </div>
          {folderId !== 'root' && (
            <>
              <ChevronRight className="w-5 h-5 mx-1" />
              <div className="px-2 py-1">{folderName}</div>
            </>
          )}
        </div>
      )}

      {view === 'starred' && (
        <div className="text-xl font-medium mb-8">Starred</div>
      )}

      {view === 'recent' && (
        <div className="text-xl font-medium mb-8">Recent</div>
      )}

      {view === 'trash' && <div className="text-xl font-medium mb-8">Trash</div>}

      {view === 'dashboard' && <FolderList folders={folders} />}
      <FileList files={files} />

      {folders.length === 0 && files.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-secondary rounded-full p-8 mb-4">
            <svg
              className="w-24 h-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-500">
            {searchQuery ? 'No results found' : 'A place for all of your files'}
          </p>
          {!searchQuery && (
            <p className="text-gray-400">
              Use the &quot;New&quot; button to upload your first file or folder
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
