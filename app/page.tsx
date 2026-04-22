import Link from "next/link";

const prototypes: { href: string; name: string; description: string }[] = [
  {
    href: "/prototypes/tarot-reading",
    name: "Tarot Reading Result",
    description:
      "Full reading result screen with card carousel, interpretations, and card detail overlay.",
  },
  {
    href: "/prototypes/tarot-reading-v2",
    name: "Tarot Reading Result V2",
    description:
      "Progressive reveal layout — tap cards one-by-one to unlock the full reading.",
  },
  {
    href: "/prototypes/home",
    name: "Home Screen",
    description:
      "Main home screen with greeting, card feed, Lottie animations, question carousel, and TabBar.",
  },
  {
    href: "/prototypes/subscriptions",
    name: "Subscriptions",
    description:
      "Upgrade screen with current plan, Clir Pro features, and Flex reading purchase.",
  },
  {
    href: "/prototypes/subscriptions-v2",
    name: "Subscriptions V2",
    description:
      "Interactive 5-screen prototype: home with split pills, sub/flex paywalls, and active reading count screens. Dev toggles above the phone.",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-zinc-50 dark:bg-black"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <main
        style={{ maxWidth: 672, margin: "0 auto", padding: "64px 32px", display: "flex", flexDirection: "column", gap: 48 }}
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Clir
          </h1>
          <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
            Prototype index and component library.
          </p>
        </div>

        {/* Prototypes */}
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Prototypes
          </h2>
          {prototypes.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-400">
              No prototypes yet. Create one under{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                /prototypes/
              </code>
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {prototypes.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group flex flex-col rounded-lg border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                  >
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {p.name}
                    </span>
                    <span className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {p.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Tools */}
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Tools
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <Link
                href="/components-preview"
                className="group flex flex-col rounded-lg border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  Component Library
                </span>
                <span className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Preview all UI components with their variants and states.
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
