"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/hooks/useMenu";
import { FaChevronDown } from "react-icons/fa";

export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "default" | "outline" | "filled";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: DropdownSize;
  variant?: DropdownVariant;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  labelClassName?: string;
  className?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const sizeClasses: Record<
  DropdownSize,
  { dropdown: string; label: string; icon: string }
> = {
  sm: {
    dropdown: "h-8 px-3 text-sm",
    label: "text-xs",
    icon: "h-3.5 w-3.5",
  },
  md: {
    dropdown: "h-10 px-4 text-sm",
    label: "text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    dropdown: "h-12 px-4 text-base",
    label: "text-sm",
    icon: "h-5 w-5",
  },
};

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      error,
      helperText,
      size = "lg",
      variant = "default",
      disabled = false,
      id,
      required,
      labelClassName,
      className,
      options,
      value,
      onChange,
      placeholder = "Select an option",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
    },
    ref
  ) => {
    const dropdownId = React.useId();
    const finalId = id || dropdownId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const { isMenuOpen, toggleMenu, closeMenu, menuRef } = useMenu();

    const sizeClass = sizeClasses[size];

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const optionsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

    const handleOptionClick = (optionValue: string) => {
      onChange?.(optionValue);
      closeMenu();
      setFocusedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isMenuOpen) {
            toggleMenu();
          } else if (focusedIndex >= 0) {
            handleOptionClick(options[focusedIndex].value);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isMenuOpen) {
            toggleMenu();
          } else {
            setFocusedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isMenuOpen) {
            setFocusedIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1
            );
          }
          break;
        case "Escape":
          e.preventDefault();
          closeMenu();
          setFocusedIndex(-1);
          break;
      }
    };

    React.useEffect(() => {
      if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
        optionsRef.current[focusedIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [focusedIndex]);

    return (
      <div ref={ref} className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              "font-medium text-white/40 leading-1.4 uppercase",
              "peer-disabled:opacity-20",
              sizeClass.label,
              required && "after:ml-0.5 after:text-red after:content-['*']",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            id={finalId}
            disabled={disabled}
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(
              error ? errorId : undefined,
              helperText && !error ? helperId : undefined,
              ariaDescribedBy
            )}
            aria-label={ariaLabel || (label ? undefined : "Dropdown")}
            aria-required={required}
            className={cn(
              "w-full rounded-xl py-3 px-4 font-medium transition-all duration-200",
              "bg-white dark:bg-gray-dark-2",
              "border border-white/8 dark:border-white/8",
              "leading-1.5",
              selectedOption ? "text-white" : "text-gray-dark-7 dark:text-gray-light-7",
              "focus:outline-none focus:border-gray-light-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-between",
              isMenuOpen && !error && "border-gray-light-2",
              error
                ? "border-red dark:border-red-light-03"
                : undefined,
              variant === "outline" ? "bg-transparent" : undefined,
              variant === "filled"
                ? "bg-gray-light-1 dark:bg-gray-dark-3 border-transparent focus:border-gray-light-2"
                : undefined,
              sizeClass.dropdown,
              className
            )}
          >
            <span>{displayValue}</span>
            <FaChevronDown
              className={cn(
                "ml-2 text-gray-light-7 dark:text-gray-light-5 transition-transform duration-200",
                isMenuOpen && "rotate-180",
                sizeClass.icon
              )}
            />
          </button>

          {isMenuOpen && !disabled && (
            <div
              className={cn(
                "w-full absolute z-50 mt-1 p-3 h-fit rounded-xl",
                "bg-white dark:bg-background",
                "border border-gray-light-2 dark:border-white/8",
              )}
              role="listbox"
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  ref={(el) => {
                    optionsRef.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => handleOptionClick(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={cn(
                    "w-full p-3 h-11 gap-2.5 text-left",
                    "text-white leading-1.5 border-b border-gray-light-2 dark:border-gray-dark-2",
                    "focus:bg-gray-dark-3 dark:focus:bg-gray-dark-4",
                    (value === option.value || focusedIndex === index) &&
                      "bg-gray-dark-3 dark:bg-gray-dark-4",
                    sizeClass.dropdown.replace("h-", "min-h-")
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
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
            className="text-xs text-gray-dark-7 dark:text-gray-light-7"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

