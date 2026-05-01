'use client';

import { FileUp, Folder, FolderUp } from 'lucide-react';
import { Button } from '../ui/button';
import { PopoverClose } from '../ui/popover';
import { Separator } from '../ui/separator';
import { useFolder } from '@/hooks/use-folder';

const PopoverActions = () => {
  const { onOpen } = useFolder();

  return (
    <div className="min-w-52">
      <PopoverClose asChild>
        <Button
          type="button"
          onClick={onOpen}
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-normal hover:bg-secondary"
        >
          <Folder className="h-4 w-4" />
          <span>New folder</span>
        </Button>
      </PopoverClose>
      <Separator />

      <PopoverClose asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-4 py-2 text-sm font-normal hover:bg-secondary"
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
