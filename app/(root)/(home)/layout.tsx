import { ChildProps } from '@/types';
import Navbar from '@/components/shared/navbar';
import Sidebar from '@/components/shared/sidebar';

export default function AuthLayout({ children }: ChildProps) {
  return (
    <div className={'relative'}>
      <Navbar />
      <Sidebar />
      <main className="relative top-[10vh] w-full min-h-[90vh] pl-72 p-4">
        <div className="h-[85vh] w-full rounded-md bg-white p-8 ml-4 overflow-auto dark:bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}
