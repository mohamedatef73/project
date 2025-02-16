import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Hero from './hero';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wedding Essentials & Services',
  description: 'Find everything you need for your special day',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Hero/>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}