"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { FAQItemProps } from '@/types/faq';

export function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`${isOpen ? 'bg-gray-dark-1' : ''} rounded-3xl overflow-hidden cursor-pointer hover:bg-gray-dark-1 transition-colors duration-200 border border-gray-dark-2 p-4 lg:p-6`}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${faq.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="w-full flex items-center justify-between text-left gap-4">
        <p className="text-gray-light-1 font-semibold text-base">
          {faq.question}
        </p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaChevronDown className="w-4 h-4 text-gray-light-1 shrink-0" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.3, ease: "easeOut", delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="text-gray-light-5 text-base leading-relaxed pt-3">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

