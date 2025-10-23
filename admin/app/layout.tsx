import React from 'react';
import '../app/admins/global.css'; 

export const metadata = {
  title: 'Travabay Admin Panel',
  description: 'Management Dashboard for Travabay',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
 <body suppressHydrationWarning={true}>
          {children}
      </body>
    </html>
  );
}
