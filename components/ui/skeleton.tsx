import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted dark:bg-[#2C2C2C]',
        className
      )}
    />
  );
};
