import { Clock5, Cloud, Plus, Star, Tablet, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Item from './item';
import { Progress } from '../ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import PopoverActions from './popover-actions';

const Sidebar = () => {
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

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Item icon={link.icon} label={link.label} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={33} />
            <span>20 MB of 1.5 GB used</span>

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
