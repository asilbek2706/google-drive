'use client';

import React from 'react';
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Item from './item';
import { Progress } from '../ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import PopoverActions from './popover-actions';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed left-0 top-[10vh] z-30 h-[90vh] w-72 border-r bg-[#F6F9FC] dark:bg-[#1f1f1f]">
      <div className="flex flex-col p-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              className="h-12 w-fit rounded-full bg-black px-5 text-base font-medium text-white shadow-sm hover:bg-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-800"
            >
              <Plus />
              <span>New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={8} className="w-auto p-2">
            <PopoverActions />
          </PopoverContent>
        </Popover>

        <div className="mt-8 flex flex-col space-y-6">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Item icon={link.icon} label={link.label} />
            </Link>
          ))}
          <div className="mx-4 flex flex-col space-y-2">
            <Progress className="h-2" value={33} />
            <span>20 MB of 1.5 GB used</span>

            <Button className="rounded-full" variant={'outline'}>
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
    path: '/',
  },
  {
    label: 'Starred',
    icon: Star,
    path: '/starred',
  },
  {
    label: 'Recent',
    icon: Clock5,
    path: '/recent',
  },
  {
    label: 'Trash',
    icon: Trash,
    path: '/trash',
  },
  {
    label: 'Storage',
    icon: Cloud,
    path: '/cloud',
  },
];
