// import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import { Separator } from '../ui/separator';
import Box from '../icons/box';
import NotificationIcon from '../icons/notification';

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full bg-white drop-shadow-md">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <NotificationIcon />
          <Box />
          <Separator orientation="vertical" className="h-[1.813rem] bg-[#98A2B3]" />
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </header>
  );
}
