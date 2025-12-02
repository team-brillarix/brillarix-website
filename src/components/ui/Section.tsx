import React from 'react';
import { Heading } from './Heading';

interface SectionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headingWeight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  headingAlign?: 'left' | 'center' | 'right';
  headingFullWidth?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Section({
  children,
  title,
  subtitle,
  headingVariant = 'h2',
  headingWeight = 'bold',
  headingAlign = 'center',
  headingFullWidth = false,
  className = '',
  contentClassName = '',
}: SectionProps) {
  return (
    <section className={`w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-6 sm:gap-10 md:gap-12 ${className}`}>
      {title && (
        <Heading
          variant={headingVariant}
          align={headingAlign}
          weight={headingWeight}
          subtitle={subtitle}
          fullWidth={headingFullWidth}
        >
          {title}
        </Heading>
      )}
      {contentClassName ? (
        <div className={contentClassName}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
