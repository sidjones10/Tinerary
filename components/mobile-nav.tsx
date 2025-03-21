"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, Bell, Bookmark } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-5">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center ${
            isActive("/") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/discover"
          className={`flex flex-col items-center justify-center ${
            isActive("/discover") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Discover</span>
        </Link>

        <Link
          href="/create"
          className={`flex flex-col items-center justify-center ${
            isActive("/create") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Create</span>
        </Link>

        <Link
          href="/saved"
          className={`flex flex-col items-center justify-center ${
            isActive("/saved") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Bookmark className="h-5 w-5" />
          <span className="text-xs mt-1">Saved</span>
        </Link>

        <Link
          href="/notifications"
          className={`flex flex-col items-center justify-center ${
            isActive("/notifications") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
      </div>
    </div>
  )
}

