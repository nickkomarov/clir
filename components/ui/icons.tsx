// Figma component: Icons
// Figma file: V0MgmJpx3GHKhMKId1aEaz — section 3929:7142
// All icons use a 42x42 container. SVG paths exported directly from Figma.
// Icons: NewSpread, Home, History, Credits, Profile, ChevronLeft, ChevronRight, Close, BackCircle

interface IconProps {
  className?: string;
}

/** 8-pointed star burst — node 3929:7143 */
export function IconNewSpread({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="translate(5.37 5.37)"
        d="M14.6521 0.813625C14.8578 -0.271205 16.4112 -0.27121 16.617 0.81362L17.9524 7.85314C18.0867 8.56082 18.9025 8.89875 19.4978 8.49327L25.4198 4.45985C26.3324 3.83828 27.4308 4.93667 26.8092 5.84928L22.7758 11.7712C22.3703 12.3666 22.7082 13.1824 23.4159 13.3167L30.4554 14.6521C31.5403 14.8578 31.5403 16.4112 30.4555 16.617L23.4159 17.9524C22.7082 18.0867 22.3703 18.9025 22.7758 19.4978L26.8092 25.4198C27.4308 26.3324 26.3324 27.4308 25.4198 26.8092L19.4978 22.7758C18.9025 22.3703 18.0867 22.7082 17.9524 23.4159L16.617 30.4554C16.4112 31.5403 14.8578 31.5403 14.6521 30.4555L13.3167 23.4159C13.1824 22.7082 12.3666 22.3703 11.7712 22.7758L5.84929 26.8092C4.93668 27.4308 3.83828 26.3324 4.45985 25.4198L8.49326 19.4978C8.89875 18.9025 8.56082 18.0867 7.85314 17.9524L0.813625 16.617C-0.271205 16.4112 -0.27121 14.8578 0.81362 14.6521L7.85314 13.3167C8.56082 13.1824 8.89875 12.3666 8.49327 11.7712L4.45985 5.84929C3.83828 4.93668 4.93667 3.83828 5.84928 4.45985L11.7712 8.49326C12.3666 8.89875 13.1824 8.56082 13.3167 7.85314L14.6521 0.813625Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** House / journal icon — node 3929:7145
 *  Composed of a rounded rectangle + a subtract path */
export function IconHome({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main rounded rect: positioned at (8, 5) size ~18x26 with 4px radius */}
      <rect x="8" y="5" width="18" height="26" rx="4" fill="currentColor" />
      {/* Subtract overlay path positioned at (16.83, 10.89) */}
      <path
        transform="translate(16.83 10.89)"
        d="M16.2637 1.10547C18.3975 1.67723 19.6645 3.87105 19.0928 6.00488L14.5713 22.876C13.9995 25.0098 11.8066 26.2767 9.67285 25.7051L0.0136719 23.1172C0.009222 23.116 0.00444233 23.1145 0 23.1133H5.13867C9.00466 23.1133 12.1387 19.9793 12.1387 16.1133V0L16.2637 1.10547Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Bookmark / pennant flag — node 3929:7148 */
export function IconHistory({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="translate(11 8)"
        d="M0.827298 1.45583C0.856508 0.643527 1.528 0 2.34639 0H17.6536C18.472 0 19.1435 0.643528 19.1727 1.45583L19.9989 24.433C20.0478 25.7918 18.405 26.5172 17.4219 25.5709L11.0579 19.4447C10.4684 18.8772 9.53162 18.8772 8.94208 19.4447L2.57808 25.5709C1.59505 26.5172 -0.0477957 25.7918 0.00106564 24.433L0.827298 1.45583Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Crown shape — node 3929:7150 */
export function IconCredits({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="translate(8.29 8.69)"
        d="M0.00397142 7.49904C-0.0802966 6.49836 1.19791 6.01175 1.80044 6.81513L5.20626 11.3562C5.66052 11.9619 6.59696 11.8627 6.91422 11.1753L11.8039 0.580941C12.1614 -0.193648 13.2623 -0.193647 13.6198 0.580942L18.5095 11.1753C18.8268 11.8627 19.7632 11.9619 20.2175 11.3562L23.6233 6.81512C24.2258 6.01174 25.504 6.49836 25.4198 7.49904L24.2871 20.9494C24.1127 23.021 22.3802 24.6137 20.3012 24.6137H5.12252C3.0435 24.6137 1.31109 23.021 1.13663 20.9494L0.00397142 7.49904Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Person silhouette — node 3929:7152 */
export function IconProfile({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head ellipse */}
      <ellipse cx="21" cy="14" rx="6" ry="7" fill="currentColor" />
      {/* Body path */}
      <path
        transform="translate(7.63 23)"
        d="M13.3701 0C19.0415 0 23.9881 4.04851 26.6227 10.0573C27.0339 10.9952 26.3121 12 25.288 12H1.45215C0.428039 12 -0.29375 10.9952 0.117481 10.0573C2.75205 4.04851 7.6986 0 13.3701 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Left chevron — node 3929:7155
 *  Two rounded-pill paths rotated ±45° */
export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top arm: rotated -45° around its center */}
      <g transform="translate(13.14 10.25) translate(6.932 6.932) rotate(-45) translate(-7.08 -2.554)">
        <path
          d="M0 2.55426C0 1.53338 0.792906 0.688018 1.8117 0.622711L11.4427 0.00533847C12.9146 -0.0890131 14.1603 1.07936 14.1603 2.55426C14.1603 4.02917 12.9146 5.19754 11.4427 5.10319L1.8117 4.48581C0.792905 4.42051 0 3.57515 0 2.55426Z"
          fill="currentColor"
        />
      </g>
      {/* Bottom arm: rotated 45° around its center */}
      <g transform="translate(13.14 17.88) translate(6.932 6.932) rotate(45) translate(-7.08 -2.554)">
        <path
          d="M0 2.55426C0 1.53338 0.792906 0.688018 1.8117 0.622711L11.4427 0.00533847C12.9146 -0.0890131 14.1603 1.07936 14.1603 2.55426C14.1603 4.02917 12.9146 5.19754 11.4427 5.10319L1.8117 4.48581C0.792905 4.42051 0 3.57515 0 2.55426Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/** Right chevron — node 3929:7158
 *  Mirrored version of ChevronLeft */
export function IconChevronRight({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(21 21) scale(-1 1) translate(-21 -21)">
        {/* Reuse ChevronLeft geometry, flipped horizontally */}
        <g transform="translate(13.14 10.25) translate(6.932 6.932) rotate(-45) translate(-7.08 -2.554)">
          <path
            d="M0 2.55426C0 1.53338 0.792906 0.688018 1.8117 0.622711L11.4427 0.00533847C12.9146 -0.0890131 14.1603 1.07936 14.1603 2.55426C14.1603 4.02917 12.9146 5.19754 11.4427 5.10319L1.8117 4.48581C0.792905 4.42051 0 3.57515 0 2.55426Z"
            fill="currentColor"
          />
        </g>
        <g transform="translate(13.14 17.88) translate(6.932 6.932) rotate(45) translate(-7.08 -2.554)">
          <path
            d="M0 2.55426C0 1.53338 0.792906 0.688018 1.8117 0.622711L11.4427 0.00533847C12.9146 -0.0890131 14.1603 1.07936 14.1603 2.55426C14.1603 4.02917 12.9146 5.19754 11.4427 5.10319L1.8117 4.48581C0.792905 4.42051 0 3.57515 0 2.55426Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}

/** X / cross mark — node 3929:7161
 *  Plus shape rotated 45° */
export function IconClose({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(21 21) rotate(45) translate(-12 -12)">
        <path
          d="M12 0C13.4651 1.9212e-07 14.6258 1.23718 14.5322 2.69922L14.0684 9.93164L21.3008 9.46875C22.7626 9.37522 23.9997 10.5352 24 12C24 13.465 22.7628 14.6258 21.3008 14.5322L14.0674 14.0674L14.5313 21.3008C14.6248 22.7627 13.4648 23.9997 12 24C10.5349 24 9.37417 22.7628 9.46777 21.3008L9.93066 14.0664L2.69922 14.5312C1.23738 14.6248 0.000262059 13.4648 0 12C-1.28076e-07 10.535 1.23723 9.37424 2.69922 9.46777L9.93164 9.93066L9.46875 2.69922C9.37515 1.23734 10.5352 0.000273687 12 0Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/** Filled circle with left arrow — node 3929:7167 */
export function IconBackCircle({ className }: IconProps) {
  return (
    <svg className={className ?? "size-[42px]"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        transform="translate(7 7)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM14.0605 7.93945C13.4748 7.35367 12.5252 7.35367 11.9395 7.93945L7.00977 12.8682C6.38492 13.493 6.38493 14.507 7.00977 15.1318L11.9395 20.0605C12.5252 20.6463 13.4748 20.6463 14.0605 20.0605C14.6463 19.4748 14.6463 18.5252 14.0605 17.9395L11.6514 15.5303L19.502 15.9053C20.5896 15.9571 21.5 15.0888 21.5 14C21.5 12.9112 20.5896 12.0429 19.502 12.0947L11.6514 12.4688L14.0605 10.0605C14.6463 9.47476 14.6463 8.52524 14.0605 7.93945Z"
        fill="currentColor"
      />
    </svg>
  );
}
