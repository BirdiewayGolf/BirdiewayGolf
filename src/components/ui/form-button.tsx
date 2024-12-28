import React from 'react';
import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function FormButton({ 
  isLoading, 
  loadingText = 'Processing...', 
  children, 
  className,
  ...props 
}: FormButtonProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center justify-center px-4 py-2 rounded-md",
        "bg-green-600 text-white hover:bg-green-700 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="ml-2">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}