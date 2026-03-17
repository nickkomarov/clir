// Figma component: Checkbox
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6807
// Variants: State=Unchecked, State=Checked

"use client";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`flex size-[24px] items-center justify-center rounded-2xs transition-colors ${
        checked
          ? "bg-primary-black"
          : "border-[1.5px] border-neutral-100 bg-primary-white"
      } ${className ?? ""}`}
    >
      {checked && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
