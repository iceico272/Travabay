"use client";
import '../styles/global.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {

 return (
  <html lang="en">
   <body suppressHydrationWarning={true}>
    <Navbar />
    {children} 
    <Footer />
   </body>
  </html>
 );
}