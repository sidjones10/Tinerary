import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalFeed } from "@/components/personal-feed"
import { DiscoveryFeed } from "@/components/discovery-feed"
import { AppHeader } from "@/components/app-header"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1">
        <div className="container px-4 py-6 md:py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">Your Feed</h1>
            <Link href="/create">
              <Button className="btn-sunset">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="for-you" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you" className="mt-6">
              <PersonalFeed />
            </TabsContent>
            <TabsContent value="discover" className="mt-6">
              <DiscoveryFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

