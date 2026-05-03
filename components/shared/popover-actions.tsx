'use client';

import { FileUp, Folder, FolderUp } from 'lucide-react';
import { Button } from '../ui/button';
import { PopoverClose } from '../ui/popover';
import { Separator } from '../ui/separator';
import { useModal } from '@/hooks/use-modal';
import { ChangeEvent, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useFolder } from '@/hooks/use-folder';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useUpload } from '@/hooks/use-upload';

const PopoverActions = () => {
  const { onOpen } = useModal();
  const { onOpen: onUploadOpen, setFileName, setProgress } = useUpload();
  const { user } = useUser();
  const { folderId } = useFolder();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    const file = files[0];

    setFileName(file.name);
    onUploadOpen();

    const storageRef = ref(storage, `files/${user.id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, 'files'), {
            name: file.name,
            type: file.type,
            size: file.size,
            uid: user.id,
            parentFolder: folderId,
            fileUrl: downloadURL,
            isStar: false,
            isTrash: false,
            timestamp: serverTimestamp(),
          });
        });
      }
    );
  };

  return (
    <div className="min-w-52">
      <PopoverClose asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-normal hover:bg-secondary"
          onClick={() => onOpen('create-folder')}
        >
          <Folder className="h-4 w-4" />
          <span>New folder</span>
        </Button>
      </PopoverClose>
      <Separator />

      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={onChange}
        accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain"
      />

      <PopoverClose asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-normal hover:bg-secondary"
          onClick={() => inputRef.current?.click()}
        >
          <FileUp className="h-4 w-4" />
          <span>File upload</span>
        </Button>
      </PopoverClose>

      <PopoverClose asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-normal hover:bg-secondary"
        >
          <FolderUp className="h-4 w-4" />
          <span>Folder upload</span>
        </Button>
      </PopoverClose>
    </div>
  );
};

export default PopoverActions;
