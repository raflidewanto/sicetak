import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import NextThemeProvider from '@/components/theme-provider';
import ReactQueryProvider from '@/components/contexts/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
          <NuqsAdapter>
            <ReactQueryProvider>
              <NextTopLoader showSpinner={false} />
              <Toaster />
              {children}
            </ReactQueryProvider>
          </NuqsAdapter>
        </NextThemeProvider>
      </body>
    </html>
  );
}
