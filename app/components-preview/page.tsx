"use client";

import { registry } from "@/components/ui/registry";

const COLORS = [
  {
    group: "Primary",
    tokens: [
      { name: "primary/black", className: "bg-primary-black", hex: "#1A1A1A" },
      { name: "primary/amber", className: "bg-primary-amber", hex: "#FCA60A" },
      { name: "primary/white", className: "bg-primary-white", hex: "#FFFFFF", border: true },
    ],
  },
  {
    group: "Amber",
    tokens: [
      { name: "amber/900", className: "bg-amber-900", hex: "#613D00" },
      { name: "amber/800", className: "bg-amber-800", hex: "#8A5800" },
      { name: "amber/700", className: "bg-amber-700", hex: "#B37300" },
      { name: "amber/500", className: "bg-amber-500", hex: "#FCA60A" },
      { name: "amber/400", className: "bg-amber-400", hex: "#FDBA3D" },
      { name: "amber/200", className: "bg-amber-200", hex: "#FED88A" },
      { name: "amber/100", className: "bg-amber-100", hex: "#FEEABC" },
      { name: "amber/50", className: "bg-amber-50", hex: "#FFF6E5" },
    ],
  },
  {
    group: "Neutral",
    tokens: [
      { name: "neutral/900", className: "bg-neutral-900", hex: "#1A1A1A" },
      { name: "neutral/800", className: "bg-neutral-800", hex: "#2D2D2D" },
      { name: "neutral/700", className: "bg-neutral-700", hex: "#2B2B2B" },
      { name: "neutral/500", className: "bg-neutral-500", hex: "#737C7C" },
      { name: "neutral/400", className: "bg-neutral-400", hex: "#8C8C8C" },
      { name: "neutral/200", className: "bg-neutral-200", hex: "#D9D9D9" },
      { name: "neutral/100", className: "bg-neutral-100", hex: "#E6E8E8" },
      { name: "neutral/50", className: "bg-neutral-50", hex: "#F2F3F3" },
    ],
  },
  {
    group: "Brand",
    tokens: [
      { name: "brand/neon", className: "bg-brand-neon", hex: "#CCFF01" },
      { name: "brand/amber", className: "bg-brand-amber", hex: "#FCA60A" },
      { name: "brand/gold", className: "bg-brand-gold", hex: "#A97D24" },
    ],
  },
  {
    group: "Semantic",
    tokens: [
      { name: "semantic/error", className: "bg-semantic-error", hex: "#FF5542" },
      { name: "semantic/success", className: "bg-semantic-success", hex: "#34A853" },
      { name: "semantic/warning", className: "bg-semantic-warning", hex: "#FBBC05" },
      { name: "semantic/info", className: "bg-semantic-info", hex: "#4285F4" },
    ],
  },
  {
    group: "Background",
    tokens: [
      { name: "bg/primary", className: "bg-bg-primary", hex: "#FFFFFF", border: true },
      { name: "bg/secondary", className: "bg-bg-secondary", hex: "#F2F3F3" },
      { name: "bg/dark", className: "bg-bg-dark", hex: "#1A1A1A" },
    ],
  },
];

const SPACINGS = [
  { name: "4xs", className: "w-4xs", value: "2px" },
  { name: "3xs", className: "w-3xs", value: "4px" },
  { name: "2xs", className: "w-2xs", value: "8px" },
  { name: "xs", className: "w-xs", value: "12px" },
  { name: "sm", className: "w-sm", value: "16px" },
  { name: "md", className: "w-md", value: "20px" },
  { name: "lg", className: "w-lg", value: "24px" },
  { name: "xl", className: "w-xl", value: "32px" },
  { name: "2xl", className: "w-2xl", value: "40px" },
  { name: "3xl", className: "w-3xl", value: "48px" },
  { name: "4xl", className: "w-4xl", value: "64px" },
];

const RADII = [
  { name: "none", className: "rounded-none", value: "0px" },
  { name: "2xs", className: "rounded-2xs", value: "4px" },
  { name: "sm", className: "rounded-sm", value: "8px" },
  { name: "md", className: "rounded-md", value: "12px" },
  { name: "toggle", className: "rounded-toggle", value: "14px" },
  { name: "lg", className: "rounded-lg", value: "16px" },
  { name: "icon", className: "rounded-icon", value: "20px" },
  { name: "xl", className: "rounded-xl", value: "24px" },
  { name: "pill", className: "rounded-pill", value: "32px" },
  { name: "full", className: "rounded-full", value: "999px" },
];

const ELEVATIONS = [
  {
    name: "low",
    className: "shadow-low",
    spec: "0 2px 4px rgba(0,0,0,0.10)",
  },
  {
    name: "medium",
    className: "shadow-medium",
    spec: "0 4px 12px rgba(0,0,0,0.10)",
  },
  {
    name: "high",
    className: "shadow-high",
    spec: "0 8px 24px rgba(0,0,0,0.10)",
  },
];

const TEXT_STYLES = [
  {
    name: "display",
    className: "text-display",
    sample: "Clir",
    spec: "46px / ExtraBold (800)",
  },
  {
    name: "h1",
    className: "text-h1",
    sample: "Enter new password",
    spec: "32px / ExtraBold (800)",
  },
  {
    name: "h2",
    className: "text-h2",
    sample: "Your mindful moment",
    spec: "30px / ExtraBold (800)",
  },
  {
    name: "h3",
    className: "text-h3",
    sample: "Should I pursue a new opportunity?",
    spec: "20px / ExtraBold (800)",
  },
  {
    name: "body-lg",
    className: "text-body-lg",
    sample: "A mindful way to see yourself more clearly",
    spec: "16px / Medium (500)",
  },
  {
    name: "body-bold",
    className: "text-body-bold",
    sample: "Get started",
    spec: "16px / ExtraBold (800)",
  },
  {
    name: "body-semi",
    className: "text-body-semi",
    sample: "Enter your name",
    spec: "16px / Bold (700)",
  },
  {
    name: "label",
    className: "text-label",
    sample: "Queen of cups",
    spec: "16px / Black (900)",
  },
  {
    name: "caption",
    className: "text-caption",
    sample: "Makes your reading personal",
    spec: "12px / Regular (400)",
  },
  {
    name: "caption-bold",
    className: "text-caption-bold",
    sample: "Enter your name",
    spec: "12px / Bold (700)",
  },
];

export default function ComponentsPreview() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-primary-white px-8 py-5">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-h3 text-primary-black">Component Library</h1>
          <p className="mt-1 text-caption text-neutral-500">
            {TEXT_STYLES.length} text styles &middot;{" "}
            {COLORS.reduce((n, g) => n + g.tokens.length, 0)} colors &middot;{" "}
            {SPACINGS.length} spacings &middot;{" "}
            {RADII.length} radii &middot;{" "}
            {ELEVATIONS.length} elevations &middot; {registry.length} component
            {registry.length !== 1 && "s"}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-8 py-8">
        {/* Typography section */}
        <section className="mb-8 overflow-hidden rounded-xl border border-neutral-200 bg-primary-white">
          <div className="border-b border-neutral-100 px-6 py-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-h3 text-primary-black">Typography</h2>
              <span className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-caption text-neutral-500">
                Mulish &middot; letter-spacing -2%
              </span>
            </div>
            <p className="mt-1 text-caption text-neutral-500">
              All text styles from the design system. Font: Mulish, line-height:
              normal, letter-spacing: -0.02em.
            </p>
          </div>
          <div className="divide-y divide-neutral-100">
            {TEXT_STYLES.map((style) => (
              <div key={style.name} className="flex items-center gap-6 px-6 py-5">
                <div className="w-[100px] shrink-0">
                  <span className="text-caption-bold text-neutral-500">
                    {style.name}
                  </span>
                </div>
                <div className="flex-1">
                  <span className={`${style.className} text-primary-black`}>
                    {style.sample}
                  </span>
                </div>
                <div className="shrink-0">
                  <span className="text-caption text-neutral-400">
                    {style.spec}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colors section */}
        <section className="mb-8 overflow-hidden rounded-xl border border-neutral-200 bg-primary-white">
          <div className="border-b border-neutral-100 px-6 py-4">
            <h2 className="text-h3 text-primary-black">Colors</h2>
            <p className="mt-1 text-caption text-neutral-500">
              All color tokens from the design system.
            </p>
          </div>
          <div className="divide-y divide-neutral-100">
            {COLORS.map((group) => (
              <div key={group.group} className="px-6 py-5">
                <span className="text-caption-bold uppercase tracking-wider text-neutral-400">
                  {group.group}
                </span>
                <div className="mt-3 flex flex-wrap gap-4">
                  {group.tokens.map((token) => (
                    <div key={token.name} className="flex flex-col items-center gap-2">
                      <div
                        className={`size-[56px] rounded-md ${token.className} ${token.border ? "border border-neutral-200" : ""}`}
                      />
                      <span className="text-caption-bold text-primary-black">
                        {token.name}
                      </span>
                      <span className="text-caption text-neutral-400">
                        {token.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Elevation section */}
        <section className="mb-8 overflow-hidden rounded-xl border border-neutral-200 bg-primary-white">
          <div className="border-b border-neutral-100 px-6 py-4">
            <h2 className="text-h3 text-primary-black">Elevation</h2>
            <p className="mt-1 text-caption text-neutral-500">
              Box shadow tokens for layering and depth.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 px-6 py-6">
            {ELEVATIONS.map((el) => (
              <div key={el.name} className="flex flex-col items-center gap-3">
                <div
                  className={`flex size-[120px] items-center justify-center rounded-lg bg-primary-white ${el.className}`}
                >
                  <span className="text-body-bold text-primary-black">
                    {el.name}
                  </span>
                </div>
                <span className="text-caption text-neutral-400">
                  {el.spec}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing section */}
        <section className="mb-8 overflow-hidden rounded-xl border border-neutral-200 bg-primary-white">
          <div className="border-b border-neutral-100 px-6 py-4">
            <h2 className="text-h3 text-primary-black">Spacing</h2>
            <p className="mt-1 text-caption text-neutral-500">
              Spacing scale used for padding, margin, and gap.
            </p>
          </div>
          <div className="divide-y divide-neutral-100">
            {SPACINGS.map((s) => (
              <div key={s.name} className="flex items-center gap-6 px-6 py-4">
                <div className="w-[60px] shrink-0">
                  <span className="text-caption-bold text-neutral-500">
                    {s.name}
                  </span>
                </div>
                <div className="flex flex-1 items-center">
                  <div
                    className={`h-[16px] rounded-sm bg-primary-amber ${s.className}`}
                  />
                </div>
                <div className="shrink-0">
                  <span className="text-caption text-neutral-400">
                    {s.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius section */}
        <section className="mb-8 overflow-hidden rounded-xl border border-neutral-200 bg-primary-white">
          <div className="border-b border-neutral-100 px-6 py-4">
            <h2 className="text-h3 text-primary-black">Border Radius</h2>
            <p className="mt-1 text-caption text-neutral-500">
              Radius tokens for rounded corners.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 px-6 py-6">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div
                  className={`flex size-[72px] items-center justify-center border-2 border-primary-amber bg-neutral-50 ${r.className}`}
                >
                  <span className="text-caption-bold text-primary-black">
                    {r.name}
                  </span>
                </div>
                <span className="text-caption text-neutral-400">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        {registry.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-200 bg-primary-white px-8 py-16 text-center">
            <p className="text-body-lg text-neutral-400">
              No components registered yet
            </p>
            <p className="mt-2 text-caption text-neutral-400">
              Add components to{" "}
              <code className="rounded bg-neutral-50 px-1.5 py-0.5 font-mono text-caption text-neutral-500">
                /components/ui/registry.tsx
              </code>{" "}
              and they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {registry.map((entry) => (
              <section
                key={entry.name}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-primary-white"
              >
                {/* Component header */}
                <div className="border-b border-neutral-100 px-6 py-4">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-h3 text-primary-black">
                      {entry.name}
                    </h2>
                    {entry.figmaComponent && (
                      <span className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-caption text-neutral-500">
                        {entry.figmaComponent}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-caption text-neutral-500">
                    {entry.description}
                  </p>
                </div>

                {/* Variants grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-px bg-neutral-100 p-px">
                  {entry.variants.map((variant) => (
                    <div
                      key={variant.label}
                      className="flex flex-col bg-primary-white p-5"
                    >
                      <span className="mb-3 text-caption-bold uppercase tracking-wider text-neutral-400">
                        {variant.label}
                      </span>
                      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50 p-4">
                        {variant.render()}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
