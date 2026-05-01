'use client';

import { SignIn } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import { useTheme } from '@/components/providers/theme-provider';

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : shadesOfPurple,
      }}
    />
  );
}
