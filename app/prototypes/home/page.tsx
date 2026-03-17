"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { TabBar } from "@/components/ui/tab-bar";
import {
  IconProfile,
  IconChevronRight,
} from "@/components/ui/icons";
import { IllustrationDaily, IllustrationFlex } from "@/components/ui/illustrations";

// Lazy-load Lottie so SSR doesn't break
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ── Lottie data (imported at build time) ──
import dailyCardAnim from "@/public/lotties/daily-card.json";
import threeCardsOrbitAnim from "@/public/lotties/three-cards-orbit.json";
import themeAnim from "@/public/lotties/theme.json";

// ── Questions for Three Cards carousel ──
const QUESTIONS = [
  "Should I pursue a new career opportunity?",
  "What does my love life look like this month?",
  "How can I find more balance in my daily routine?",
];

// ── CSS keyframes (injected once) ──
const CAROUSEL_STYLES = `
@keyframes slideInRight  { from { transform: translateX(60%);  opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes slideOutLeft  { from { transform: translateX(0);    opacity: 1 } to { transform: translateX(-60%); opacity: 0 } }
@keyframes slideInLeft   { from { transform: translateX(-60%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
@keyframes slideOutRight { from { transform: translateX(0);    opacity: 1 } to { transform: translateX(60%); opacity: 0 } }
`;

// ── Component ──
export default function HomeScreen() {
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

  // Lift-reveal animation on scroll into view
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
  }, []);

  // Navigate to a question
  const goTo = useCallback((next: number, dir: "fwd" | "bwd") => {
    if (next === activeQ) return;
    direction.current = dir;
    prevQ.current = activeQ;
    setActiveQ(next);
  }, [activeQ]);

  // Animate text on activeQ change
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
      outEl.style.animation = dir === "fwd"
        ? "slideOutLeft 300ms cubic-bezier(0.55,0,1,0.45) both"
        : "slideOutRight 300ms cubic-bezier(0.55,0,1,0.45) both";
    }
    if (inEl) {
      inEl.style.animation = "none";
      void inEl.offsetWidth;
      inEl.style.animation = dir === "fwd"
        ? "slideInRight 380ms cubic-bezier(0.25,0.46,0.45,0.94) both"
        : "slideInLeft 380ms cubic-bezier(0.25,0.46,0.45,0.94) both";
    }

    const tid = setTimeout(() => {
      if (outEl) {
        outEl.style.animation = "";
        outEl.style.opacity = "0";
        outEl.style.transform = "translateX(100%)";
      }
      if (inEl) {
        inEl.style.animation = "";
        inEl.style.opacity = "1";
        inEl.style.transform = "translateX(0)";
      }
    }, 380);
    return () => clearTimeout(tid);
  }, [activeQ]);

  // Auto-rotation
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

  // Swipe handlers
  const onSwipeStart = useCallback((x: number) => {
    swipeStartX.current = x;
  }, []);

  const onSwipeEnd = useCallback((x: number) => {
    const dx = x - swipeStartX.current;
    if (Math.abs(dx) < 40) return;
    pauseAuto();
    if (dx < 0) {
      goTo((activeQ + 1) % QUESTIONS.length, "fwd");
    } else {
      goTo((activeQ - 1 + QUESTIONS.length) % QUESTIONS.length, "bwd");
    }
  }, [activeQ, goTo, pauseAuto]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200">
      {/* Inject carousel keyframes */}
      <style dangerouslySetInnerHTML={{ __html: CAROUSEL_STYLES }} />
      {/* Phone shell */}
      <div className="relative flex h-[874px] w-[402px] flex-col overflow-hidden rounded-[44px] border-2 border-neutral-200 bg-bg-secondary shadow-high">
        {/* ── Status Bar ── */}
        <div className="flex h-[62px] shrink-0 items-end justify-between px-lg pb-xs">
          <span className="text-caption-bold text-primary-black">9:41</span>
          <div className="flex items-center gap-3xs">
            {/* Signal */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="8" width="3" height="4" rx="1" fill="#1A1A1A" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#1A1A1A" />
              <rect x="9" y="2" width="3" height="10" rx="1" fill="#1A1A1A" />
              <rect x="13" y="0" width="3" height="12" rx="1" fill="#1A1A1A" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="21"
                height="11"
                rx="2"
                stroke="#1A1A1A"
                strokeOpacity="0.35"
              />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="#1A1A1A" />
              <path
                d="M23 4.5V7.5C23.8 7.5 23.8 4.5 23 4.5Z"
                fill="#1A1A1A"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* ── Top Action Bar — absolute, floats over scroll content ── */}
        <div
          className="absolute inset-x-0 top-[62px] z-20"
          style={{ background: 'linear-gradient(to bottom, #F2F3F3 0%, #F2F3F3 60%, transparent 100%)' }}
        >
          <div className="flex items-center justify-between px-sm py-xs">
            {/* Profile button */}
            <button className="flex items-center justify-center rounded-pill border border-neutral-100 bg-primary-white p-xs shadow-high active:opacity-80">
              <IconProfile className="size-[24px] text-primary-black" />
            </button>

            {/* Stats pill */}
            <div className="flex items-center gap-xs rounded-pill border border-neutral-100 bg-primary-white px-sm py-xs shadow-high">
              <div className="flex items-center gap-3xs">
                <IllustrationDaily size="sm" />
                <span className="text-body-bold text-primary-black">2</span>
              </div>
              <div className="h-[16px] w-px bg-neutral-100" />
              <div className="flex items-center gap-3xs">
                <IllustrationFlex size="sm" />
                <span className="text-body-bold text-primary-black">16</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable Card Feed ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-md px-lg pb-lg pt-[74px]">
            {/* ── Greeting — scrolls with content ── */}
            <div className="text-center">
              <p className="text-body-bold text-primary-black">
                Get clarity this morning
              </p>
            </div>
            {/* ─── Card 1: Today's Card ─── */}
            <div
              ref={card1Ref}
              className="flex h-[521px] flex-col items-center gap-md overflow-hidden rounded-xl border border-neutral-100 p-xl shadow-high"
              style={{
                background:
                  "linear-gradient(to bottom, #FFFFFF, var(--color-bg-secondary))",
                opacity: 0,
                transform: "translateY(18px) scale(0.97)",
                transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.34, 1.1, 0.64, 1)",
              }}
            >
              <span className="text-body-semi text-primary-black">
                Today&apos;s Card
              </span>
              <h3 className="text-h3 text-primary-black text-center">
                Find clarity for your day
              </h3>
              <span className="text-body-semi text-neutral-500">
                Tuesday, Nov 11
              </span>

              {/* Lottie */}
              <div className="flex flex-1 items-center justify-center">
                <Lottie
                  animationData={dailyCardAnim}
                  loop
                  autoplay
                  style={{ width: 110, height: 110 }}
                />
              </div>

              {/* CTA */}
              <Button variant="primary">Reveal</Button>
            </div>

            {/* ─── Card 2: Three Cards ─── */}
            <div
              ref={card2Ref}
              className="flex h-[521px] flex-col items-center overflow-hidden rounded-xl border border-neutral-100 p-xl shadow-high"
              style={{
                background:
                  "linear-gradient(to bottom, #FFFFFF, var(--color-bg-secondary))",
                opacity: 0,
                transform: "translateY(18px) scale(0.97)",
                transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.34, 1.1, 0.64, 1)",
              }}
            >
              <span className="text-body-semi text-primary-black">
                Three Cards
              </span>

              <div className="flex w-full flex-1 flex-col items-center justify-between gap-md overflow-hidden py-md">
                {/* Lottie */}
                <div className="flex flex-1 items-center justify-center">
                  <Lottie
                    animationData={threeCardsOrbitAnim}
                    loop
                    autoplay
                    style={{ height: 110, width: "auto" }}
                  />
                </div>

                {/* Question carousel — single box, text slides inside */}
                <div className="w-full">
                  <span className="block text-center text-body-lg text-neutral-500">
                    Pick a popular question
                  </span>
                  <div
                    className="mt-xs flex w-full select-none items-center gap-sm rounded-xl bg-amber-100 p-sm"
                    onMouseDown={(e) => { e.preventDefault(); onSwipeStart(e.clientX); }}
                    onMouseUp={(e) => onSwipeEnd(e.clientX)}
                    onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => onSwipeEnd(e.changedTouches[0].clientX)}
                    style={{ touchAction: "pan-y", WebkitUserSelect: "none", userSelect: "none" }}
                  >
                    {/* Text viewport */}
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
                    {/* Arrow button — fixed */}
                    <div
                      className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-primary-white shadow-low cursor-pointer"
                      onClick={() => {
                        pauseAuto();
                        goTo((activeQ + 1) % QUESTIONS.length, "fwd");
                      }}
                    >
                      <IconChevronRight className="size-[20px] text-primary-black" />
                    </div>
                  </div>

                  <p className="mt-sm text-center text-body-lg text-neutral-500">or</p>
                </div>
              </div>

              {/* CTA */}
              <Button variant="primary">Ask your own</Button>
            </div>

            {/* ─── Card 3: Deck Picker Row ─── */}
            <div className="rounded-xl bg-primary-white px-sm">
              <div className="flex items-center gap-md py-[17.5px]">
                <span className="flex-1 text-body-semi text-primary-black">
                  Choose a deck that fits your mood and style
                </span>
                <div className="size-[42px] shrink-0">
                  <Lottie animationData={themeAnim} loop autoplay style={{ width: 42, height: 42 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom TabBar ── */}
        <div className="shrink-0">
          <TabBar activeTab="home" />
          {/* Home indicator */}
          <div className="flex h-[34px] items-end justify-center pb-2xs bg-primary-white">
            <div className="h-[5px] w-[134px] rounded-full bg-primary-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
