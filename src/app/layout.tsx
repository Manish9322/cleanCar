
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { headers } from 'next/headers';

// export const metadata: Metadata = {
//   title: 'AquaShine',
//   description: 'Premium car wash services',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const userPayload = headerList.get('x-user-payload');
  
  return (
    <html lang="en" className="dark">
      <head>
        <title>AquaShine</title>
        <meta name="description" content="Premium car wash services" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        {userPayload && <meta name="x-user-payload" content={userPayload} />}
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
