"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Menu,
  MessageSquare,
  Cloud,
  LayoutDashboard,
  Inbox,
  AtSign,
  FileText,
  Package,
  ReceiptText,
  FolderArchive,
  Building2,
  Factory,
  BarChart3,
  Plug,
  Settings,
  Sparkles,
  Search as SearchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const mobileNav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "RFQ Inbox", href: "/inbox", icon: Inbox },
  { name: "Email Capture", href: "/email-capture", icon: AtSign },
  { name: "Quotes", href: "/quotes", icon: FileText },
  { name: "Product Search", href: "/product-search", icon: SearchIcon },
  { name: "Orders", href: "/orders", icon: Package },
  { name: "Invoices", href: "/invoices", icon: ReceiptText },
  { name: "Documents", href: "/documents", icon: FolderArchive },
  { name: "Buyers", href: "/buyers", icon: Building2 },
  { name: "Suppliers / OEMs", href: "/suppliers", icon: Factory },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "Settings", href: "/settings", icon: Settings },
]

const titleMap: Record<string, string> = {
  "/": "Command Center",
  "/inbox": "RFQ Inbox",
  "/email-capture": "Email Capture",
  "/quotes": "Quotes",
  "/product-search": "Product Search",
  "/orders": "Orders",
  "/invoices": "Invoices",
  "/documents": "Documents",
  "/buyers": "Buyers",
  "/suppliers": "Suppliers / OEMs",
  "/reports": "Reports",
  "/integrations": "Integrations",
  "/settings": "Settings",
}

function IconButton({
  children,
  label,
  badge,
}: {
  children: React.ReactNode
  label: string
  badge?: number
}) {
  return (
    <button
      type="button"
      className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-5 h-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground ring-2 ring-background">
          {badge}
        </span>
      ) : null}
      <span className="sr-only">{label}</span>
    </button>
  )
}

export function Topbar() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  const title =
    titleMap[pathname] ??
    (pathname.startsWith("/rfq")
      ? "RFQ Detail"
      : pathname.startsWith("/orders/")
        ? "Order Detail"
        : "ToolBox")

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-3 bg-background/80 px-4 backdrop-blur md:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="size-5" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center gap-3 px-5 h-20">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
              <Sparkles className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold text-sidebar-accent-foreground">ToolBox</p>
              <p className="text-xs text-sidebar-foreground/70">by Western Premium</p>
            </div>
          </div>
          <nav className="p-3">
            <ul className="flex flex-col gap-1">
              {mobileNav.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                      )}
                    >
                      <Icon className="size-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{title}</h1>

      <div className="ml-auto flex items-center gap-1">
        <IconButton label="Cloud sync">
          <Cloud className="size-5" />
        </IconButton>
        <IconButton label="Messages">
          <MessageSquare className="size-5" />
        </IconButton>
        <IconButton label="Notifications" badge={5}>
          <Bell className="size-5" />
        </IconButton>
        <div className="ml-1 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm font-semibold ring-2 ring-background">
          SA
        </div>
      </div>
    </header>
  )
}
