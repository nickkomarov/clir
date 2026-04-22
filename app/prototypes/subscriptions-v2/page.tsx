"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { TabBar } from "@/components/ui/tab-bar";
import { IconButton } from "@/components/ui/icon-button";
import { Radio } from "@/components/ui/radio";
import {
  IllustrationDaily,
  IllustrationFlex,
  IllustrationLogo,
  IllustrationCheckbox,
} from "@/components/ui/illustrations";
import { IconProfile, IconChevronRight } from "@/components/ui/icons";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import dailyCardAnim from "@/public/lotties/daily-card.json";
import threeCardsOrbitAnim from "@/public/lotties/three-cards-orbit.json";
import themeAnim from "@/public/lotties/theme.json";

// ── Types ──
type Screen = "home" | "sub-empty" | "flex-empty" | "sub-active" | "flex-active";

// ── Questions for carousel ──
const QUESTIONS = [
  "Should I pursue a new career opportunity?",
  "What does my love life look like this month?",
  "How can I find more balance in my daily routine?",
];

const CAROUSEL_STYLES = `
@keyframes slideInRight  { from { transform: translateX(60%);  opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes slideOutLeft  { from { transform: translateX(0);    opacity: 1 } to { transform: translateX(-60%); opacity: 0 } }
@keyframes slideInLeft   { from { transform: translateX(-60%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes slideOutRight { from { transform: translateX(0);    opacity: 1 } to { transform: translateX(60%); opacity: 0 } }
`;

// ── Info icon ──
function InfoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="#737C7C" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="#737C7C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="#737C7C" />
    </svg>
  );
}

// ── Amber gradient button ──
function AmberButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[52px] w-full items-center justify-center rounded-xl text-body-bold text-primary-black transition-opacity active:opacity-80 ${className}`}
      style={{ background: "linear-gradient(to bottom, #FCB30A, #FCA60A)", boxShadow: "0px 24px 48px rgba(0,0,0,0.08)" }}
    >
      {children}
    </button>
  );
}

// ── Black button ──
function BlackButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-[52px] w-full items-center justify-center rounded-xl bg-primary-black text-body-bold text-primary-white transition-opacity active:opacity-80"
      style={{ boxShadow: "0px 24px 48px rgba(0,0,0,0.08)" }}
    >
      {children}
    </button>
  );
}

// ── Status Bar ──
function StatusBar({ light = false }: { light?: boolean }) {
  const fg = light ? "#1A1A1A" : "#FFFFFF";
  return (
    <div className={`flex h-[62px] shrink-0 items-end justify-between px-lg pb-xs ${light ? "bg-bg-secondary" : "bg-primary-black"}`}>
      <span className="text-caption-bold" style={{ color: fg }}>9:41</span>
      <div className="flex items-center gap-3xs">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill={fg} />
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill={fg} />
          <rect x="9" y="2" width="3" height="10" rx="1" fill={fg} />
          <rect x="13" y="0" width="3" height="12" rx="1" fill={fg} />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke={fg} strokeOpacity="0.35" />
          <rect x="2" y="2" width="18" height="8" rx="1" fill={fg} />
          <path d="M23 4.5V7.5C23.8 7.5 23.8 4.5 23 4.5Z" fill={fg} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ── Home Indicator ──
function HomeIndicator({ bg = "bg-bg-secondary" }: { bg?: string }) {
  return (
    <div className={`flex h-[34px] shrink-0 items-end justify-center pb-2xs ${bg}`}>
      <div className="h-[5px] w-[134px] rounded-full bg-primary-black" />
    </div>
  );
}

// ── Plan Option Card ──
function PlanCard({
  selected,
  onSelect,
  label,
  bestValue,
  rightContent,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  bestValue?: boolean;
  rightContent: React.ReactNode;
}) {
  if (bestValue) {
    return (
      <div className="overflow-hidden rounded-xl cursor-pointer" onClick={onSelect}>
        <div
          className="px-md py-2xs"
          style={{ background: "linear-gradient(135deg, #FCB30A 0%, #FCB30A 50%, #FDE68A 100%)" }}
        >
          <span className="text-caption-bold text-primary-black">Best value</span>
        </div>
        <div className="flex items-center justify-between rounded-b-xl border border-neutral-100 bg-primary-white p-sm">
          <div className="flex items-center gap-sm">
            <Radio selected={selected} onChange={onSelect} />
            <span className="text-body-bold text-primary-black">{label}</span>
          </div>
          <div className="text-right">{rightContent}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-xl border border-neutral-100 bg-primary-white p-sm"
      onClick={onSelect}
    >
      <div className="flex items-center gap-sm">
        <Radio selected={selected} onChange={onSelect} />
        <span className="text-body-bold text-primary-black">{label}</span>
      </div>
      <div className="text-right">{rightContent}</div>
    </div>
  );
}

// ── Bottom Sheet ──
function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      const tid = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(tid);
    }
    setVisible(false);
  }, [open]);

  if (!open) return null;
  return (
    <div
      className={`absolute inset-0 z-30 transition-colors duration-300 ${visible ? "bg-black/30" : "bg-transparent"}`}
      onClick={onClose}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 rounded-t-xl bg-primary-white px-xl pt-md pb-xl z-40 transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-lg h-1 w-10 rounded-full bg-neutral-200" />
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════
// ── Main Component ──
// ══════════════════════════════
export default function SubscriptionsV2() {
  // ── Screen state ──
  const [screen, setScreen] = useState<Screen>("home");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [hasFlexReadings, setHasFlexReadings] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [selectedFlexPack, setSelectedFlexPack] = useState<15 | 10 | 5>(15);
  const [subSheetOpen, setSubSheetOpen] = useState(false);
  const [flexSheetOpen, setFlexSheetOpen] = useState(false);

  const navigate = (to: Screen) => {
    setPrevScreen(screen);
    setScreen(to);
  };

  // ── Home: carousel + lottie state ──
  const [activeQ, setActiveQ] = useState(0);
  const prevQ = useRef(0);
  const direction = useRef<"fwd" | "bwd">("fwd");
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const swipeStartX = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const cards = [card1Ref.current, card2Ref.current].filter(Boolean) as HTMLDivElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            observer.unobserve(el);
          }
        });
      },
      { root, threshold: 0.15 },
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [screen]);

  const goTo = useCallback(
    (next: number, dir: "fwd" | "bwd") => {
      if (next === activeQ) return;
      direction.current = dir;
      prevQ.current = activeQ;
      setActiveQ(next);
    },
    [activeQ],
  );

  useEffect(() => {
    const prev = prevQ.current;
    const curr = activeQ;
    if (prev === curr) return;
    const dir = direction.current;
    const outEl = textRefs.current[prev];
    const inEl = textRefs.current[curr];
    if (outEl) {
      outEl.style.animation = "none";
      void outEl.offsetWidth;
      outEl.style.animation =
        dir === "fwd"
          ? "slideOutLeft 300ms cubic-bezier(0.55,0,1,0.45) both"
          : "slideOutRight 300ms cubic-bezier(0.55,0,1,0.45) both";
    }
    if (inEl) {
      inEl.style.animation = "none";
      void inEl.offsetWidth;
      inEl.style.animation =
        dir === "fwd"
          ? "slideInRight 380ms cubic-bezier(0.25,0.46,0.45,0.94) both"
          : "slideInLeft 380ms cubic-bezier(0.25,0.46,0.45,0.94) both";
    }
    const tid = setTimeout(() => {
      if (outEl) { outEl.style.animation = ""; outEl.style.opacity = "0"; outEl.style.transform = "translateX(100%)"; }
      if (inEl) { inEl.style.animation = ""; inEl.style.opacity = "1"; inEl.style.transform = "translateX(0)"; }
    }, 380);
    return () => clearTimeout(tid);
  }, [activeQ]);

  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActiveQ((p) => {
        const next = (p + 1) % QUESTIONS.length;
        direction.current = "fwd";
        prevQ.current = p;
        return next;
      });
    }, 2500);
  }, []);

  const pauseAuto = useCallback(() => {
    if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; }
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAuto, 5000);
  }, [startAuto]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [startAuto]);

  const onSwipeStart = useCallback((x: number) => { swipeStartX.current = x; }, []);
  const onSwipeEnd = useCallback(
    (x: number) => {
      const dx = x - swipeStartX.current;
      if (Math.abs(dx) < 40) return;
      pauseAuto();
      if (dx < 0) goTo((activeQ + 1) % QUESTIONS.length, "fwd");
      else goTo((activeQ - 1 + QUESTIONS.length) % QUESTIONS.length, "bwd");
    },
    [activeQ, goTo, pauseAuto],
  );

  // ── Screen: Home ──
  const subCount = hasSubscription ? 2 : 0;
  const flexCount = hasFlexReadings ? 6 : 0;

  const renderHome = () => (
    <>
      <StatusBar light />
      {/* Top Action Bar */}
      <div
        className="absolute inset-x-0 top-[62px] z-20"
        style={{ background: "linear-gradient(to bottom, #F2F3F3 0%, #F2F3F3 70%, transparent 100%)" }}
      >
        <div className="flex items-center justify-between px-sm py-xs">
          {/* Profile */}
          <button className="flex items-center justify-center rounded-full bg-bg-secondary p-xs shadow-high active:opacity-80">
            <IconProfile className="size-[24px] text-primary-black" />
          </button>
          {/* Two pills */}
          <div className="flex items-center gap-xs">
            {/* Sub pill */}
            <button
              className="flex items-center gap-3xs rounded-full border border-neutral-100 bg-primary-white px-sm py-xs shadow-high active:opacity-80"
              onClick={() => navigate(hasSubscription ? "sub-active" : "sub-empty")}
            >
              <IllustrationDaily size="sm" />
              <span
                className="text-body-bold"
                style={{ color: subCount > 0 ? "#FCA60A" : "#737C7C" }}
              >
                {subCount}
              </span>
            </button>
            {/* Flex pill */}
            <button
              className="flex items-center gap-3xs rounded-full border border-neutral-100 bg-primary-white px-sm py-xs shadow-high active:opacity-80"
              onClick={() => navigate(hasFlexReadings ? "flex-active" : "flex-empty")}
            >
              <IllustrationFlex size="sm" />
              <span
                className="text-body-bold"
                style={{ color: flexCount > 0 ? "#FCA60A" : "#737C7C" }}
              >
                {flexCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-bg-secondary">
        <div className="flex flex-col gap-md px-lg pb-lg pt-[74px]">
          <div className="text-center">
            <p className="text-body-bold text-primary-black">Get clarity this morning</p>
          </div>

          {/* Card 1 */}
          <div
            ref={card1Ref}
            className="flex h-[521px] flex-col items-center gap-md overflow-hidden rounded-xl border border-neutral-100 p-xl shadow-high"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF, var(--color-bg-secondary))",
              opacity: 0,
              transform: "translateY(18px) scale(0.97)",
              transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.34, 1.1, 0.64, 1)",
            }}
          >
            <span className="text-body-semi text-primary-black">Today&apos;s Card</span>
            <h3 className="text-h3 text-primary-black text-center">Find clarity for your day</h3>
            <span className="text-body-semi text-neutral-500">Tuesday, Nov 11</span>
            <div className="flex flex-1 items-center justify-center">
              <Lottie animationData={dailyCardAnim} loop autoplay style={{ width: 110, height: 110 }} />
            </div>
            <button
              className="flex h-[52px] w-full items-center justify-center rounded-xl text-body-bold text-primary-black transition-opacity active:opacity-80"
              style={{ background: "linear-gradient(to bottom, #FCB30A, #FCA60A)" }}
            >
              Reveal
            </button>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className="flex h-[521px] flex-col items-center overflow-hidden rounded-xl border border-neutral-100 p-xl shadow-high"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF, var(--color-bg-secondary))",
              opacity: 0,
              transform: "translateY(18px) scale(0.97)",
              transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.34, 1.1, 0.64, 1)",
            }}
          >
            <span className="text-body-semi text-primary-black">Three Cards</span>
            <div className="flex w-full flex-1 flex-col items-center justify-between gap-md overflow-hidden py-md">
              <div className="flex flex-1 items-center justify-center">
                <Lottie animationData={threeCardsOrbitAnim} loop autoplay style={{ height: 110, width: "auto" }} />
              </div>
              <div className="w-full">
                <span className="block text-center text-body-lg text-neutral-500">Pick a popular question</span>
                <div
                  className="mt-xs flex w-full select-none items-center gap-sm rounded-xl bg-amber-100 p-sm"
                  onMouseDown={(e) => { e.preventDefault(); onSwipeStart(e.clientX); }}
                  onMouseUp={(e) => onSwipeEnd(e.clientX)}
                  onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
                  onTouchEnd={(e) => onSwipeEnd(e.changedTouches[0].clientX)}
                  style={{ touchAction: "pan-y", WebkitUserSelect: "none", userSelect: "none" }}
                >
                  <div className="relative flex-1 min-w-0 overflow-hidden" style={{ minHeight: 52 }}>
                    {QUESTIONS.map((q, i) => (
                      <span
                        key={i}
                        ref={(el) => { textRefs.current[i] = el; }}
                        draggable={false}
                        className="absolute inset-0 text-h3 text-primary-black leading-snug line-clamp-3"
                        style={{
                          opacity: i === 0 ? 1 : 0,
                          transform: i === 0 ? "translateX(0)" : "translateX(100%)",
                          transition: "none",
                        }}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-primary-white shadow-low cursor-pointer"
                    onClick={() => { pauseAuto(); goTo((activeQ + 1) % QUESTIONS.length, "fwd"); }}
                  >
                    <IconChevronRight className="size-[20px] text-primary-black" />
                  </div>
                </div>
                <p className="mt-sm text-center text-body-lg text-neutral-500">or</p>
              </div>
            </div>
            <button
              className="flex h-[52px] w-full items-center justify-center rounded-xl text-body-bold text-primary-black transition-opacity active:opacity-80"
              style={{ background: "linear-gradient(to bottom, #FCB30A, #FCA60A)" }}
            >
              Ask your own
            </button>
          </div>

          {/* Deck picker */}
          <div className="rounded-xl bg-primary-white px-sm">
            <div className="flex items-center gap-md py-[17.5px]">
              <span className="flex-1 text-body-semi text-primary-black">Choose a deck that fits your mood and style</span>
              <div className="size-[42px] shrink-0">
                <Lottie animationData={themeAnim} loop autoplay style={{ width: 42, height: 42 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <TabBar activeTab="home" />
        <HomeIndicator bg="bg-primary-white" />
      </div>
    </>
  );

  // ── Screen: Sub Empty (paywall) ──
  const renderSubEmpty = () => (
    <>
      <StatusBar />
      <div className="flex-1 overflow-y-auto rounded-t-xl bg-bg-secondary">
        {/* Hero image */}
        <div className="relative w-full" style={{ height: 220 }}>
          <img src="/no_sub.png" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          {/* Close button over image */}
          <div className="absolute left-lg top-xs">
            <IconButton variant="close" onClick={() => navigate(prevScreen)} />
          </div>
        </div>

        <div className="flex flex-col px-lg pb-[100px]">
          {/* Headline */}
          <div className="flex flex-col items-center gap-sm text-center mt-md">
            <h2 className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>
              Get access to free daily readings and more
            </h2>
          </div>

          {/* Feature list */}
          <div className="mt-sm flex flex-col gap-3xs">
            <div className="flex items-center gap-sm">
              <IllustrationCheckbox size="sm" />
              <div className="flex items-center gap-3xs">
                <span className="text-body-lg text-primary-black">2 three-card readings per day</span>
                <button className="inline-flex items-center" onClick={() => setSubSheetOpen(true)}>
                  <InfoIcon size={16} />
                </button>
              </div>
            </div>
            {["Daily card", "Reading history", "Customizable decks", "50% off Flex readings"].map((f) => (
              <div key={f} className="flex items-center gap-sm">
                <IllustrationCheckbox size="sm" />
                <span className="text-body-lg text-primary-black">{f}</span>
              </div>
            ))}
          </div>

          {/* Plan selector */}
          <div className="mt-sm flex flex-col gap-xs">
            <PlanCard
              selected={selectedPlan === "yearly"}
              onSelect={() => setSelectedPlan("yearly")}
              label="Yearly"
              bestValue
              rightContent={
                <div>
                  <div>
                    <span className="text-body-bold text-primary-black">$59.99</span>
                    <span className="text-body-lg text-primary-black"> ($4.99/mo)</span>
                  </div>
                  <span className="text-body-bold" style={{ color: "#FCA60A" }}>Save 45% vs monthly</span>
                </div>
              }
            />
            <PlanCard
              selected={selectedPlan === "monthly"}
              onSelect={() => setSelectedPlan("monthly")}
              label="Monthly"
              rightContent={
                <span className="text-body-bold text-primary-black">$10.99</span>
              }
            />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-lg pb-xl pt-lg bg-primary-white" style={{ background: "linear-gradient(to bottom, transparent, #FFFFFF 30%)" }}>
        <p className="text-body-lg text-neutral-500 text-center mb-sm">
          {selectedPlan === "yearly" ? "No payment now. Cancel anytime." : "Cancel anytime."}
        </p>
        <AmberButton>{selectedPlan === "yearly" ? "Start your free trial" : "Join now"}</AmberButton>
      </div>

      <BottomSheet open={subSheetOpen} onClose={() => setSubSheetOpen(false)}>
        <p className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>Daily readings</p>
        <div className="mt-sm flex flex-col gap-2xs">
          <p className="text-body-lg text-primary-black">With Clir Pro, you get two three-card readings every day — plenty for most days.</p>
          <p className="text-body-lg text-primary-black">Each morning starts fresh, so you&apos;re never racing to use them up.</p>
          <p className="text-body-lg text-primary-black">And if you want to go deeper, Flex readings come at a big discount for Pro members.</p>
        </div>
        <div className="mt-lg">
          <AmberButton onClick={() => setSubSheetOpen(false)}>Okay</AmberButton>
        </div>
      </BottomSheet>
    </>
  );

  // ── Screen: Flex Empty ──
  const renderFlexEmpty = () => (
    <>
      <StatusBar />
      <div className="flex-1 overflow-y-auto rounded-t-xl bg-bg-secondary">
        {/* Hero image */}
        <div className="relative w-full" style={{ height: 220 }}>
          <img src="/no_flex.png" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute left-lg top-xs">
            <IconButton variant="close" onClick={() => navigate(prevScreen)} />
          </div>
        </div>

        <div className="flex flex-col px-lg pb-[100px]">
          {/* Headline */}
          <div className="flex flex-col items-center gap-sm text-center mt-sm">
            <div className="flex items-center justify-center gap-2xs">
              <h2 className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>
                Buy Flex readings
              </h2>
              <button className="inline-flex shrink-0 items-center" onClick={() => setFlexSheetOpen(true)}>
                <InfoIcon />
              </button>
            </div>
            <p className="text-body-lg text-primary-black text-center">
              Extra three-card readings for moments that need a closer look.
            </p>
          </div>

          {/* Package selector */}
          <div className="mt-sm flex flex-col gap-xs">
            <PlanCard
              selected={selectedFlexPack === 15}
              onSelect={() => setSelectedFlexPack(15)}
              label="15 Flex readings"
              bestValue
              rightContent={
                <div>
                  <div className="flex items-center gap-xs justify-end">
                    <span className="text-caption line-through text-primary-black">$24.99</span>
                    <span className="text-body-bold text-primary-black">$12.99</span>
                  </div>
                  <span className="text-body-lg text-primary-black">($0.39/reading)</span>
                </div>
              }
            />
            <PlanCard
              selected={selectedFlexPack === 10}
              onSelect={() => setSelectedFlexPack(10)}
              label="10 Flex readings"
              rightContent={
                <div>
                  <div className="flex items-center gap-xs justify-end">
                    <span className="text-caption line-through text-primary-black">$16.99</span>
                    <span className="text-body-bold text-primary-black">$8.99</span>
                  </div>
                  <span className="text-body-lg text-primary-black">($0.79/reading)</span>
                </div>
              }
            />
            <PlanCard
              selected={selectedFlexPack === 5}
              onSelect={() => setSelectedFlexPack(5)}
              label="5 Flex readings"
              rightContent={
                <div>
                  <div className="flex items-center gap-xs justify-end">
                    <span className="text-caption line-through text-primary-black">$8.99</span>
                    <span className="text-body-bold text-primary-black">$4.99</span>
                  </div>
                  <span className="text-body-lg text-primary-black">($0.99/reading)</span>
                </div>
              }
            />
          </div>

          {/* Upsell note */}
          <p className="mt-lg text-body-bold text-primary-black text-center">
            You&apos;re saving 50% on Flex readings with Clir Pro.
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-lg pb-xl pt-lg" style={{ background: "linear-gradient(to bottom, transparent, #FFFFFF 30%)" }}>
        <AmberButton>Buy now</AmberButton>
      </div>

      <BottomSheet open={flexSheetOpen} onClose={() => setFlexSheetOpen(false)}>
        <p className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>Flex readings</p>
        <div className="mt-sm flex flex-col gap-2xs">
          <p className="text-body-lg text-primary-black">Flex readings are pay-as-you-go — use them whenever you need.</p>
          <p className="text-body-lg text-primary-black">They never expire, so there&apos;s no rush.</p>
          <p className="text-body-lg text-primary-black">Clir Pro members get 50% off every pack.</p>
        </div>
        <div className="mt-lg">
          <AmberButton onClick={() => setFlexSheetOpen(false)}>Okay</AmberButton>
        </div>
      </BottomSheet>
    </>
  );

  // ── Screen: Sub Active ──
  const renderSubActive = () => (
    <>
      <StatusBar />
      <div className="flex flex-1 flex-col rounded-t-xl bg-bg-secondary">
        {/* Close */}
        <div className="px-lg py-xs">
          <IconButton variant="close" onClick={() => navigate(prevScreen)} />
        </div>

        {/* Centered content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-lg px-lg text-center">
          {/* Big count */}
          <div className="flex items-center gap-md">
            <IllustrationDaily size="lg" />
            <span
              className="font-extrabold leading-none"
              style={{ fontSize: 96, color: "#FCA60A", letterSpacing: "-0.04em", fontWeight: 900 }}
            >
              2
            </span>
          </div>
          {/* Label */}
          <div className="flex flex-col items-center gap-sm">
            <h2 className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>
              Daily readings
            </h2>
            <div className="flex flex-col gap-2xs text-center">
              <p className="text-body-lg text-primary-black">Enjoy two readings each day.</p>
              <p className="text-body-lg text-primary-black">Renews daily, not accumulated.</p>
            </div>
          </div>
        </div>

        {/* Bottom link */}
        <div className="px-lg pb-xl text-center">
          <button className="text-body-bold text-primary-black underline active:opacity-70">
            Change payment cycle – go annual and save 45%
          </button>
        </div>
      </div>
      <HomeIndicator bg="bg-bg-secondary" />
    </>
  );

  // ── Screen: Flex Active ──
  const renderFlexActive = () => (
    <>
      <StatusBar />
      <div className="flex flex-1 flex-col rounded-t-xl bg-bg-secondary">
        {/* Close */}
        <div className="px-lg py-xs">
          <IconButton variant="close" onClick={() => navigate(prevScreen)} />
        </div>

        {/* Centered content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-lg px-lg text-center">
          <div className="flex items-center gap-md">
            <IllustrationFlex size="lg" />
            <span
              className="font-extrabold leading-none"
              style={{ fontSize: 96, color: "#FCA60A", letterSpacing: "-0.04em", fontWeight: 900 }}
            >
              6
            </span>
          </div>
          <div className="flex flex-col items-center gap-sm">
            <h2 className="text-h2 text-primary-black" style={{ letterSpacing: "-0.02em" }}>
              Flex readings
            </h2>
            <div className="flex flex-col gap-2xs text-center">
              <p className="text-body-lg text-primary-black">Use your extra readings anytime.</p>
              <p className="text-body-lg text-primary-black">They never expire.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col gap-sm px-lg pb-xl">
          <AmberButton onClick={() => navigate("flex-empty")}>Get more Flex readings</AmberButton>
          <BlackButton onClick={() => navigate("sub-empty")}>Get 50% discount with Clir Pro</BlackButton>
        </div>
      </div>
      <HomeIndicator bg="bg-bg-secondary" />
    </>
  );

  const screenRenderers: Record<Screen, () => React.ReactNode> = {
    home: renderHome,
    "sub-empty": renderSubEmpty,
    "flex-empty": renderFlexEmpty,
    "sub-active": renderSubActive,
    "flex-active": renderFlexActive,
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-neutral-200 py-xl">
      <style dangerouslySetInnerHTML={{ __html: CAROUSEL_STYLES }} />

      {/* ── Dev Toggle ── */}
      <div className="flex flex-col items-center gap-sm">
        {/* Screen toggles */}
        <div className="flex flex-wrap items-center justify-center gap-xs">
          {(
            [
              ["home", "Home"],
              ["sub-empty", "Sub: No sub"],
              ["flex-empty", "Flex: No flex"],
              ["sub-active", "Sub: Active"],
              ["flex-active", "Flex: Active"],
            ] as [Screen, string][]
          ).map(([s, label]) => (
            <button
              key={s}
              onClick={() => navigate(s)}
              className="rounded-full px-sm py-2xs text-xs font-semibold transition-colors"
              style={{
                background: screen === s ? "#1A1A1A" : "#D9D9D9",
                color: screen === s ? "#FFFFFF" : "#1A1A1A",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Boolean toggles */}
        <div className="flex items-center gap-md">
          <label className="flex cursor-pointer items-center gap-2xs text-xs font-semibold text-neutral-700">
            <input
              type="checkbox"
              checked={hasSubscription}
              onChange={(e) => setHasSubscription(e.target.checked)}
              className="size-4 cursor-pointer accent-amber-500"
            />
            Has Subscription
          </label>
          <label className="flex cursor-pointer items-center gap-2xs text-xs font-semibold text-neutral-700">
            <input
              type="checkbox"
              checked={hasFlexReadings}
              onChange={(e) => setHasFlexReadings(e.target.checked)}
              className="size-4 cursor-pointer accent-amber-500"
            />
            Has Flex Readings
          </label>
        </div>
      </div>

      {/* ── Phone Shell ── */}
      <div className="relative flex h-[874px] w-[402px] flex-col overflow-hidden rounded-[44px] border-2 border-neutral-300 bg-primary-black shadow-high">
        {screenRenderers[screen]()}
      </div>
    </div>
  );
}
