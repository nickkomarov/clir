// Figma component: TopNavBar
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6571
// Structure: BackButton + Title + CloseButton

import type { ReactNode } from "react";
import { IconChevronLeft, IconClose } from "./icons";

interface TopNavBarProps {
  title?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

export function TopNavBar({
  title = "Page Title",
  onBack,
  onClose,
  className,
}: TopNavBarProps) {
  return (
    <div
      className={`flex h-[56px] w-full items-center justify-between bg-primary-white px-md py-xs ${className ?? ""}`}
    >
      <button
        onClick={onBack}
        className="flex size-[42px] items-center justify-center active:opacity-60"
      >
        <IconChevronLeft className="size-[42px] text-primary-black" />
      </button>
      <span className="text-h3 text-primary-black">{title}</span>
      <button
        onClick={onClose}
        className="flex size-[42px] items-center justify-center active:opacity-60"
      >
        <IconClose className="size-[42px] text-primary-black" />
      </button>
    </div>
  );
}
