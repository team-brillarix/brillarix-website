"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: TextareaSize;
  loading?: boolean;
  minHeight?: string;
  autoResize?: boolean;
  id?: string;
  required?: boolean;
}

const sizeClasses: Record<TextareaSize, { textarea: string; label: string }> =
  {
    sm: {
      textarea: "px-3 py-2 text-sm min-h-[80px]",
      label: "text-xs",
    },
    md: {
      textarea: "px-4 py-2.5 text-sm min-h-[100px]",
      label: "text-sm",
    },
    lg: {
      textarea: "px-4 py-3 text-base min-h-[120px]",
      label: "text-sm",
    },
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      size = "lg",
      loading = false,
      minHeight,
      autoResize = false,
      className,
      id,
      disabled,
      value,
      onChange,
      required,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const textareaId = React.useId();
    const finalId = id || textareaId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const isDisabled = disabled || loading;

    const sizeClass = sizeClasses[size];

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      onChange?.(e);
    };

    const setRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              "font-medium text-white/40 leading-1.4",
              "peer-disabled:opacity-20",
              sizeClass.label
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            id={finalId}
            ref={setRef}
            disabled={isDisabled}
            value={value}
            onChange={handleChange}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(
              error ? errorId : undefined,
              helperText && !error ? helperId : undefined,
              ariaDescribedBy
            )}
            aria-label={ariaLabel || (label ? undefined : "Textarea")}
            aria-required={required}
            style={{
              minHeight: minHeight || undefined,
              resize: "none",
            }}
            className={cn(
              "w-full rounded-xl border font-normal transition-all duration-200",
              "bg-transparent",
              "border-white/8",
              "text-white leading-relaxed placeholder:text-gray-dark-7",
              "focus:border-gray-light-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "read-only:cursor-default read-only:bg-gray-light-1",
              error
                ? "border-red focus:border-red"
                : undefined,
              sizeClass.textarea,
              autoResize ? "overflow-hidden" : undefined,
              className
            )}
            {...props}
          />
          {loading && (
            <div
              className="absolute right-3 top-3 z-10"
              aria-hidden="true"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-light-3 border-t-transparent" />
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

Textarea.displayName = "Textarea";
