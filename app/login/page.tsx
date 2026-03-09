'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import OtpInput from '@/components/ui/OtpInput';
import Toast, { ToastType } from '@/components/ui/Toast';
import { generateOTP, setStoredOTP, getUser, setSession, getStoredOTP } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    setError(null);
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if user exists
    const existingUser = getUser(email);
    if (!existingUser) {
      setError('User not found. Please register first.');
      setToast({ message: 'User not found. Please register first.', type: 'error' });
      return;
    }

    setIsLoading(true);
    
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setStoredOTP(email, newOTP);
    
    setIsLoading(false);
    setStep('otp');
    setToast({ message: 'OTP sent successfully!', type: 'success' });
    
    console.log('Generated OTP:', newOTP); // For testing
  };

  const handleVerifyOTP = async () => {
    setError(null);
    
    if (otp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedData = getStoredOTP(email);
    
    if (storedData && storedData.otp === otp) {
      // OTP matches - login successful
      setSession(email);
      
      // Clear stored OTP
      localStorage.removeItem(`otp_${email.toLowerCase()}`);
      
      setIsLoading(false);
      setToast({ message: 'Login successful!', type: 'success' });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } else {
      setIsLoading(false);
      setError('Invalid OTP. Please try again.');
      setToast({ message: 'Invalid OTP', type: 'error' });
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setStoredOTP(email, newOTP);
    
    setIsLoading(false);
    setOtp('');
    setToast({ message: 'New OTP sent!', type: 'success' });
    
    console.log('New OTP:', newOTP); // For testing
  };

  return (
    <>
      <AuthForm
        title="Welcome Back"
        subtitle="Login with OTP verification"
      >
        {/* Email Step */}
        {step === 'email' && (
          <div className="space-y-4 animate-fade-in-up">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
           value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email ? error : undefined}
              fullWidth
              disabled={isLoading}
              autoComplete="email"
            />
            
            {error && !email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            <Button
              onClick={handleSendOTP}
            isLoading={isLoading}
              fullWidth
            >
              Send OTP
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                We've sent a 6-digit code to
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {email}
              </p>
            </div>

            <OtpInput
              length={6}
            value={otp}
              onChange={setOtp}
              disabled={isLoading}
              error={!!error}
            />

            {error && (
              <p className="text-sm text-red-600 text-center flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            <Button
              onClick={handleVerifyOTP}
            isLoading={isLoading}
              fullWidth
              disabled={otp.length !== 6}
            >
              Verify & Login
            </Button>

            <div className="text-center space-y-3">
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Want to use a different email?{' '}
                  <button
                    onClick={() => {
                      setStep('email');
                      setOtp('');
                      setGeneratedOTP(null);
                      setError(null);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Go back
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </AuthForm>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
