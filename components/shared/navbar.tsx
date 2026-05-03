'use client';

import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './mode-toggle';
import { HelpCircle, Search, Settings } from 'lucide-react';
import UserBox from './user-box';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSearch } from '@/hooks/use-search';

const Navbar = () => {
  const { userId } = useAuth();
  const { setQuery } = useSearch();

  return (
    <div className="h-[10vh] fixed left-0 top-0 right-0 z-30 bg-[#F6F9FC] dark:bg-[#1F1F1F] border-b">
      <div className="flex items-center justify-between my-4 mx-6">
        <div className="flex items-center gap-x-12">
          <Link href={'/'}>
            <div className="flex items-center">
              <Image src={'/logo.svg'} alt="Logo" width={40} height={40} />
              <span className="pl-2 text-[22px] opacity-75">Drive</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center bg-[#EAF1FB] dark:bg-[#2C2C2C] px-4 py-2 rounded-full w-full max-w-[700px]">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              className="bg-transparent outline-none w-full text-base placeholder-gray-500"
              placeholder="Search in Drive"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <HelpCircle className="w-5 h-5" />
          </div>
          <div
            className="p-2 hover:bg-secondary rounded-full transition"
            role="button"
          >
            <Settings className="w-5 h-5" />
          </div>
          {userId ? (
            <UserBox />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
