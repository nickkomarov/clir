// Figma component: Button/Social
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6750
// Variants: Provider=Apple, Provider=Google

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonSocialProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function ButtonSocial({
  children,
  icon,
  className,
  ...props
}: ButtonSocialProps) {
  return (
    <button
      className={`flex h-[52px] w-full items-center justify-center gap-2xs rounded-xl border border-neutral-100 bg-primary-white px-lg py-sm text-body-semi text-primary-black transition-opacity active:opacity-80 disabled:opacity-40 disabled:pointer-events-none ${className ?? ""}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

/* Inline Apple logo SVG */
export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-[20px] w-[17px]"}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.94 10.59c-.02-2.07 1.69-3.07 1.77-3.12-0.96-1.41-2.46-1.6-3-1.63-1.27-.13-2.49.75-3.14.75-.65 0-1.65-.73-2.72-.71-1.4.02-2.69.81-3.41 2.07-1.46 2.52-.37 6.27 1.05 8.32.69 1 1.52 2.13 2.61 2.09 1.05-.04 1.44-.68 2.71-.68 1.27 0 1.62.68 2.72.66 1.13-.02 1.84-.99 2.53-2.02.79-1.17 1.12-2.3 1.14-2.36-.02-.01-2.19-.84-2.21-3.34l-.05-.03zM11.87 4.15c.57-.7.96-1.66.86-2.63-.83.03-1.83.55-2.43 1.25-.53.62-1 1.61-.87 2.56.93.07 1.87-.47 2.44-1.18z"
        fill="#1A1A1A"
      />
    </svg>
  );
}

/* Inline Google logo SVG */
export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-[20px] w-[20px]"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.17 8.37H10v3.41h4.59c-.39 2.08-2.15 3.05-4.54 3.05a5 5 0 0 1-4.96-5.04 5.02 5.02 0 0 1 4.96-5.04c1.23 0 2.34.44 3.22 1.17l2.54-2.55A8.58 8.58 0 0 0 10.05.83 9.09 9.09 0 0 0 .83 9.79a9.09 9.09 0 0 0 9.22 8.96c4.74 0 8.46-3.33 8.46-8.52 0-.65-.08-1.14-.18-1.56l-.16-.3z"
        fill="#4285F4"
      />
      <path
        d="M2.57 5.95l2.93 2.15A5.02 5.02 0 0 1 10.05 4.75c1.23 0 2.34.44 3.22 1.17l2.54-2.55A8.58 8.58 0 0 0 10.05.83 9.06 9.06 0 0 0 2.57 5.95z"
        fill="#EA4335"
      />
      <path
        d="M10.05 18.75a8.5 8.5 0 0 0 5.67-2.08l-2.76-2.14a5.31 5.31 0 0 1-2.91.87c-2.37 0-4.12-.97-4.55-3.05l-2.91 2.24a9.08 9.08 0 0 0 7.46 4.16z"
        fill="#34A853"
      />
      <path
        d="M18.33 8.67H18.17l.16.3-.16-.3H10v3.41h4.59a4.67 4.67 0 0 1-1.54 2.45l2.76 2.14c1.96-1.82 3.19-4.52 3.19-7.7 0-.65-.08-1.14-.18-1.56l-.49.26.49-.26z"
        fill="#FBBC05"
      />
    </svg>
  );
}
