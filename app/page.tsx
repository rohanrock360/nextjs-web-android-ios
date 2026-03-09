'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session and redirect accordingly
    const checkSession= () => {
      const session= getSession();
      
      if (session) {
        // User is logged in - redirect to dashboard
        router.push('/dashboard');
      } else {
        // User is not logged in - redirect to login
        router.push('/login');
      }
    };

    checkSession();
    setIsLoading(false);
  }, [router]);

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="text-center animate-fade-in-up">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          {/* Loading Spinner */}
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Loading Text */}
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading QuickBite...</p>
        </div>
      </div>
    );
  }

  return null; // Return null during redirect
}
