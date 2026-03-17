// Figma component: OTPInput
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6798
// Variants: State=Default, State=Active, State=Filled, State=Error

"use client";

import { useRef, type KeyboardEvent, type ChangeEvent } from "react";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  className?: string;
}

export function OTPInput({
  length = 4,
  value = "",
  onChange,
  error = false,
  className,
}: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const newValue = digits.map((d, i) => (i === index ? digit : d)).join("");
    onChange?.(newValue);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex gap-xs ${className ?? ""}`}>
      {digits.map((digit, i) => {
        const isFilled = digit !== "";
        const borderClass = error
          ? "border-semantic-error"
          : "border-neutral-100";

        return (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`flex size-[56px] items-center justify-center rounded-md border-[1.5px] bg-primary-white text-center font-bold text-[24px] leading-none outline-none transition-colors focus:border-primary-black ${borderClass} ${
              isFilled ? "text-primary-black" : "text-neutral-200"
            }`}
            placeholder="–"
          />
        );
      })}
    </div>
  );
}
