// Figma component: Toggle
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6803
// Variants: State=Off, State=On

"use client";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Toggle({
  checked = false,
  onChange,
  className,
}: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative h-[28px] w-[48px] rounded-toggle transition-colors ${
        checked ? "bg-primary-black" : "bg-neutral-100"
      } ${className ?? ""}`}
    >
      <span
        className="absolute top-[3px] size-[22px] rounded-full bg-primary-white shadow-low transition-[left] duration-200"
        style={{ left: checked ? 23 : 3 }}
      />
    </button>
  );
}
