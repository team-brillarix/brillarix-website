"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FaSquare, FaSquareCheck } from "react-icons/fa6";

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
      checked: controlledChecked,
      defaultChecked,
      onChange,
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
    const [isChecked, setIsChecked] = React.useState(
      controlledChecked ?? defaultChecked ?? false
    );

    const sizeClass = sizeClasses[size];

    React.useEffect(() => {
      if (controlledChecked !== undefined) {
        setIsChecked(controlledChecked);
      }
    }, [controlledChecked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (controlledChecked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        <div className="group flex items-start gap-2.5">
          <div className="relative flex items-center pt-0.5">
            <input
              type="checkbox"
              id={finalId}
              ref={ref}
              disabled={isDisabled}
              checked={controlledChecked !== undefined ? controlledChecked : isChecked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={cn(
                error ? errorId : undefined,
                helperText && !error ? helperId : undefined,
                ariaDescribedBy
              )}
              aria-label={ariaLabel || (label ? undefined : "Checkbox")}
              className={cn(
                "peer sr-only",
                sizeClass.checkbox
              )}
              {...props}
            />
            <label
              htmlFor={finalId}
              className={cn(
                "relative flex items-center justify-center rounded transition-all duration-200",
                "bg-white",
                "border border-transparent",
                "cursor-pointer",
                "hover:border-gray-light-2",
                "group-hover:border-gray-light-2",
                "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
                "peer-disabled:hover:border-transparent peer-disabled:group-hover:border-transparent",
                (controlledChecked !== undefined ? controlledChecked : isChecked) && "bg-gray-light-2",
                variant === "outline" ? "bg-transparent" : undefined,
                sizeClass.checkbox,
                className
              )}
            >
              {(controlledChecked !== undefined ? controlledChecked : isChecked) ? (
                <FaSquareCheck className="h-full w-full text-gray-light-10" />
              ) : (
                <FaSquare className="h-full w-full text-gray-light-10" />
              )}
            </label>
            {loading && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div className="h-2 w-2 animate-spin rounded-full border-2 border-gray-light-3 border-t-gray-light-7" />
              </div>
            )}
          </div>
          {(label || labelComponent) && (
            <div
              className={cn(
                "cursor-pointer select-none font-medium text-white/40",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                "transition-colors duration-200",
                sizeClass.label
              )}
              onClick={() => {
                if (!isDisabled) {
                  const input = document.getElementById(finalId) as HTMLInputElement;
                  if (input) {
                    input.click();
                  }
                }
              }}
            >
              {labelComponent || label}
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

Checkbox.displayName = "Checkbox";
