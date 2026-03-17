"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IconChevronLeft, IconNewSpread } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ButtonSmall } from "@/components/ui/button-small";

// ── Data ────────────────────────────────────────────────────
const CARDS = [
  {
    name: "Five of Pentacles",
    image: "/cards/five-of-pentacles.jpg",
    tag: "Upright",
    description:
      "Material challenges invite you to look inward and find the strength you already carry.",
  },
  {
    name: "Page of Wands",
    image: "/cards/page-of-wands.jpg",
    tag: "Reversed",
    description:
      "A journey of innocence and new beginnings shaped your foundation.",
  },
  {
    name: "The Star",
    image: "/cards/the-star.jpg",
    tag: "Upright",
    description:
      "Hope and renewal follow a period of difficulty — trust the path ahead.",
  },
];

const ADVICE = [
  "Reflect on the lessons learned from your previous experiences and consider whether you have fully processed them before making a move.",
  "Take time to explore your motivations independently, ensuring your next step comes from a place of clarity rather than urgency.",
  "Trust that the right opportunity will not require you to abandon your values — patience now creates the foundation for lasting success.",
];

type Seg =
  | { type: "text"; value: string }
  | { type: "pill"; cardIndex: number };

const PARAGRAPHS: Seg[][] = [
  [
    { type: "pill", cardIndex: 0 },
    {
      type: "text",
      value:
        " encourages you to take charge of your decisions, suggesting that you have the strength to navigate the situation even when resources feel scarce.",
    },
  ],
  [
    { type: "pill", cardIndex: 1 },
    {
      type: "text",
      value:
        " indicates a readiness to explore new directions and pursue emerging opportunities, but cautions you to first heal from past experiences before committing fully.",
    },
  ],
  [
    {
      type: "text",
      value:
        "Together, these cards suggest a journey where you must balance ambition with patience. It\u2019s important to assess whether you are truly ready to move forward, or whether unresolved feelings might cloud your judgment.",
    },
  ],
];

// ── Helpers ──────────────────────────────────────────────────
const CARD_W = 228;
const CARD_H = 394;
const OVERLAY_W = 200;
const OVERLAY_H = Math.round(OVERLAY_W * (CARD_H / CARD_W)); // 346

function carouselStyle(index: number, active: number, dragPx: number) {
  const pos = index - active - dragPx / CARD_W;
  const abs = Math.abs(pos);
  if (abs > 1.5)
    return { display: "none" as const, transform: "", opacity: 0, zIndex: 0 };
  return {
    display: "block" as const,
    transform: `perspective(800px) translateX(${pos * 120}px) scale(${1 - abs * 0.15}) rotateY(${pos * -10}deg)`,
    opacity: 1 - abs * 0.4,
    zIndex: 10 - Math.round(abs * 5),
  };
}

function ThumbIcon({ up, filled }: { up: boolean; filled: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={up ? "" : "scale(1,-1) translate(0,-24)"}>
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      </g>
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function TarotReadingPage() {
  /* Carousel */
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const mouseDown = useRef(false);

  /* Overlay */
  const [overlayIdx, setOverlayIdx] = useState<number | null>(null);
  const [overlayVis, setOverlayVis] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [spinTrans, setSpinTrans] = useState("");
  const spinning = useRef(false);
  const spinX0 = useRef(0);
  const spinA0 = useRef(0);
  const ptrHist = useRef<{ x: number; t: number }[]>([]);
  const spinResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Nudge — floating bottom button */
  const [nudgeMounted, setNudgeMounted] = useState(false);
  const [nudgeScrollHidden, setNudgeScrollHidden] = useState(false);
  const bigPictureRef = useRef<HTMLDivElement>(null);
  const cardInfoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Resonance */
  const [thumbs, setThumbs] = useState<"up" | "down" | null>(null);

  /* Advice fade-in */
  const adviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [adviceVis, setAdviceVis] = useState([false, false, false]);

  /* Nudge — delayed entrance after mount */
  useEffect(() => {
    const t = setTimeout(() => setNudgeMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* Nudge — hide/show based on card info visibility while scrolling */
  useEffect(() => {
    const scroller = scrollRef.current;
    const info = cardInfoRef.current;
    if (!scroller || !info) return;
    let initialTop: number | null = null;
    function onScroll() {
      const rect = info!.getBoundingClientRect();
      if (initialTop === null) initialTop = rect.top;
      // Hide as soon as the user scrolls down at all (card info moves up from its initial position)
      setNudgeScrollHidden(rect.top < initialTop);
    }
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  /* Advice fade-in */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            setAdviceVis((p) => {
              const n = [...p];
              n[i] = true;
              return n;
            });
          }
        }),
      { threshold: 0.3 },
    );
    adviceRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Overlay open/close */
  function openOverlay(i: number) {
    setOverlayIdx(i);
    setSpinAngle(0);
    setSpinTrans("");
    requestAnimationFrame(() => setOverlayVis(true));
  }
  function closeOverlay() {
    if (spinResetTimer.current) clearTimeout(spinResetTimer.current);
    setOverlayVis(false);
    setTimeout(() => setOverlayIdx(null), 300);
  }

  /* Carousel touch */
  function cTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    setDragging(true);
  }
  function cTouchMove(e: React.TouchEvent) {
    if (!dragging) return;
    setDrag(e.touches[0].clientX - startX.current);
  }
  function cEnd() {
    setDragging(false);
    mouseDown.current = false;
    if (Math.abs(drag) > 50)
      setActive((a) =>
        Math.max(0, Math.min(CARDS.length - 1, a + (drag < 0 ? 1 : -1))),
      );
    setDrag(0);
  }
  function cMouseDown(e: React.MouseEvent) {
    startX.current = e.clientX;
    mouseDown.current = true;
    setDragging(true);
  }
  function cMouseMove(e: React.MouseEvent) {
    if (!mouseDown.current) return;
    setDrag(e.clientX - startX.current);
  }

  /* Card spin */
  function sDown(e: React.PointerEvent) {
    if (spinResetTimer.current) clearTimeout(spinResetTimer.current);
    spinning.current = true;
    spinX0.current = e.clientX;
    spinA0.current = spinAngle;
    ptrHist.current = [{ x: e.clientX, t: Date.now() }];
    setSpinTrans("none");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function sMove(e: React.PointerEvent) {
    if (!spinning.current) return;
    setSpinAngle(spinA0.current + (e.clientX - spinX0.current) * 0.8);
    ptrHist.current.push({ x: e.clientX, t: Date.now() });
    if (ptrHist.current.length > 5) ptrHist.current.shift();
  }
  function sUp() {
    if (!spinning.current) return;
    spinning.current = false;
    const h = ptrHist.current;
    if (h.length < 2) return;
    let vx = 0,
      n = 0;
    for (let i = 1; i < h.length; i++) {
      const dt = h[i].t - h[i - 1].t;
      if (dt > 0) {
        vx += (h[i].x - h[i - 1].x) / dt;
        n++;
      }
    }
    vx = n > 0 ? vx / n : 0;
    const speed = Math.abs(vx);
    const rots = Math.min(6, Math.max(1, Math.round(speed * 4)));
    const dur = Math.max(400, Math.min(1500, 1600 - speed * 600));
    setSpinTrans(`transform ${dur}ms cubic-bezier(0.22,0,0,1)`);
    setSpinAngle((a) => a + rots * 360 * (vx >= 0 ? 1 : -1));
    spinResetTimer.current = setTimeout(() => {
      setSpinTrans("transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)");
      setSpinAngle(0);
    }, 2000);
  }

  const card = CARDS[active];

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200">
      <div className="relative h-[874px] w-[402px] overflow-hidden rounded-[44px] border-2 border-neutral-200 bg-bg-secondary shadow-high">
        <div className="flex h-full flex-col">
          {/* Status bar */}
          <div className="flex h-[62px] shrink-0 items-end justify-between px-lg pb-2xs">
            <span className="text-caption-bold text-primary-black">9:41</span>
            <div className="flex items-center gap-3xs">
              <div className="h-[10px] w-[16px] rounded-2xs border border-primary-black opacity-60" />
            </div>
          </div>

          {/* Middle: scroll + sticky bottom */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              {/* 1. Top Nav */}
              <div className="flex h-[56px] items-center px-sm">
                <button className="flex size-[42px] items-center justify-center text-primary-black active:opacity-60">
                  <IconChevronLeft className="size-[42px]" />
                </button>
                <span className="flex-1 text-center text-body-bold text-primary-black">
                  Career &amp; Success
                </span>
                <div className="size-[42px]" />
              </div>

              {/* 2. Question Header */}
              <div className="px-lg py-md">
                <h1 className="text-center text-h2 text-primary-black leading-[1.15]">
                  Should I pursue a new opportunity?
                </h1>
              </div>

              {/* 3. Card Carousel */}
              <div
                className="relative mx-auto w-full select-none"
                style={{ height: CARD_H }}
                onTouchStart={cTouchStart}
                onTouchMove={cTouchMove}
                onTouchEnd={cEnd}
                onMouseDown={cMouseDown}
                onMouseMove={cMouseMove}
                onMouseUp={cEnd}
                onMouseLeave={cEnd}
              >
                {CARDS.map((_, i) => {
                  const s = carouselStyle(i, active, dragging ? drag : 0);
                  if (s.display === "none") return null;
                  return (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 rounded-xl bg-neutral-50 shadow-high"
                      style={{
                        width: CARD_W,
                        height: CARD_H,
                        marginLeft: -CARD_W / 2,
                        transform: s.transform,
                        opacity: s.opacity,
                        zIndex: s.zIndex,
                        transition: dragging
                          ? "none"
                          : "all 400ms cubic-bezier(.25,.1,.25,1)",
                        transformOrigin: "center center",
                      }}
                    >
                      <Image
                        src={CARDS[i].image}
                        alt={CARDS[i].name}
                        width={CARD_W}
                        height={CARD_H}
                        className="h-full w-full rounded-xl object-cover"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Card info */}
              <div ref={cardInfoRef} className="px-lg py-lg">
                <h2 className="text-center text-h3 text-primary-black">
                  {card.name}
                </h2>
                <div className="mt-2xs flex justify-center">
                  <span className="rounded-md bg-neutral-50 px-xs py-3xs text-caption-bold text-neutral-500 shadow-low">
                    {card.tag}
                  </span>
                </div>
                <p className="mt-sm text-center text-body-lg text-neutral-700 leading-[1.4]">
                  {card.description}
                </p>
              </div>

              {/* Divider */}
              <div className="mx-lg h-px bg-neutral-100" />

              {/* 4. See the bigger picture */}
              <div ref={bigPictureRef} className="px-lg py-lg">
                <h3 className="text-center text-h3 text-primary-black">
                  See the bigger picture
                </h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {PARAGRAPHS.map((segs, pi) => (
                    <p
                      key={pi}
                      className="text-body-lg text-neutral-700 leading-[1.4]"
                    >
                      {segs.map((seg, si) =>
                        seg.type === "pill" ? (
                          <button
                            key={si}
                            onClick={() => openOverlay(seg.cardIndex)}
                            className="inline-flex items-center rounded-md bg-primary-white px-2xs py-3xs text-body-bold text-primary-black shadow-low align-baseline active:opacity-70"
                          >
                            {CARDS[seg.cardIndex].name}
                          </button>
                        ) : (
                          <span key={si}>{seg.value}</span>
                        ),
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-lg h-px bg-neutral-100" />

              {/* 5. Advice for you */}
              <div className="px-lg py-lg">
                <h3 className="text-center text-h3 text-primary-black">Advice for you</h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {ADVICE.map((text, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        adviceRefs.current[i] = el;
                      }}
                      data-idx={i}
                      className="flex gap-sm rounded-lg bg-amber-100 p-sm"
                      style={{
                        opacity: adviceVis[i] ? 1 : 0,
                        transform: adviceVis[i]
                          ? "translateY(0)"
                          : "translateY(16px)",
                        transition: `all 500ms ease ${i * 150}ms`,
                      }}
                    >
                      <div className="shrink-0 pt-3xs text-primary-amber">
                        <IconNewSpread className="size-[24px]" />
                      </div>
                      <p className="text-body-lg text-neutral-700 leading-[1.4]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-lg h-px bg-neutral-100" />

              {/* 6. Resonance Row */}
              <div className="flex flex-col items-center gap-sm px-lg py-lg">
                <span className="text-center text-body-lg text-neutral-700">
                  Does this reading resonate with you?
                </span>
                <div className="flex gap-lg">
                  <button
                    onClick={() =>
                      setThumbs(thumbs === "down" ? null : "down")
                    }
                    className={`rounded-full p-2xs transition-colors ${thumbs === "down" ? "bg-neutral-100 text-primary-black" : "text-neutral-400"} active:opacity-60`}
                  >
                    <ThumbIcon up={false} filled={thumbs === "down"} />
                  </button>
                  <button
                    onClick={() => setThumbs(thumbs === "up" ? null : "up")}
                    className={`rounded-full p-2xs transition-colors ${thumbs === "up" ? "bg-neutral-100 text-primary-black" : "text-neutral-400"} active:opacity-60`}
                  >
                    <ThumbIcon up={true} filled={thumbs === "up"} />
                  </button>
                </div>
              </div>

              {/* Inline CTA buttons */}
              <div className="px-lg pb-lg">
                <Button variant="primary">Get another reading</Button>
                <div className="mt-2xs flex justify-center">
                  <Button variant="text">Go home</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex h-[34px] shrink-0 items-end justify-center pb-2xs">
            <div className="h-[5px] w-[134px] rounded-full bg-primary-black" />
          </div>
        </div>

        {/* ── Floating Nudge — gradient scrim + button ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[34px] z-40"
          style={{
            opacity: nudgeMounted && !nudgeScrollHidden ? 1 : 0,
            transform: nudgeMounted && !nudgeScrollHidden ? "translateY(0)" : "translateY(100%)",
            transition: !nudgeMounted
              ? "all 400ms ease-out"
              : nudgeScrollHidden
                ? "all 250ms ease-in"
                : "all 300ms ease-out",
          }}
        >
          {/* Gradient scrim */}
          <div
            className="absolute inset-x-0 bottom-0 h-[120px]"
            style={{ background: "linear-gradient(to top, var(--color-bg-secondary) 0%, transparent 100%)" }}
          />
          {/* Button */}
          <div className="relative flex justify-center pb-sm">
            <ButtonSmall
              variant="secondary"
              icon={<IconNewSpread className="size-[16px]" />}
              className="pointer-events-auto shadow-high"
              onClick={() => {
                bigPictureRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              See the bigger picture
            </ButtonSmall>
          </div>
        </div>

        {/* ── Card Detail Overlay ── */}
        {overlayIdx !== null && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
            {/* Mask with backdrop blur */}
            <div
              className="absolute inset-0 bg-primary-black/60 transition-all duration-300"
              style={{
                opacity: overlayVis ? 1 : 0,
                backdropFilter: overlayVis ? "blur(24px)" : "blur(0px)",
                WebkitBackdropFilter: overlayVis ? "blur(24px)" : "blur(0px)",
              }}
              onClick={closeOverlay}
            />
            {/* Card + info */}
            <div
              className="relative flex flex-col items-center gap-lg transition-all duration-300"
              style={{
                transform: overlayVis ? "scale(1)" : "scale(0.85)",
                opacity: overlayVis ? 1 : 0,
                perspective: "1200px",
              }}
            >
              <div
                className="relative cursor-grab active:cursor-grabbing"
                style={{
                  width: OVERLAY_W,
                  height: OVERLAY_H,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${spinAngle}deg)`,
                  transition: spinTrans,
                  touchAction: "none",
                }}
                onPointerDown={sDown}
                onPointerMove={sMove}
                onPointerUp={sUp}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-xl shadow-high"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={CARDS[overlayIdx].image}
                    alt={CARDS[overlayIdx].name}
                    width={OVERLAY_W}
                    height={OVERLAY_H}
                    className="h-full w-full object-cover"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                {/* Back face */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-xl shadow-high"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src="/cards/card-back.jpg"
                    alt="Card back"
                    width={OVERLAY_W}
                    height={OVERLAY_H}
                    className="h-full w-full object-cover"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </div>
              {/* Card name & description */}
              <div className="flex flex-col items-center gap-xs px-xl">
                <h2 className="text-center text-h2 text-primary-white">
                  {CARDS[overlayIdx].name}
                </h2>
                <p className="text-center text-body-lg text-primary-white">
                  {CARDS[overlayIdx].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
