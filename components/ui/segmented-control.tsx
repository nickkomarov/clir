// Figma component: SegmentedControl
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6826
// Variants: Active=Left, Active=Right

"use client";

interface SegmentedControlProps {
  leftLabel: string;
  rightLabel: string;
  value: "left" | "right";
  onChange?: (value: "left" | "right") => void;
  className?: string;
}

export function SegmentedControl({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  const activeClass =
    "bg-primary-white rounded-icon shadow-low font-bold text-primary-black";
  const inactiveClass =
    "rounded-icon font-medium text-neutral-500";

  return (
    <div
      className={`flex h-[46px] items-center rounded-xl bg-neutral-50 p-3xs ${className ?? ""}`}
    >
      <button
        onClick={() => onChange?.("left")}
        className={`flex flex-1 items-center justify-center px-sm py-2xs text-[14px] tracking-[-0.02em] transition-all ${
          value === "left" ? activeClass : inactiveClass
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange?.("right")}
        className={`flex flex-1 items-center justify-center px-sm py-2xs text-[14px] tracking-[-0.02em] transition-all ${
          value === "right" ? activeClass : inactiveClass
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}
