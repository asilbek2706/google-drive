'use client';

import { Clock5, Cloud, Plus, Star, Tablet, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import Item from './item';
import { Progress } from '../ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import PopoverActions from './popover-actions';
import { useView } from '@/hooks/use-view';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@clerk/nextjs';
import { useFolder } from '@/hooks/use-folder';

const Sidebar = () => {
  const { view, setView } = useView();
  const { setFolder } = useFolder();
  const { user } = useUser();
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'files'), where('uid', '==', user.id));
    const unsub = onSnapshot(q, (snapshot) => {
      let total = 0;
      snapshot.docs.forEach((doc) => {
        total += doc.data().size;
      });
      setTotalSize(total);
    });

    return () => unsub();
  }, [user]);

  const byteToMb = (byte: number) => {
    return (byte / (1024 * 1024)).toFixed(2);
  };

  const totalSizeMb = parseFloat(byteToMb(totalSize));
  const progressValue = (totalSizeMb / 1500) * 100;

  return (
    <div className="h-[90vh] w-72 fixed top-[10vh] left-0 z-30 bg-[#F6F9FC] dark:bg-[#1f1f1f] border-r">
      <div className="flex flex-col p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="h-12 w-fit rounded-full px-5 text-base font-medium shadow-sm"
              variant="outline"
            >
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>

        <div className="flex flex-col mt-8">
          {sidebarLinks.map((link) => (
            <Item
              key={link.label}
              icon={link.icon}
              label={link.label}
              active={view === link.view}
              onClick={() => {
                setView(link.view as 'dashboard' | 'starred' | 'recent' | 'trash' | 'storage');
                if (link.view === 'dashboard') {
                  setFolder('root', 'My Drive');
                }
              }}
            />
          ))}
          <div className="flex flex-col space-y-2 mx-4 mt-8 text-sm">
            <Progress className="h-2" value={progressValue} />
            <span>
              {totalSizeMb > 1024
                ? `${(totalSizeMb / 1024).toFixed(2)} GB`
                : `${totalSizeMb} MB`}{' '}
              of 1.5 GB used
            </span>

            <Button className="rounded-full " variant={'outline'}>
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const sidebarLinks = [
  {
    label: 'My Drive',
    icon: Tablet,
    view: 'dashboard',
  },
  {
    label: 'Starred',
    icon: Star,
    view: 'starred',
  },
  {
    label: 'Recent',
    icon: Clock5,
    view: 'recent',
  },
  {
    label: 'Trash',
    icon: Trash,
    view: 'trash',
  },
  {
    label: 'Storage',
    icon: Cloud,
    view: 'storage',
  },
];
