import React, { forwardRef } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Align = 'left' | 'center' | 'right';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type Scale = 'expressive' | 'compact';
type SubtitleTag = 'p' | 'div' | 'span';

const sizesExpressive: Record<Variant, string> = {
    h1: 'text-4xl sm:text-5xl md:text-6xl',
    h2: 'text-3xl sm:text-4xl md:text-5xl',
    h3: 'text-2xl sm:text-3xl md:text-[40px]',
    h4: 'text-xl sm:text-2xl md:text-[32px]',
    h5: 'text-lg sm:text-xl md:text-2xl',
    h6: 'text-base sm:text-lg md:text-xl',
};

const sizesCompact: Record<Variant, string> = {
    h1: 'text-3xl sm:text-4xl md:text-5xl',
    h2: 'text-2xl sm:text-3xl md:text-[40px]',
    h3: 'text-xl sm:text-2xl md:text-[32px]',
    h4: 'text-lg sm:text-xl md:text-2xl',
    h5: 'text-base sm:text-lg md:text-xl',
    h6: 'text-sm sm:text-base md:text-lg',
};

const weightClass: Record<Weight, string> = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
};

const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
} as const;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: Variant;
    as?: HeadingTag;
    align?: keyof typeof alignClass;
    weight?: Weight;
    eyebrow?: string;
    scale?: Scale;
    subtitle?: React.ReactNode;
    subtitleAs?: SubtitleTag;
    subtitleClassName?: string;
    fullWidth?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    {
        variant = 'h2',
        as,
        align = 'center',
        weight = 'bold',
        eyebrow,
        scale = 'expressive',
        className = '',
        children,
        subtitle,
        subtitleAs = 'p',
        subtitleClassName = '',
        fullWidth = false,
        ...rest
    },
    ref
) {
    const tag: HeadingTag = as ?? (variant === 'h1' ? 'h1' : variant);
    const sizeClass = (scale === 'compact' ? sizesCompact : sizesExpressive)[variant];
    const subtitleSize = scale === 'compact' ? 'text-sm' : 'text-base';

    const classes = [
        sizeClass,
        weightClass[weight],
        alignClass[align],
        'tracking-tight',
        'text-gray-light-1',
        'antialiased',
        className,
    ].join(' ');

    return (
        <header className={`${fullWidth ? 'w-full' : ''} ${alignClass[align]}`}>
            {eyebrow ? (
                <div className="mb-2 text-xs uppercase tracking-[0.12em] text-gray-light-1">{eyebrow}</div>
            ) : null}

            {React.createElement(
                tag,
                {
                    ...rest,
                    ref,
                    className: classes,
                    style: { textWrap: 'auto', lineHeight: '1.2', ...(rest.style || {}) },
                },
                children
            )}

            {subtitle
                ? React.createElement(
                    subtitleAs,
                    {
                        className: [
                            'mt-2',
                            subtitleSize,
                            'text-gray-light-3',
                            'leading-relaxed',
                            'font-normal',
                            subtitleClassName,
                        ].join(' '),
                    },
                    subtitle
                )
                : null}
        </header>
    );
});
