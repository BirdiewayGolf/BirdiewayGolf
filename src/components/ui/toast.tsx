import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50",
      "flex items-center gap-2 p-4 rounded-lg shadow-lg",
      "transform transition-all duration-300",
      type === 'success' && "bg-green-100 text-green-800",
      type === 'error' && "bg-red-100 text-red-800",
      type === 'info' && "bg-blue-100 text-blue-800",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
    )}>
      <Icon className="h-5 w-5" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
}