"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import {
  IllustrationDaily,
  IllustrationFlex,
  IllustrationLogo,
  IllustrationCheckbox,
  IllustrationCheckboxLine,
} from "@/components/ui/illustrations";

const BASIC_FEATURES = ["Daily card", "Flex readings at standard price"];

const PRO_FEATURES = [
  "Daily card",
  "2 three-card readings per day",
  "50% off Flex readings",
  "Reading history",
  "Customizable decks",
];

export default function SubscriptionsScreen() {
  const [activeSheet, setActiveSheet] = useState<"daily" | "flex" | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  // Animate sheet in after mount
  useEffect(() => {
    if (activeSheet) {
      const tid = setTimeout(() => setSheetVisible(true), 10);
      return () => clearTimeout(tid);
    }
    setSheetVisible(false);
  }, [activeSheet]);

  const closeSheet = useCallback(() => {
    setSheetVisible(false);
    setTimeout(() => setActiveSheet(null), 300);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200">
      {/* Phone shell */}
      <div className="relative flex h-[874px] w-[402px] flex-col overflow-hidden rounded-[44px] border-2 border-neutral-200 bg-primary-black shadow-high">
        {/* ── Status Bar (dark) ── */}
        <div className="flex h-[62px] shrink-0 items-end justify-between px-lg pb-xs">
          <span className="text-caption-bold text-primary-white">9:41</span>
          <div className="flex items-center gap-3xs">
            {/* Signal */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="1" fill="#FFFFFF" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#FFFFFF" />
              <rect x="9" y="2" width="3" height="10" rx="1" fill="#FFFFFF" />
              <rect x="13" y="0" width="3" height="12" rx="1" fill="#FFFFFF" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="21"
                height="11"
                rx="2"
                stroke="#FFFFFF"
                strokeOpacity="0.35"
              />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="#FFFFFF" />
              <path
                d="M23 4.5V7.5C23.8 7.5 23.8 4.5 23 4.5Z"
                fill="#FFFFFF"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* ── Scrollable Content Area ── */}
        <div className="flex-1 overflow-y-auto rounded-t-3xl bg-bg-secondary">
          <div className="flex flex-col px-lg pb-lg">
            {/* ── Header Row ── */}
            <div className="flex items-center py-xs">
              <IconButton variant="close" />
              <span className="flex-1 text-center text-h3 text-primary-black">
                Get more from Clir Pro
              </span>
              <div className="size-[40px] shrink-0" />
            </div>

            {/* ── Stat Cards Row ── */}
            <div className="mt-md flex gap-sm">
              {/* Daily readings */}
              <div
                className="flex flex-1 cursor-pointer flex-col items-center gap-xs rounded-xl border border-neutral-100 bg-primary-white py-md active:opacity-80"
                onClick={() => setActiveSheet("daily")}
              >
                <div className="flex items-center gap-3xs">
                  <IllustrationDaily size="sm" />
                  <span className="text-h3 text-primary-black">0</span>
                </div>
                <span className="text-body-bold text-neutral-900">
                  Daily readings
                </span>
              </div>
              {/* Flex readings */}
              <div
                className="flex flex-1 cursor-pointer flex-col items-center gap-xs rounded-xl border border-neutral-100 bg-primary-white py-md active:opacity-80"
                onClick={() => setActiveSheet("flex")}
              >
                <div className="flex items-center gap-3xs">
                  <IllustrationFlex size="sm" />
                  <span className="text-h3 text-primary-black">0</span>
                </div>
                <span className="text-body-bold text-neutral-900">
                  Flex readings
                </span>
              </div>
            </div>

            {/* ── Current Plan Card ── */}
            <div className="mt-md rounded-xl bg-primary-white p-lg">
              <span className="text-body-bold text-primary-black">
                Current plan: Basic
              </span>
              <div className="mt-md flex flex-col gap-sm">
                {BASIC_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center gap-sm">
                    <IllustrationCheckboxLine size="sm" />
                    <span className="text-body text-neutral-500">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Recommended Pro Card ── */}
            <div className="mt-md overflow-hidden rounded-xl">
              {/* Amber banner */}
              <div
                className="px-lg pt-sm pb-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #FCA60A 0%, #FCB30A 40%, #FDE68A 100%)",
                }}
              >
                <Badge type="best-value">Recommended</Badge>
              </div>
              {/* White body */}
              <div className="-mt-md rounded-t-xl bg-primary-white p-lg">
                <div className="flex items-start justify-between gap-md">
                  <span className="flex-1 text-body-bold text-primary-black">
                    Unlock all features and member discounts with Clir Pro
                  </span>
                  <IllustrationLogo size="md" />
                </div>
                <div className="mt-md flex flex-col gap-sm">
                  {PRO_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center gap-sm">
                      <IllustrationCheckbox size="sm" />
                      <span className="text-body text-primary-black">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-lg">
                  <Button variant="primary">Upgrade to Clir Pro</Button>
                </div>
              </div>
            </div>

            {/* ── Get Flex Readings Card ── */}
            <div className="mt-md rounded-xl bg-primary-white p-lg">
              <div className="flex items-start justify-between gap-md">
                <div className="flex-1">
                  <span className="text-body-bold text-primary-black">
                    Get Flex readings
                  </span>
                  <p className="mt-xs text-body text-neutral-500">
                    Out of daily readings? Get Flex readings—available anytime,
                    never expire.
                  </p>
                </div>
                <IllustrationFlex size="md" />
              </div>
              <div className="mt-lg">
                <Button variant="secondary">Get Flex readings</Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Home Indicator ── */}
        <div className="flex h-[34px] shrink-0 items-end justify-center pb-2xs bg-bg-secondary">
          <div className="h-[5px] w-[134px] rounded-full bg-primary-black" />
        </div>

        {/* ── Bottom Sheet Overlay ── */}
        {activeSheet && (
          <div
            className={`absolute inset-0 z-30 transition-colors duration-300 ${sheetVisible ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"}`}
            onClick={closeSheet}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 rounded-t-3xl bg-primary-white p-xl transition-transform duration-300 ease-out ${sheetVisible ? "translate-y-0" : "translate-y-full"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="mx-auto mb-lg h-1 w-10 rounded-full bg-neutral-200" />

              {activeSheet === "daily" && (
                <>
                  <IllustrationDaily size="md" />
                  <p className="mt-sm text-h3 text-primary-black">
                    Daily readings
                  </p>
                  <p className="text-body text-neutral-500">
                    Your daily reading resets every day at midnight. It includes
                    one Daily Card — a single tarot card drawn for reflection —
                    plus any included three-card readings from your plan.
                  </p>
                  <div className="mt-lg">
                    <Button variant="primary" onClick={closeSheet}>
                      Upgrade to Clir Pro
                    </Button>
                  </div>
                </>
              )}

              {activeSheet === "flex" && (
                <>
                  <IllustrationFlex size="md" />
                  <p className="mt-sm text-h3 text-primary-black">
                    Flex readings
                  </p>
                  <p className="text-body text-neutral-500">
                    Flex readings are pay-as-you-go three-card readings you can
                    purchase anytime. They never expire and are available on all
                    plans — Pro members get 50% off.
                  </p>
                  <div className="mt-lg">
                    <Button variant="primary" onClick={closeSheet}>
                      Get Flex readings
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
