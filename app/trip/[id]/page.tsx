"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  MapPin,
  MessageSquare,
  Share2,
  ThumbsUp,
  Check,
  Plus,
  Users,
  Heart,
  Bookmark,
  ImageIcon,
  Briefcase,
  DollarSign,
  Palette,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GradientCard } from "@/components/ui-gradient-card"
import { ExpenseEstimator } from "@/components/expense-estimator"
import { TripPhotoGallery } from "@/components/trip-photo-gallery"
import { PackingList } from "@/components/packing-list"
import { ItineraryCustomizer } from "@/components/itinerary-customizer"
import { ItinerarySharingOptions } from "@/components/itinerary-sharing"

export default function TripPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const trip = {
    id: params.id,
    title: "Weekend in NYC",
    type: "trip",
    date: "Mar 15-17, 2025",
    image: "/placeholder.svg?height=300&width=800",
    location: "New York, NY",
    description:
      "Exploring the best of New York City with friends! We'll visit museums, try local restaurants, and catch a Broadway show.",
    likes: 24,
    saves: 8,
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
    expenses: [
      { name: "Hotel", amount: 1200, paidBy: "Alex Rodriguez", splitBetween: 4 },
      { name: "Broadway Tickets", amount: 800, paidBy: "You", splitBetween: 4 },
      { name: "Dinner at Carbone", amount: 450, paidBy: "Taylor Moore", splitBetween: 6 },
    ],
  }

  const [activeTab, setActiveTab] = useState("itinerary")
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="container px-4 py-6 md:py-10">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="relative rounded-xl overflow-hidden h-48 md:h-64 mb-6">
        <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-blue-400 to-cyan-300 border-0">Trip</Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{trip.title}</h1>
              <div className="flex items-center text-white/80 text-sm mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {trip.location}
                <span className="mx-1">•</span>
                <Calendar className="mr-1 h-4 w-4" />
                {trip.date}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => setSaved(!saved)}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-white" : ""}`} />
                {saved ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-white" : ""}`} />
                {trip.likes + (liked ? 1 : 0)}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="packing">Packing</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="mt-6 space-y-6">
              <GradientCard>
                <CardHeader>
                  <CardTitle>About This Trip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{trip.description}</p>
                </CardContent>
              </GradientCard>

              {trip.activities.map((day) => (
                <div key={day.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 flex items-center justify-center text-white">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      {day.day} - {day.date}
                    </h2>
                  </div>

                  <div className="ml-4 pl-4 border-l-2 border-muted space-y-4">
                    {day.items.map((activity) => (
                      <GradientCard key={activity.id}>
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
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-orange-400/10 hover:from-violet-500/20 hover:via-pink-500/20 hover:to-orange-400/20"
                            >
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
                                  <AvatarFallback className="text-xs bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
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
                      </GradientCard>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="expenses" className="mt-6 space-y-6">
              <ExpenseEstimator />

              <GradientCard>
                <CardHeader>
                  <CardTitle>Trip Expenses</CardTitle>
                  <CardDescription>Track and split costs with your group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trip.expenses.map((expense, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{expense.name}</p>
                          <p className="text-sm text-muted-foreground">Paid by {expense.paidBy}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${expense.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(expense.amount / expense.splitBetween).toFixed(2)} per person
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center p-3 border-t">
                      <p className="font-medium">Total</p>
                      <p className="font-medium">${trip.expenses.reduce((sum, expense) => sum + expense.amount, 0)}</p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 hover:from-violet-600 hover:via-pink-600 hover:to-orange-500 text-white border-0">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </div>
                </CardContent>
              </GradientCard>
            </TabsContent>

            <TabsContent value="photos" className="mt-6 space-y-6">
              <TripPhotoGallery />
            </TabsContent>

            <TabsContent value="packing" className="mt-6 space-y-6">
              <PackingList />
            </TabsContent>

            <TabsContent value="people" className="mt-6 space-y-6">
              <GradientCard>
                <CardHeader>
                  <CardTitle>Trip Squad</CardTitle>
                  <CardDescription>People collaborating on this trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trip.collaborators.map((collaborator, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
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
              </GradientCard>

              <ItinerarySharingOptions />
            </TabsContent>

            <TabsContent value="discussion" className="mt-6 space-y-6">
              <GradientCard>
                <CardHeader>
                  <CardTitle>Trip Discussion</CardTitle>
                  <CardDescription>Chat with your squad about trip details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
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
                        <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
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
                  </div>

                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
                        ME
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Input placeholder="Type your message..." className="pr-10" />
                      <Button
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </GradientCard>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <GradientCard>
            <CardHeader>
              <CardTitle>Trip Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white">
                    AR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alex Rodriguez</p>
                  <p className="text-sm text-muted-foreground">@alexr</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Follow
              </Button>
            </CardContent>
          </GradientCard>

          <GradientCard>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Trip
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit Trip
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Guests
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ImageIcon className="mr-2 h-4 w-4" />
                Add Photos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                Update Packing List
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Add Expenses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Palette className="mr-2 h-4 w-4" />
                Customize Design
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gradient bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Clone Trip
              </Button>
            </CardContent>
          </GradientCard>

          <ItineraryCustomizer />
        </div>
      </div>
    </div>
  )
}

