'use client';

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthForm({ children, title, subtitle }: AuthFormProps) {
 return (
   <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
     {/* Animated background gradient */}
     <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 animate-gradient-xy" />
     
     {/* Glassmorphism card */}
     <div className="relative w-full max-w-md z-10">
       {/* Decorative elements - positioned absolutely without affecting layout */}
       <div className="absolute top-10 -left-16 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob" />
       <div className="absolute top-10 -right-16 w-64 h-64 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000" />
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000" />
       
       {/* Card content */}
       <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 p-6 sm:p-8">
         {/* Header */}
         <div className="text-center mb-4">
           <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
             {title}
           </h1>
           {subtitle && (
             <p className="text-gray-600 dark:text-gray-400 text-sm">
               {subtitle}
             </p>
           )}
         </div>
         
         {/* Form content */}
         <div className="space-y-4">
           {children}
         </div>
       </div>
       
       {/* Bottom decoration */}
       <div className="mt-4 text-center">
         <p className="text-xs text-gray-500 dark:text-gray-400">
           Secure OTP Authentication 🔒
         </p>
       </div>
     </div>
   </div>
  );
}
