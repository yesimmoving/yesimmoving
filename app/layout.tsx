import type { Metadata } from 'next';
import './globals.css';
import SailboatCursor from '@/components/SailboatCursor';

export const metadata: Metadata = {
  title: 'yesimmoving',
  description: 'Nothing is without meaning',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SailboatCursor />
        {children}
      </body>
    </html>
  );
}
