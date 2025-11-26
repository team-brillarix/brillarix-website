"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftImage?: React.ReactNode;
  rightImage?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  id?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const sizeClasses: Record<ButtonSize, { height: string; padding: string; text: string }> = {
  sm: {
    height: "h-10",
    padding: "py-2 px-3",
    text: "text-xs",
  },
  md: {
    height: "h-11",
    padding: "py-3 px-4",
    text: "text-sm",
  },
  lg: {
    height: "h-12",
    padding: "py-3.5 px-5",
    text: "text-base",
  },
};

const variantStyles: Record<
  ButtonVariant,
  {
    wrapper: string;
    button: string;
  }
> = {
  primary: {
    wrapper: cn(
      "inline-block rounded-lg",
      "gray-dark-4",
      "p-[1px]",
      "w-fit",
      "transition-all duration-500 ease-in-out",
      "hover:bg-gradient-to-b hover:from-gray-dark-4 hover:to-white",
      "hover:shadow-[0_4px_6px_0_rgba(255,255,255,0.25)]",
      "active:transition-none",
      "active:bg-transparent",
      "active:border-none",
      "active:shadow-none",
      "focus-within:bg-gray-light-1",
      "focus-within:shadow-[0_0_4px_0_rgba(255,255,255,1)]",
      "has-[:disabled]:bg-gray-dark-6",
      "has-[:disabled]:pointer-events-none",
      "has-[:disabled]:hover:bg-gray-dark-6",
      "has-[:disabled]:hover:shadow-none",
      "has-[:disabled]:active:bg-gray-dark-6",
      "has-[:disabled]:active:shadow-none",
      "has-[:disabled]:focus-within:bg-gray-dark-6",
      "has-[:disabled]:focus-within:shadow-none"
    ),
    button: cn(
      "w-fit rounded-lg gap-2",
      "bg-gray-dark-4",
      "text-gray-light-2",
      "font-medium leading-5",
      "inline-flex items-center justify-center",
      "cursor-pointer",
      "transition-all duration-500 ease-in-out",
      "hover:bg-gradient-to-r hover:from-gray-dark-3 hover:to-[#4B4B4B]",
      "hover:text-white",
      "active:transition-none",
      "active:bg-gray-light-6",
      "active:text-gray-dark-4",
      "active:border-none",
      "focus:outline-none",
      "focus:bg-gray-light-1",
      "focus:text-gray-dark-2",
      "focus:border-none",
      "disabled:bg-gray-dark-6",
      "disabled:text-gray-dark-9",
      "disabled:cursor-not-allowed",
      "disabled:hover:bg-gray-dark-6",
      "disabled:hover:text-gray-dark-9",
      "disabled:hover:shadow-none",
      "disabled:active:bg-gray-dark-6",
      "disabled:active:text-gray-dark-9",
      "disabled:focus:bg-gray-dark-6",
      "disabled:focus:text-gray-dark-9",
      "disabled:focus:shadow-none"
    ),
  },
  secondary: {
    wrapper: cn(
      "inline-block rounded-lg",
      "border-[1px] border-gray-dark-5",
      "bg-gray-dark-1",
      "transition-all duration-500 ease-in-out",
      "hover:border-none",
      "hover:bg-gradient-to-r hover:from-gray-dark-5 hover:to-[#9e9e9e]",
      "hover:p-[1px]",
      "active:transition-none",
      "active:border-none",
      "active:bg-transparent",
      "active:p-0",
      "focus-within:border-none",
      "focus-within:bg-transparent",
      "focus-within:p-0",
      "focus-within:shadow-[0_0_4px_0_rgba(255,255,255,1)]",
      "has-[:disabled]:bg-transparent",
      "has-[:disabled]:p-0",
      "has-[:disabled]:border-none",
      "has-[:disabled]:pointer-events-none",
      "has-[:disabled]:hover:border-[1px]",
      "has-[:disabled]:hover:border-gray-dark-5",
      "has-[:disabled]:hover:bg-transparent",
      "has-[:disabled]:hover:p-0",
      "has-[:disabled]:hover:shadow-none",
      "has-[:disabled]:active:border-[1px]",
      "has-[:disabled]:active:border-gray-dark-5",
      "has-[:disabled]:active:bg-transparent",
      "has-[:disabled]:active:p-0",
      "has-[:disabled]:focus-within:border-[1px]",
      "has-[:disabled]:focus-within:border-gray-dark-5",
      "has-[:disabled]:focus-within:bg-transparent",
      "has-[:disabled]:focus-within:p-0",
      "has-[:disabled]:focus-within:shadow-none"
    ),
    button: cn(
      "w-full h-full rounded-lg gap-2",
      "bg-gray-dark-1",
      "text-gray-light-3",
      "font-medium leading-5",
      "inline-flex items-center justify-center",
      "cursor-pointer",
      "transition-all duration-500 ease-in-out",
      "hover:bg-gray-dark-1",
      "hover:text-gray-light-1",
      "active:transition-none",
      "active:bg-gray-light-7",
      "active:text-gray-light-5",
      "active:border-none",
      "focus:outline-none",
      "focus:bg-gray-light-1",
      "focus:text-gray-light-10",
      "focus:border-none",
      "disabled:bg-transparent",
      "disabled:text-gray-dark-8",
      "disabled:cursor-not-allowed",
      "disabled:hover:bg-transparent",
      "disabled:hover:border-none",
      "disabled:hover:text-gray-dark-8",
      "disabled:hover:shadow-none",
      "disabled:active:bg-transparent",
      "disabled:active:text-gray-dark-8",
      "disabled:focus:bg-transparent",
      "disabled:focus:text-gray-dark-8",
      "disabled:focus:shadow-none"
    ),
  },
  tertiary: {
    wrapper: cn(
      "inline-block rounded-lg",
      "transition-all duration-500 ease-in-out",
      "has-[:disabled]:pointer-events-none",
      "has-[:disabled]:hover:bg-transparent",
      "has-[:disabled]:active:bg-transparent",
      "has-[:disabled]:focus-within:bg-transparent",
      "has-[:disabled]:focus-within:shadow-none"
    ),
    button: cn(
      "w-full h-full rounded-lg gap-2",
      "bg-transparent",
      "text-gray-light-1",
      "font-medium leading-5",
      "inline-flex items-center justify-center",
      "cursor-pointer",
      "transition-all duration-500 ease-in-out",
      "hover:bg-gray-dark-7",
      "hover:text-gray-light-1",
      "active:transition-none",
      "active:bg-gray-light-7",
      "active:text-gray-light-5",
      "focus:outline-none",
      "focus:bg-gray-light-8",
      "focus:text-gray-light-1",
      "disabled:bg-transparent",
      "disabled:text-gray-light-5",
      "disabled:cursor-not-allowed",
      "disabled:hover:bg-transparent",
      "disabled:hover:text-gray-light-5",
      "disabled:hover:shadow-none",
      "disabled:active:bg-transparent",
      "disabled:active:text-gray-light-5",
      "disabled:focus:bg-transparent",
      "disabled:focus:text-gray-light-5",
      "disabled:focus:shadow-none"
    ),
  },
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftImage,
      rightImage,
      disabled = false,
      loading = false,
      error,
      helperText,
      children,
      className,
      id,
      onClick,
      type = "button",
      href,
      target,
      rel,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const buttonId = React.useId();
    const finalId = id || buttonId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const isDisabled = disabled || loading;

    const styles = variantStyles[variant];
    const sizeClass = sizeClasses[size];

    const content = (
      <>
        {loading && (
          <span className="mr-2" aria-hidden="true">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="sr-only">Loading...</span>
          </span>
        )}
        {leftImage && !loading && (
          <span className="inline-flex items-center">{leftImage}</span>
        )}
        {children}
        {rightImage && !loading && (
          <span className="inline-flex items-center">{rightImage}</span>
        )}
      </>
    );

    return (
      <div className="flex flex-col gap-1.5">
        <span className={styles.wrapper}>
          {href ? (
            <Link
              ref={ref as React.ForwardedRef<HTMLAnchorElement>}
              href={href}
              target={target}
              rel={rel}
              id={finalId}
              onClick={onClick}
              aria-describedby={cn(
                error ? errorId : undefined,
                helperText && !error ? helperId : undefined,
                ariaDescribedBy
              )}
              aria-label={ariaLabel}
              aria-disabled={isDisabled}
              className={cn(
                styles.button,
                sizeClass.height,
                sizeClass.padding,
                sizeClass.text,
                isDisabled && "pointer-events-none opacity-50",
                className
              )}
              {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
              {content}
            </Link>
          ) : (
            <button
              ref={ref as React.ForwardedRef<HTMLButtonElement>}
              id={finalId}
              type={type}
              disabled={isDisabled}
              onClick={onClick}
              aria-describedby={cn(
                error ? errorId : undefined,
                helperText && !error ? helperId : undefined,
                ariaDescribedBy
              )}
              aria-label={ariaLabel}
              aria-busy={loading ? "true" : undefined}
              className={cn(
                styles.button,
                sizeClass.height,
                sizeClass.padding,
                sizeClass.text,
                className
              )}
              {...props}
            >
              {content}
            </button>
          )}
        </span>
        {error && (
          <span
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs font-medium text-red dark:text-red-light-03"
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={helperId}
            className="text-xs text-gray-600 dark:text-gray-500"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Button.displayName = "Button";

