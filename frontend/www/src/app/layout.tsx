import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

import { ContextProvider } from '@/providers/ContextProvider';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Remove People From Photos',
  description: 'Magically remove unwanted people from your photos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx('min-h-screen font-inter antialiased', inter.variable)}>
        <ContextProvider>
          {children}
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
