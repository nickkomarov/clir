// Figma component: Button/Primary, Button/Secondary, Button/Outlined, Button/Text
// Figma file: V0MgmJpx3GHKhMKId1aEaz — nodes 3928:6737, 3928:6740, 3928:6745, 3926:6106

import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined-dark"
  | "outlined-amber"
  | "text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const base =
  "flex h-[52px] w-full items-center justify-center rounded-xl px-lg py-sm transition-opacity active:opacity-80 disabled:opacity-40 disabled:text-neutral-400 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: `${base} bg-primary-amber text-body-bold text-primary-black`,
  secondary: `${base} bg-primary-black text-body-bold text-primary-white`,
  "outlined-dark": `${base} bg-primary-white border-[1.5px] border-primary-black text-body-bold text-primary-black`,
  "outlined-amber": `${base} bg-primary-white border-[1.5px] border-primary-amber text-body-bold text-primary-amber`,
  text: "text-body-semi text-primary-black active:opacity-60 disabled:opacity-40 disabled:pointer-events-none",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={`${variants[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
