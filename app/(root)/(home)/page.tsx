import React from 'react';
import { UserButton } from '@clerk/nextjs';

const Homepage = () => {
  return (
    <div className="h-full w-full">
      <UserButton />
    </div>
  );
};

export default Homepage;
