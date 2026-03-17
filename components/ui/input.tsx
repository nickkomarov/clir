// Figma component: Input, Input/password-default, Input/password-filled
// Figma file: V0MgmJpx3GHKhMKId1aEaz — nodes 3928:6761, 3926:6014, 3926:6021
// Variants: State=Default, State=Focused, State=Filled, State=Error

"use client";

import { useState, type InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  helperText?: string;
  error?: string;
  type?: "text" | "password" | "email" | "tel" | "number";
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "size-[24px]"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10L12 14L16 10" stroke="#737C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Input({
  label,
  helperText,
  error,
  type = "text",
  value,
  className,
  onFocus,
  onBlur,
  onChange,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? "");

  const currentValue = value !== undefined ? value : internalValue;
  const hasValue = String(currentValue).length > 0;
  const isFloating = focused || hasValue;
  const hasError = !!error;

  const borderClass = hasError
    ? "border-2 border-semantic-error"
    : focused
    ? "border-2 border-primary-black"
    : "border border-neutral-100";

  const labelColorClass = hasError
    ? "text-semantic-error"
    : "text-neutral-500";

  const helperColorClass = hasError
    ? "text-semantic-error"
    : "text-neutral-500";

  return (
    <div className={`flex w-full flex-col gap-2xs ${className ?? ""}`}>
      <div
        className={`relative flex w-full items-center rounded-xl bg-primary-white px-lg ${borderClass} transition-colors`}
        style={{ paddingTop: isFloating ? "14px" : "25px", paddingBottom: isFloating ? "14px" : "25px" }}
      >
        <div className="flex flex-1 flex-col gap-3xs justify-center min-w-0">
          {isFloating && (
            <span className={`text-caption-bold ${labelColorClass}`}>
              {label}
            </span>
          )}
          <input
            type={type}
            value={currentValue}
            placeholder={isFloating ? "" : label}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onChange={(e) => {
              setInternalValue(e.target.value);
              onChange?.(e);
            }}
            className="w-full bg-transparent text-body-semi text-primary-black outline-none placeholder:text-neutral-500 placeholder:font-bold"
            {...props}
          />
        </div>
        <ChevronDownIcon className="ml-2xs size-[24px] shrink-0" />
      </div>
      {(helperText || error) && (
        <span className={`text-caption ${helperColorClass}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
