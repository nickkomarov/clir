// Figma component: ButtonSmall/Primary, ButtonSmall/Secondary
// Figma file: V0MgmJpx3GHKhMKId1aEaz
// Compact CTA — 40px height, auto-width, optional leading icon

import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonSmallVariant = "primary" | "secondary";

interface ButtonSmallProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonSmallVariant;
  icon?: ReactNode;
}

const base =
  "inline-flex h-[40px] items-center justify-center rounded-lg px-sm text-caption-bold transition-opacity active:opacity-80 disabled:opacity-40 disabled:text-neutral-400 disabled:pointer-events-none";

const variants: Record<ButtonSmallVariant, string> = {
  primary: `${base} bg-primary-amber text-primary-black`,
  secondary: `${base} bg-primary-black text-primary-white`,
};

export function ButtonSmall({
  children,
  variant = "primary",
  icon,
  className,
  ...props
}: ButtonSmallProps) {
  return (
    <button className={`${variants[variant]} ${icon ? "gap-2xs" : ""} ${className ?? ""}`} {...props}>
      {icon}
      {children}
    </button>
  );
}
