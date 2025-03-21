"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Lightbulb, MapPin, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { CollaboratorInput } from "@/components/collaborator-input"
import { AiRecommendations } from "@/components/ai-recommendations"
import { ExpenseSplitter } from "@/components/expense-splitter"
import { PrivacySettings } from "@/components/privacy-settings"
import { GradientCard } from "@/components/ui-gradient-card"

export default function CreatePage() {
  const [type, setType] = useState<"event" | "trip">("event")
  const [activities, setActivities] = useState([{ id: 1, time: "", title: "", location: "", description: "" }])
  const [showAiRecommendations, setShowAiRecommendations] = useState(false)

  const addActivity = () => {
    const newId = activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1
    setActivities([...activities, { id: newId, time: "", title: "", location: "", description: "" }])
  }

  const removeActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  return (
    <div className="container px-4 py-6 md:py-10">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New</h1>

        <GradientCard className="mb-8">
          <CardHeader>
            <CardTitle>What are you creating?</CardTitle>
            <CardDescription>Choose the type of plan you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="event"
              className="grid grid-cols-2 gap-4"
              onValueChange={(value) => setType(value as "event" | "trip")}
            >
              <div>
                <RadioGroupItem value="event" id="event" className="peer sr-only" />
                <Label
                  htmlFor="event"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 [&:has([data-state=checked])]:border-purple-500"
                >
                  <div className="mb-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 p-2">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Single Event</p>
                    <p className="text-sm text-muted-foreground">Party, concert, dinner, etc.</p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="trip" id="trip" className="peer sr-only" />
                <Label
                  htmlFor="trip"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                >
                  <div className="mb-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 p-2">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Multi-Day Trip</p>
                    <p className="text-sm text-muted-foreground">Travel, vacation, weekend getaway</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </GradientCard>

        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activities">{type === "trip" ? "Stops" : "Activities"}</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
                <CardDescription>Set the main information for your {type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder={type === "event" ? "Birthday Party" : "Weekend in NYC"} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center border rounded-md">
                    <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Enter location" className="border-0" />
                  </div>
                </div>

                {type === "event" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="flex items-center border rounded-md">
                        <Clock className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input id="time" placeholder="7:00 PM" className="border-0" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <DatePicker />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder={type === "event" ? "Details about your event" : "What's this trip all about?"}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                    <p className="text-xs text-muted-foreground">Recommended size: 1200 x 800 pixels</p>
                  </div>
                </div>
              </CardContent>
            </GradientCard>

            <div className="flex justify-end">
              <Button
                onClick={() => setShowAiRecommendations(true)}
                variant="outline"
                className="mr-2 btn-sunset-light"
              >
                <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
                Get AI Recommendations
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{type === "event" ? "Event Schedule" : "Trip Stops"}</CardTitle>
                  <CardDescription>
                    {type === "event" ? "Add activities to your event schedule" : "Plan your stops day by day"}
                  </CardDescription>
                </div>
                <Button onClick={addActivity} variant="outline" size="sm" className="bg-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add {type === "trip" ? "Stop" : "Activity"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {type === "trip" && (
                  <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm text-blue-700">
                      Pro tip: Organize your activities by day to create a clear itinerary
                    </p>
                  </div>
                )}

                {activities.map((activity, index) => (
                  <div key={activity.id} className="space-y-4 p-4 border rounded-lg relative bg-white shadow-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeActivity(activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    {type === "trip" && (
                      <div className="space-y-2">
                        <Label>Day</Label>
                        <select className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background">
                          <option value="">Select day...</option>
                          <option value="Day 1">Day 1</option>
                          <option value="Day 2">Day 2</option>
                          <option value="Day 3">Day 3</option>
                          <option value="Day 4">Day 4</option>
                          <option value="Day 5">Day 5</option>
                          <option value="Any day">Any day</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{type === "trip" ? "Stop Name" : "Activity Name"}</Label>
                        <Input placeholder={type === "trip" ? "Visit Museum" : "Dinner at Restaurant"} />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <div className="flex items-center border rounded-md">
                          <Clock className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="7:00 PM" className="border-0" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <div className="flex items-center border rounded-md">
                        <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter location" className="border-0" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Details about this activity..." />
                    </div>

                    <div className="flex items-center">
                      <Label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="h-4 w-4 rounded border border-primary mr-2 peer-checked:bg-primary peer-checked:text-primary-foreground" />
                        <span>Require RSVP for this activity</span>
                      </Label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </GradientCard>
          </TabsContent>

          <TabsContent value="people" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Invite People</CardTitle>
                <CardDescription>Add friends to collaborate or invite guests</CardDescription>
              </CardHeader>
              <CardContent>
                <CollaboratorInput />
              </CardContent>
            </GradientCard>

            <GradientCard>
              <CardHeader>
                <CardTitle>Expense Splitting</CardTitle>
                <CardDescription>Set up payment options for shared expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseSplitter />
              </CardContent>
            </GradientCard>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see and join your {type}</CardDescription>
              </CardHeader>
              <CardContent>
                <PrivacySettings />
              </CardContent>
            </GradientCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="bg-white">
            Save as Draft
          </Button>
          <Button className="btn-sunset">Publish {type === "event" ? "Event" : "Trip"}</Button>
        </div>
      </div>

      <AiRecommendations open={showAiRecommendations} onOpenChange={setShowAiRecommendations} type={type} />
    </div>
  )
}

