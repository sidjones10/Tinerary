"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, MapPin, MessageSquare, Share, ThumbsUp, Check, Plus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RsvpModal } from "@/components/rsvp-modal"
import { ItineraryRsvpModal } from "@/components/itinerary-rsvp-modal"
import { PromoteItineraryModal } from "@/components/promote-itinerary-modal"
import { Input } from "@/components/ui/input"

export default function ItineraryPage({ params }: { params: { id: string } }) {
  const [showRsvpModal, setShowRsvpModal] = useState(false)
  const [showItineraryRsvpModal, setShowItineraryRsvpModal] = useState(false)
  const [showPromoteModal, setShowPromoteModal] = useState(false)
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null)

  // Sample data - in a real app, this would come from a database
  const itinerary = {
    id: params.id,
    title: "Weekend in NYC",
    date: "Mar 15-17, 2025",
    description:
      "Exploring the best of New York City with friends! We'll visit museums, try local restaurants, and catch a Broadway show.",
    image: "/placeholder.svg?height=300&width=800",
    activities: [
      {
        id: 1,
        day: "Day 1",
        date: "Mar 15, 2025",
        items: [
          {
            id: 101,
            time: "10:00 AM",
            title: "Brunch at Sarabeth's",
            location: "Central Park South",
            description: "Meet up for brunch to start our NYC adventure!",
            rsvp: { yes: 4, no: 1, maybe: 2 },
          },
          {
            id: 102,
            time: "1:00 PM",
            title: "Metropolitan Museum of Art",
            location: "5th Avenue",
            description: "Explore one of the world's greatest art museums.",
            rsvp: { yes: 5, no: 0, maybe: 2 },
          },
          {
            id: 103,
            time: "7:00 PM",
            title: "Dinner at Carbone",
            location: "Greenwich Village",
            description: "Famous Italian restaurant with amazing pasta.",
            rsvp: { yes: 6, no: 1, maybe: 0 },
          },
        ],
      },
      {
        id: 2,
        day: "Day 2",
        date: "Mar 16, 2025",
        items: [
          {
            id: 201,
            time: "9:00 AM",
            title: "Walk the High Line",
            location: "Chelsea",
            description: "Scenic elevated park built on a historic freight rail line.",
            rsvp: { yes: 3, no: 2, maybe: 2 },
          },
          {
            id: 202,
            time: "12:00 PM",
            title: "Chelsea Market Lunch",
            location: "Chelsea",
            description: "Food hall with lots of great options.",
            rsvp: { yes: 5, no: 0, maybe: 2 },
          },
          {
            id: 203,
            time: "8:00 PM",
            title: "Broadway Show",
            location: "Times Square",
            description: "Hamilton at Richard Rodgers Theatre.",
            rsvp: { yes: 7, no: 0, maybe: 0 },
          },
        ],
      },
    ],
    collaborators: [
      { name: "Alex Rodriguez", email: "alex@example.com", status: "accepted" },
      { name: "Taylor Moore", email: "taylor@example.com", status: "accepted" },
      { name: "Jordan Davis", email: "jordan@example.com", status: "pending" },
      { name: "Casey Kim", email: "casey@example.com", status: "accepted" },
    ],
  }

  const handleActivityRsvp = (activityId: number) => {
    setSelectedActivityId(activityId)
    setShowRsvpModal(true)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Itineraries
          </Link>

          <div className="relative rounded-xl overflow-hidden h-48 md:h-64 mb-6">
            <img
              src={itinerary.image || "/placeholder.svg"}
              alt={itinerary.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{itinerary.title}</h1>
                  <div className="flex items-center text-white/80 text-sm mt-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    {itinerary.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    onClick={() => setShowPromoteModal(true)}
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Promote
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="itinerary">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>About This Trip</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowItineraryRsvpModal(true)}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 border-none"
                >
                  RSVP to All Activities
                </Button>
              </CardHeader>
              <CardContent>
                <p>{itinerary.description}</p>
              </CardContent>
            </Card>

            {itinerary.activities.map((day) => (
              <div key={day.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-semibold">
                    {day.day} - {day.date}
                  </h2>
                </div>

                <div className="ml-4 pl-4 border-l-2 border-muted space-y-4">
                  {day.items.map((activity) => (
                    <Card key={activity.id} className="relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{activity.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Clock className="mr-2 h-4 w-4" />
                              {activity.time}
                              <span className="mx-2">•</span>
                              <MapPin className="mr-2 h-4 w-4" />
                              {activity.location}
                            </CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleActivityRsvp(activity.id)}>
                            RSVP
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{activity.description}</p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <ThumbsUp className="mr-1 h-4 w-4 text-emerald-500" />
                              <span>{activity.rsvp.yes} going</span>
                            </div>
                            {activity.rsvp.maybe > 0 && (
                              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                                {activity.rsvp.maybe} maybe
                              </Badge>
                            )}
                          </div>
                          <div className="flex -space-x-2">
                            {Array.from({ length: Math.min(3, activity.rsvp.yes) }).map((_, i) => (
                              <Avatar key={i} className="border-2 border-background h-6 w-6">
                                <AvatarFallback className="text-xs bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                                  {["AR", "TM", "CK"][i]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {activity.rsvp.yes > 3 && (
                              <Avatar className="border-2 border-background h-6 w-6">
                                <AvatarFallback className="text-xs bg-muted">+{activity.rsvp.yes - 3}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="collaborators">
            <Card>
              <CardHeader>
                <CardTitle>Trip Squad</CardTitle>
                <CardDescription>People collaborating on this itinerary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itinerary.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                            {collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{collaborator.name}</p>
                          <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                        </div>
                      </div>
                      {collaborator.status === "pending" ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-emerald-500 border-emerald-200 bg-emerald-50">
                          <Check className="mr-1 h-3 w-3" />
                          Joined
                        </Badge>
                      )}
                    </div>
                  ))}

                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite More Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion">
            <Card>
              <CardHeader>
                <CardTitle>Trip Discussion</CardTitle>
                <CardDescription>Chat with your squad about trip details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                        AR
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">Alex Rodriguez</p>
                          <span className="text-xs text-muted-foreground">10:23 AM</span>
                        </div>
                        <p className="text-sm">
                          Hey everyone! I'm so excited for our NYC trip! Does anyone have preferences for the Broadway
                          show?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                        TM
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">Taylor Moore</p>
                          <span className="text-xs text-muted-foreground">10:45 AM</span>
                        </div>
                        <p className="text-sm">I'd love to see Hamilton! I've been wanting to see it forever.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                        CK
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">Casey Kim</p>
                          <span className="text-xs text-muted-foreground">11:02 AM</span>
                        </div>
                        <p className="text-sm">
                          Hamilton sounds great! Also, for the museum day, can we add MoMA to the itinerary? It's one of
                          my favorites.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 relative">
                    <Input placeholder="Type your message..." className="pr-10" />
                    <Button size="icon" className="absolute right-1 top-1 h-6 w-6 rounded-full">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Activity RSVP Modal */}
      <RsvpModal open={showRsvpModal} onOpenChange={setShowRsvpModal} />

      {/* Itinerary RSVP Modal */}
      <ItineraryRsvpModal
        open={showItineraryRsvpModal}
        onOpenChange={setShowItineraryRsvpModal}
        itineraryId={itinerary.id}
        userId="current-user-id" // In a real app, this would be the actual user ID
        itineraryTitle={itinerary.title}
      />

      {/* Promote Itinerary Modal */}
      <PromoteItineraryModal
        open={showPromoteModal}
        onOpenChange={setShowPromoteModal}
        itinerary={itinerary}
        userId="current-user-id" // In a real app, this would be the actual user ID
      />
    </main>
  )
}

