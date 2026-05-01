import { LucideIcon } from 'lucide-react';

interface ItemProps {
  icon: LucideIcon;
  label: string;
}

const Item = ({ icon: Icon, label }: ItemProps) => {
  return (
    <div className="flex cursor-pointer items-center rounded-full px-4 py-2 transition hover:bg-secondary">
      <Icon className="h-5 w-5" />
      <span className="text-md pl-2 opacity-75">{label}</span>
    </div>
  );
};

export default Item;
