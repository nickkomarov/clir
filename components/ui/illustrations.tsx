// Figma component: Illustrations
// Figma file: V0MgmJpx3GHKhMKId1aEaz — section 3970:9777
// Multicolor illustrations: Logo, Daily, Flex, Checkbox, CheckboxLine
// Colors: primary-black (#1A1A1A), amber gradient (#FCB30A → #FCA60A), white

import { useId } from "react";

type IllustrationSize = "lg" | "md" | "sm";

interface IllustrationProps {
  size?: IllustrationSize;
  className?: string;
}

const SIZES: Record<IllustrationSize, number> = {
  lg: 110,
  md: 42,
  sm: 24,
};

/** Star burst with amber swoosh — node 3970:9814 */
export function IllustrationLogo({ size = "md", className }: IllustrationProps) {
  const px = SIZES[size];
  const id = useId();
  const gradId = `logo-grad-${id}`;
  return (
    <svg className={className} width={px} height={px} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.7175 110C16.758 110 11.3873 105.972 9.11824 99.8004L7.91263 96.5213C4.07274 86.0773 11.8023 75 22.9298 75L51.8243 75L51.4007 99.8004C53.6698 105.972 59.0405 110 65 110L22.7175 110Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M55 0L63.419 34.6746L93.8909 16.1091L75.3254 46.581L110 55L75.3254 63.419L92.9762 92.9762L63.419 75.3254L55 110L46.581 75.3254L16.1091 93.8909L34.6746 63.419L0 55L34.6746 46.581L16.1091 16.1091L46.581 34.6746L55 0Z"
        fill="#1A1A1A"
      />
      <path
        d="M94.3124 90.9173C89.184 102.659 79.1377 110 68.1965 110L25 110C34.3147 108.428 42.7087 101.184 47.1929 90.9173L57.6414 66.9949C60.8237 59.7091 68.0191 55 75.9695 55L110 55L94.3124 90.9173Z"
        fill="white"
      />
      <defs>
        <linearGradient id={gradId} x1="65" y1="92.5" x2="0" y2="92.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCB30A" />
          <stop offset="1" stopColor="#FCA60A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Circular arrow with amber swoosh — node 3970:9812 */
export function IllustrationDaily({ size = "md", className }: IllustrationProps) {
  const px = SIZES[size];
  const id = useId();
  const gradId = `daily-grad-${id}`;
  return (
    <svg className={className} width={px} height={px} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.90591 33.7139C7.8366 38.197 11.6187 41 15.7378 41L32 41C28.4933 40.3997 25.3332 37.6339 23.645 33.7139L19.7115 24.5799C18.5134 21.798 15.8046 20 12.8115 20L0 20L5.90591 33.7139Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M20.8911 4.10658C25.3011 4.10658 29.2525 6.08674 31.8975 9.19489L27.0067 13.3562C25.5296 11.6205 23.3398 10.5273 20.8911 10.5273C16.4585 10.5273 12.8652 14.1206 12.8652 18.5532C12.8652 22.9858 16.4585 26.5792 20.8911 26.5792L26.7768 26.5792L26.7768 32.9999L20.8911 32.9999C12.9124 32.9999 6.44442 26.5319 6.44442 18.5532C6.44442 10.5746 12.9124 4.10658 20.8911 4.10658Z"
        fill="#1A1A1A"
      />
      <path
        d="M32.9373 41C35.1835 41 37.2079 39.5038 38.0631 37.2116L41.5 25L31.5018 24.9999C27.8655 24.9998 24.6865 27.4523 23.7637 30.9696L22.1259 37.2116C21.2706 39.5038 19.2463 41 17 41L32.9373 41Z"
        fill="white"
      />
      <path
        d="M39.6625 23.5742L20.8357 16.9671L35.971 3.96618L39.6625 23.5742Z"
        fill="#1A1A1A"
      />
      <defs>
        <linearGradient id={gradId} x1="1.47899" y1="20" x2="18.4701" y2="36.2604" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCB30A" />
          <stop offset="1" stopColor="#FCA60A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Amber circle with checkmark — node 3813:4517 */
export function IllustrationCheckbox({ size = "md", className }: IllustrationProps) {
  const px = SIZES[size];
  const id = useId();
  const gradId = `checkbox-grad-${id}`;
  return (
    <svg className={className} width={px} height={px} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="9" fill={`url(#${gradId})`} />
      <path
        d="M8.25 11.3333L11.0326 14L16.25 9"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradId} x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCB30A" />
          <stop offset="1" stopColor="#FCA60A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Amber checkmark line — node 3813:4503 */
export function IllustrationCheckboxLine({ size = "md", className }: IllustrationProps) {
  const px = SIZES[size];
  const id = useId();
  const gradId = `checkbox-line-grad-${id}`;
  return (
    <svg className={className} width={px} height={px} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.25 11.3333L11.0326 14L16.25 9"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradId} x1="12.25" y1="9" x2="12.25" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCB30A" />
          <stop offset="1" stopColor="#FCA60A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** 8-pointed star with amber swoosh — node 3970:9813 */
export function IllustrationFlex({ size = "md", className }: IllustrationProps) {
  const px = SIZES[size];
  const id = useId();
  const gradId = `flex-grad-${id}`;
  return (
    <svg className={className} width={px} height={px} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33.2625 41C35.5546 41 37.6203 39.5038 38.493 37.2116C40.186 32.7648 36.9016 28 32.1434 28L22.0676 28L22.2305 37.2116C21.3578 39.5038 19.2921 41 17 41L33.2625 41Z"
        fill="white"
      />
      <path
        d="M21 1L25.1649 15.8351L42 20L25.1649 24.1649L21 39L16.8351 24.1649L0 20L16.8351 15.8351L21 1Z"
        fill="#1A1A1A"
      />
      <path
        d="M5.90591 33.7139C7.8366 38.197 11.6187 41 15.7378 41L32 41C28.4933 40.3997 25.3332 37.6339 23.645 33.7139L19.7115 24.5799C18.5134 21.798 15.8046 20 12.8115 20L0 20L5.90591 33.7139Z"
        fill={`url(#${gradId})`}
      />
      <defs>
        <linearGradient id={gradId} x1="1.47899" y1="20" x2="18.4701" y2="36.2604" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCB30A" />
          <stop offset="1" stopColor="#FCA60A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
