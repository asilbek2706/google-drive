'use client';

import { SignUp } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import { useTheme } from '@/components/providers/theme-provider';

export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : shadesOfPurple,
      }}
    />
  );
}
