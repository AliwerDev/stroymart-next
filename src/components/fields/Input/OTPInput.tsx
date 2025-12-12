'use client';

import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  onEnterPress?: () => void;
}

export default function OTPInput({
  value = '',
  onChange,
  onEnterPress,
  length = 4,
}: OTPInputProps) {
  const [otp, setOtp] = useState(value);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtp(value);
  }, [value]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;

    const newOtp = otp.split('');
    newOtp[index] = digit;
    const updatedOtp = newOtp.join('');

    setOtp(updatedOtp);
    onChange?.(updatedOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress?.();
      return;
    }

    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = otp.split('');
      newOtp[index] = '';
      const updatedOtp = newOtp.join('');
      setOtp(updatedOtp);
      onChange?.(updatedOtp);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    setOtp(pastedData);
    onChange?.(pastedData);

    const nextEmptyIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          placeholder="0"
          className="w-[58px] h-12 text-center text-lg border border-gray-200 rounded-[10px] focus:outline-none focus:border-primary-500"
        />
      ))}
    </div>
  );
}
