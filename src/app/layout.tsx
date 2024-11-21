import { Toaster } from '@/components/ui/Toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import NextThemeProvider from '@/components/ThemeProvider';
import ReactQueryProvider from '@/components/contexts/ReactQueryContext';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SidebarProvider } from '@/components/contexts/SidebarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SICETAK',
  description: 'si cetak'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`} suppressHydrationWarning>
        <NextThemeProvider>
          <SidebarProvider>
            <NuqsAdapter>
              <ReactQueryProvider>
                <NextTopLoader showSpinner={false} />
                <Toaster />
                {children}
              </ReactQueryProvider>
            </NuqsAdapter>
          </SidebarProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
