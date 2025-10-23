'use client';
import { useEffect, FC } from 'react'; 

// 1. Define the props interface
interface SpinnerProps {
    className: string;
}

// 2. Apply the interface to the component
const Spinner: FC<SpinnerProps> = ({ className }) => (
// OR: const Spinner = ({ className }: SpinnerProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style dangerouslySetInnerHTML={{
      __html: `
      .spinner-path {
        transform-origin: 12px 12px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      `
    }} />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75 spinner-path"></path>
  </svg>
);


export default function AdminRootPage() {
 useEffect(() => {
  if (typeof window !== 'undefined') {
      window.location.replace('/admins/login');
  }
 }, []); 

 return (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <Spinner className="w-8 h-8 text-blue-500 mr-2" />
    <span className="text-gray-600">Redirecting to login...</span>
  </div>
 );
}