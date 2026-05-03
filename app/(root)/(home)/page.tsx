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
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useView } from '@/hooks/use-view';
import { useSearch } from '@/hooks/use-search';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Homepage = () => {
  const { user, isLoaded } = useUser();
  const { view } = useView();
  const { query: searchQuery } = useSearch();
  const { folderId, folderName, setFolder } = useFolder();
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Set loading to true when view parameters change
  const [currentView, setCurrentView] = useState('');
  if (currentView !== `${view}-${folderId}-${searchQuery}`) {
    setLoading(true);
    setCurrentView(`${view}-${folderId}-${searchQuery}`);
  }

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
      let foldersData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as IFolder
      );
      if (searchQuery) {
        foldersData = foldersData.filter((f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFolders(foldersData);
      setLoading(false);
    });

    const unsubFiles = onSnapshot(fileQuery, (snapshot) => {
      let filesData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as IFile
      );

      // Client-side sorting for Recent and Storage
      if (view === 'recent') {
        filesData = filesData.sort((a, b) => {
           const timeA = a.timestamp?.toMillis() || 0;
           const timeB = b.timestamp?.toMillis() || 0;
           return timeB - timeA;
        });
      }

      if (view === 'storage') {
        filesData = filesData.sort((a, b) => b.size - a.size);
      }

      if (searchQuery) {
        filesData = filesData.filter((f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFiles(filesData);
      setLoading(false);
    });

    return () => {
      unsubFolders();
      unsubFiles();
    };
  }, [user, isLoaded, folderId, view, searchQuery]);

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center text-xl font-medium">
          {view === 'dashboard' ? (
            <>
              {folderId !== 'root' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={() => setFolder('root', 'My Drive')}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div
                className="hover:bg-secondary px-2 py-1 rounded-md cursor-pointer transition"
                onClick={() => setFolder('root', 'My Drive')}
              >
                My Drive
              </div>
              {folderId !== 'root' && (
                <>
                  <ChevronRight className="w-5 h-5 mx-1" />
                  <div className="px-2 py-1 truncate max-w-[200px]">{folderName}</div>
                </>
              )}
            </>
          ) : (
            <div className="capitalize">{view}</div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {(view === 'dashboard' || view === 'starred' || view === 'trash') && (
            <FolderList folders={folders} />
          )}
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
                {searchQuery
                  ? 'No results found'
                  : view === 'trash'
                    ? 'Trash is empty'
                    : view === 'starred'
                      ? 'No starred files or folders'
                      : 'A place for all of your files'}
              </p>
              {!searchQuery && view === 'dashboard' && (
                <p className="text-gray-400">
                  Use the &quot;New&quot; button to upload your first file or folder
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Homepage;
