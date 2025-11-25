import React from "react";
import { cn } from "@/lib/utils";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxVariant = "default" | "outline";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  loading?: boolean;
  labelComponent?: React.ReactNode;
  id?: string;
}

const sizeClasses: Record<CheckboxSize, { checkbox: string; label: string }> = {
  sm: {
    checkbox: "h-3.5 w-3.5",
    label: "text-xs",
  },
  md: {
    checkbox: "h-4 w-4",
    label: "text-sm",
  },
  lg: {
    checkbox: "h-5 w-5",
    label: "text-base",
  },
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      variant = "default",
      loading = false,
      labelComponent,
      className,
      id,
      disabled,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId();
    const finalId = id || checkboxId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const isDisabled = disabled || loading;

    const sizeClass = sizeClasses[size];

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2.5">
          <div className="relative flex items-center pt-0.5">
            <input
              type="checkbox"
              id={finalId}
              ref={ref}
              disabled={isDisabled}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={cn(
                error ? errorId : undefined,
                helperText && !error ? helperId : undefined,
                ariaDescribedBy
              )}
              aria-label={ariaLabel || (label ? undefined : "Checkbox")}
              className={cn(
                "peer appearance-none rounded border-2 transition-all duration-200",
                "bg-white dark:bg-gray-dark-2",
                "border-gray-400 dark:border-gray-600",
                "text-green dark:text-green",
                "focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2",
                "focus:ring-offset-white dark:focus:ring-offset-gray-dark-1",
                "cursor-pointer",
                "checked:bg-green checked:border-green",
                "checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDNMNC41IDguNUwyIDYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==')]",
                "checked:bg-center checked:bg-no-repeat checked:bg-contain",
                "hover:border-green dark:hover:border-green",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-400 dark:disabled:hover:border-gray-600",
                "indeterminate:bg-green indeterminate:border-green",
                variant === "outline" ? "bg-transparent" : undefined,
                sizeClass.checkbox,
                className
              )}
              {...props}
            />
            {loading && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-2 w-2 animate-spin rounded-full border-2 border-gray-300 border-t-green" />
              </div>
            )}
          </div>
          {(label || labelComponent) && (
            <label
              htmlFor={finalId}
              className={cn(
                "cursor-pointer select-none font-medium text-foreground",
                "peer-hover:text-green dark:peer-hover:text-green",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                "transition-colors duration-200",
                sizeClass.label
              )}
            >
              {labelComponent || label}
            </label>
          )}
        </div>
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

Checkbox.displayName = "Checkbox";
