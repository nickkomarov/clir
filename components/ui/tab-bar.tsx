// Figma component: TabBar
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6558
// Fixed bottom navigation with Home, New Spread (center action), History

"use client";

import { IconHome, IconNewSpread, IconHistory } from "./icons";

interface TabBarProps {
  activeTab?: "home" | "history";
  onTabChange?: (tab: "home" | "history") => void;
  onNewSpread?: () => void;
  className?: string;
}

export function TabBar({
  activeTab = "home",
  onTabChange,
  onNewSpread,
  className,
}: TabBarProps) {
  return (
    <nav
      className={`flex w-full items-center justify-between border-t border-neutral-100 bg-primary-white px-[56px] pb-2xs pt-sm ${className ?? ""}`}
    >
      {/* Home */}
      <button
        onClick={() => onTabChange?.("home")}
        className="flex flex-col items-start gap-4xs"
      >
        <IconHome className={`size-[42px] ${activeTab === "home" ? "text-primary-black" : "text-neutral-400"}`} />
        <span
          className={`min-w-full text-center text-caption-bold ${
            activeTab === "home" ? "text-primary-black" : "text-neutral-400"
          }`}
        >
          Home
        </span>
      </button>

      {/* New Spread (center action) */}
      <button
        onClick={onNewSpread}
        className="flex items-center justify-center rounded-pill bg-gradient-to-b from-[#FCB30A] to-[#FCA60A] px-sm py-2xs active:opacity-80"
      >
        <IconNewSpread className="size-[42px] text-primary-black" />
      </button>

      {/* History */}
      <button
        onClick={() => onTabChange?.("history")}
        className="flex flex-col items-start gap-4xs"
      >
        <IconHistory className={`size-[42px] ${activeTab === "history" ? "text-primary-black" : "text-neutral-400"}`} />
        <span
          className={`min-w-full text-center text-caption-bold ${
            activeTab === "history" ? "text-primary-black" : "text-neutral-400"
          }`}
        >
          History
        </span>
      </button>
    </nav>
  );
}
