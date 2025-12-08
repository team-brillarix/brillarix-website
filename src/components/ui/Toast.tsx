"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-xl',
              type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            )}
          >
            {type === 'success' ? (
              <FiCheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <FiAlertCircle className="w-5 h-5 shrink-0" />
            )}
            <p className="text-sm flex-1">{message}</p>
            <button
              onClick={onClose}
              className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

