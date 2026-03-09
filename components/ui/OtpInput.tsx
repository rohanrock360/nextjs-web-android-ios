'use client';

import { useRef, useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export default function OtpInput({ length = 6, value, onChange, disabled = false, error = false }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Only allow single digit
    if (val && !/^\d$/.test(val)) return;

    const newValue = value.split('');
    newValue[index] = val;
    onChange(newValue.join(''));

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    
    if (!/^\d+$/.test(pastedData)) return;

    onChange(pastedData);
    
    // Focus the next empty input or last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
         value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-10 h-12 sm:w-14 sm:h-16 text-center text-lg sm:text-xl font-semibold rounded-xl border-2 transition-all duration-200 outline-none
            ${error
              ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-4 focus:ring-red-500/20'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:border-gray-400 dark:hover:border-gray-500
            transform scale-100 hover:scale-105 focus:scale-110`}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}
