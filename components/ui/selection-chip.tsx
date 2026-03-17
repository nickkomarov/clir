// Figma component: SelectionChip
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6755
// Variants: State=Default, State=Selected

"use client";

import type { ReactNode } from "react";

interface SelectionChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SelectionChip({
  children,
  selected = false,
  onClick,
  className,
}: SelectionChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl px-md py-xs text-[14px] font-bold tracking-[-0.02em] transition-colors ${
        selected
          ? "bg-primary-black text-primary-white"
          : "border border-neutral-100 bg-primary-white text-primary-black"
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
