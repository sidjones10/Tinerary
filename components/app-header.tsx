"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileNav } from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

export function AppHeader() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/40 supports-[backdrop-filter]:bg-white/20">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-gray-800">Tinerary</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            {/* <Link href="/explore" className="transition-colors hover:text-foreground/80">
              Explore
            </Link> */}
            <Link href="/saved" className="transition-colors hover:text-foreground/80">
              Saved
            </Link>
            <Link href="/notifications" className="transition-colors hover:text-foreground/80">
              Notifications
            </Link>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden bg-white/50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center md:hidden">
          <span className="font-bold text-xl text-gray-800">Tinerary</span>
        </Link>

        <div className={cn("flex items-center ml-auto", showSearch ? "w-full md:w-auto justify-between" : "")}>
          {showSearch ? (
            <>
              <div className="relative w-full md:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events, places..."
                  className="w-full pl-8 md:w-[300px] rounded-full bg-white/70"
                />
              </div>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearch(false)}>
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

