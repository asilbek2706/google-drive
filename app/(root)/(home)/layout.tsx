import { ChildProps } from '@/types';
import Navbar from '@/components/shared/navbar';
import Sidebar from '@/components/shared/sidebar';

export default function AuthLayout({ children }: ChildProps) {
  return (
    <div className={'relative'}>
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-screen bg-black/50" />
      <Navbar />
      <Sidebar />
      <main className="relative top-[10vh] min-h-[90vh] w-full p-4 pl-72">
        <div className="ml-4 h-[85vh] w-full overflow-auto rounded-md bg-white p-8 dark:bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}
