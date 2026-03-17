// Figma component: IconButton
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6760
// Variants: Type=Back, Type=Close

import type { ButtonHTMLAttributes } from "react";
import { IconChevronLeft, IconClose } from "./icons";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "back" | "close";
}

export function IconButton({
  variant = "back",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`flex size-[40px] items-center justify-center rounded-icon border-[1.5px] border-neutral-100 bg-primary-white transition-opacity active:opacity-70 ${className ?? ""}`}
      {...props}
    >
      {variant === "back" ? (
        <IconChevronLeft className="size-[24px] text-primary-black" />
      ) : (
        <IconClose className="size-[24px] text-primary-black" />
      )}
    </button>
  );
}
