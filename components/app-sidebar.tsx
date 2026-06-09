"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Inbox,
  AtSign,
  FileText,
  Search,
  Package,
  ReceiptText,
  FolderArchive,
  Building2,
  Factory,
  BarChart3,
  Plug,
  Settings,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navGroups: {
  label: string
  items: { name: string; href: string; icon: React.ElementType; badge?: number }[]
}[] = [
  {
    label: "Workflow",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "RFQ Inbox", href: "/inbox", icon: Inbox, badge: 3 },
      { name: "Email Capture", href: "/email-capture", icon: AtSign },
      { name: "Quotes", href: "/quotes", icon: FileText, badge: 1 },
      { name: "Product Search", href: "/product-search", icon: Search },
      { name: "Orders", href: "/orders", icon: Package, badge: 2 },
      { name: "Invoices", href: "/invoices", icon: ReceiptText },
      { name: "Documents", href: "/documents", icon: FolderArchive },
    ],
  },
  {
    label: "Directory",
    items: [
      { name: "Buyers", href: "/buyers", icon: Building2 },
      { name: "Suppliers / OEMs", href: "/suppliers", icon: Factory },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "Integrations", href: "/integrations", icon: Plug },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-20">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
          <Sparkles className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold text-sidebar-accent-foreground">ToolBox</p>
          <p className="text-xs text-sidebar-foreground/70">by Western Premium</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-sidebar-foreground/50" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-sidebar-border bg-sidebar-accent/50 py-2.5 pl-10 pr-3 text-sm text-sidebar-accent-foreground outline-none placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-sidebar-ring/30"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
              {group.label}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className={cn("size-5 shrink-0", active ? "text-sidebar-primary" : "text-sidebar-foreground/70")} />
                      <span className="flex-1">{item.name}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-[11px] font-semibold",
                            active
                              ? "bg-sidebar-primary text-sidebar-primary-foreground"
                              : "bg-sidebar-accent text-sidebar-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-xs font-semibold">
            SA
          </div>
          <div className="leading-tight min-w-0 flex-1">
            <p className="text-sm font-semibold text-sidebar-accent-foreground truncate">Samuel Adeyemi</p>
            <p className="text-[11px] text-sidebar-foreground/70 truncate">Vendor Sales Lead</p>
          </div>
          <span className="rounded-full border border-sidebar-border px-2 py-0.5 text-[10px] font-semibold text-sidebar-foreground">
            Pro
          </span>
        </div>
      </div>
    </aside>
  )
}
