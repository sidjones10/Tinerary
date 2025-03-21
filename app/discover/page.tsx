"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppHeader } from "@/components/app-header"

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1 bg-background">
        <div className="container px-4 py-6 md:py-10">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">Discover</h1>
              <p className="text-muted-foreground">Find inspiration for your next adventure</p>
            </div>

            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search destinations..."
                className="pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="py-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
              <p className="text-muted-foreground mb-6">
                We're working on an exciting new discovery feature to help you find amazing travel experiences. Stay
                tuned for updates!
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0"
              >
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

