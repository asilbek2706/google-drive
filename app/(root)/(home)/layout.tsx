import { ChildProps } from '@/types';
import Navbar from '@/components/shared/navbar';
import Sidebar from '@/components/shared/sidebar';

export default function AuthLayout({ children }: ChildProps) {
  return (
    <div className={'relative'}>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
}
