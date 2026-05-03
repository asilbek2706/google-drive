import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Item = ({ icon: Icon, label, active, onClick }: ItemProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        'flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer',
        active &&
          'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200'
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="pl-2 text-md font-medium opacity-75">{label}</span>
    </div>
  );
};

export default Item;
