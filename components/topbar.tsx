"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  Menu,
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
  Box,
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

export function Topbar() {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
            <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Box className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-accent-foreground">ToolBox</p>
              <p className="text-[11px] text-sidebar-foreground/70">by Western Premium</p>
            </div>
          </div>
          <nav className="p-3">
            <ul className="flex flex-col gap-0.5">
              {mobileNav.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                      )}
                    >
                      <Icon className="size-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="relative hidden sm:block w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search RFQs, quotes, orders, buyers..."
          className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/inbox"
          className="hidden lg:inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <Inbox className="size-4" />
          Process Inbox
        </Link>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          SA
        </div>
      </div>
    </header>
  )
}
