import Link from "next/link"
import { Wordmark } from "@/components/wordmark"

const groups = [
  {
    title: "Product",
    links: [
      { name: "How it works", href: "#how-it-works" },
      { name: "Features", href: "#features" },
      { name: "Results", href: "#results" },
      { name: "Live demo", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Sign in", href: "/signin" },
      { name: "Get started", href: "/onboarding" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Wordmark size="md" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The vendor-first procurement platform that turns RFQs into winning quotes in seconds.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-sm font-semibold text-foreground">{g.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {g.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:text-left">
          wekbench · wekbench.com · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
