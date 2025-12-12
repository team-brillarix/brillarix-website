import React from "react";
import { cn } from "@/lib/utils";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  id?: string;
  required?: boolean;
  labelClassName?: string;
}

const sizeClasses: Record<
  InputSize,
  { input: string; label: string; icon: string }
> = {
  sm: {
    input: "h-8 px-3 text-sm",
    label: "text-xs",
    icon: "h-3.5 w-3.5",
  },
  md: {
    input: "h-10 px-4 text-sm",
    label: "text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    input: "h-12 px-4 text-base",
    label: "text-sm",
    icon: "h-5 w-5",
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = "lg",
      loading = false,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      value,
      onChange,
      required,
      labelClassName,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const finalId = React.useMemo(() => id || inputId, [id, inputId]);
    const errorId = React.useMemo(() => `${finalId}-error`, [finalId]);
    const helperId = React.useMemo(() => `${finalId}-helper`, [finalId]);
    const isDisabled = disabled || loading;

    const sizeClass = sizeClasses[size];

    const ariaDescribedByValue = React.useMemo(() => {
      const ids: string[] = [];
      if (error) ids.push(errorId);
      else if (helperText) ids.push(helperId);
      if (ariaDescribedBy) ids.push(ariaDescribedBy);
      return ids.length > 0 ? ids.join(" ") : undefined;
    }, [error, errorId, helperText, helperId, ariaDescribedBy]);

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              "font-medium text-white/40 leading-1.4",
              "peer-disabled:opacity-20",
              sizeClass.label,
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-light-7",
                "pointer-events-none",
                sizeClass.icon
              )}
            >
              {leftIcon}
            </div>
          )}
          <input
            id={finalId}
            ref={ref}
            disabled={isDisabled}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={ariaDescribedByValue}
            aria-label={ariaLabel || (label ? undefined : "Input")}
            aria-required={required}
            className={cn(
              "w-full rounded-xl border py-3 px-4 font-normal transition-all duration-200",
              "bg-transparent",
              "border-white/8",
              "text-white leading-1.5 placeholder:text-gray-dark-7",
              "focus:outline-none focus:border-gray-light-2",
              "focus:ring-offset-2 focus:ring-offset-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "read-only:cursor-default read-only:bg-gray-light-1",
              error
                ? "border-red focus:ring-red focus:border-red"
                : undefined,
              leftIcon ? "pl-10" : undefined,
              rightIcon || loading ? "pr-10" : undefined,
              sizeClass.input,
              className
            )}
            {...props}
          />
          {loading && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                sizeClass.icon
              )}
              aria-hidden="true"
            >
              <div className="h-full w-full animate-spin rounded-full border-2 border-gray-light-3" />
            </div>
          )}
          {!loading && rightIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-light-7",
                "pointer-events-none",
                sizeClass.icon
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <span
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs font-medium text-red"
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={helperId}
            className="text-xs text-gray-dark-7"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
