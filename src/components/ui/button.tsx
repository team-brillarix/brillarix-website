import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  leftImage?: React.ReactNode;
  rightImage?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

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
      "focus-within:bg-transparent",
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
      "w-fit h-11 rounded-lg py-3 px-4 gap-2.5",
      "bg-gray-dark-4",
      "text-gray-light-2",
      "font-medium text-sm leading-5",
      "inline-flex items-center justify-center",
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
      "w-full h-full rounded-lg py-3 px-4 gap-2.5",
      "bg-gray-dark-1",
      "text-gray-light-3",
      "font-medium text-sm leading-5",
      "inline-flex items-center justify-center",
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
      "w-full h-full rounded-lg py-3 px-4 gap-2.5",
      "bg-transparent",
      "text-gray-light-1",
      "underline",
      "font-medium text-sm leading-5",
      "inline-flex items-center justify-center",
      "transition-all duration-500 ease-in-out",
      "hover:bg-gray-dark-7",
      "hover:text-gray-light-1",
      "hover:underline",
      "active:transition-none",
      "active:bg-gray-light-7",
      "active:text-gray-light-5",
      "active:underline",
      "focus:outline-none",
      "focus:bg-gray-light-8",
      "focus:text-gray-light-1",
      "focus:underline",
      "disabled:bg-transparent",
      "disabled:text-gray-light-5",
      "disabled:underline",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      leftImage,
      rightImage,
      disabled = false,
      children,
      className,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];

    return (
      <span
        className={cn(
          styles.wrapper,
          className
        )}
      >
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={styles.button}
          {...props}
        >
          {leftImage && (
            <span className="inline-flex items-center">{leftImage}</span>
          )}
          {children}
          {rightImage && (
            <span className="inline-flex items-center">{rightImage}</span>
          )}
        </button>
      </span>
    );
  }
);

Button.displayName = "Button";

