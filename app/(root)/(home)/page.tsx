import React from 'react';
import { UserButton } from '@clerk/nextjs';

const Homepage = () => {
  return (
    <div className="flex items-center justify-center">
      <UserButton />
    </div>
  );
};

export default Homepage;
