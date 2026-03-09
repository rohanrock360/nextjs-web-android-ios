'use client';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      {/* Large emoji/illustration */}
      <div className="text-8xl mb-6 animate-bounce-slow">
        🍳
      </div>
      
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center mb-4">
        We're still cooking...
      </h2>
      
      {/* Subtitle */}
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
        Menu coming soon. Check back later!
      </p>
      
      {/* Decorative elements */}
      <div className="relative w-full max-w-sm h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer" />
      </div>
      
      {/* Additional info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 max-w-md w-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Something delicious is in the works
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our team is preparing an amazing menu experience just for you. Stay tuned!
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating particles animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full opacity-20 animate-float" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-float animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-20 animate-float animation-delay-4000" />
      </div>
    </div>
  );
}
