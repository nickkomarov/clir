// Figma component: Badge
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6705
// Variants: Type=Recommended, Type=BestValue, Type=Category

import type { ReactNode } from "react";

type BadgeType = "recommended" | "best-value" | "category";

interface BadgeProps {
  children: ReactNode;
  type?: BadgeType;
  className?: string;
}

const typeStyles: Record<BadgeType, string> = {
  recommended: "bg-primary-amber text-primary-black",
  "best-value": "bg-primary-amber text-primary-white",
  category: "bg-neutral-50 text-neutral-500",
};

export function Badge({
  children,
  type = "category",
  className,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-xs py-3xs text-caption-bold ${typeStyles[type]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
