"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Globe, MapPin, Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { GradientCard } from "@/components/ui-gradient-card"
import { Slider } from "@/components/ui/slider"

export default function PromotePage() {
  const [promotionType, setPromotionType] = useState<"business" | "personal">("business")
  const [budget, setBudget] = useState(100)
  const [duration, setDuration] = useState(7)

  return (
    <div className="container px-4 py-6 md:py-10">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Promote on Tinerary</h1>
        <p className="text-muted-foreground mb-6">Get featured on the discover page and reach more travelers</p>

        <GradientCard className="mb-8">
          <CardHeader>
            <CardTitle>What are you promoting?</CardTitle>
            <CardDescription>Choose the type of promotion you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="business"
              className="grid grid-cols-2 gap-4"
              onValueChange={(value) => setPromotionType(value as "business" | "personal")}
            >
              <div>
                <RadioGroupItem value="business" id="business" className="peer sr-only" />
                <Label
                  htmlFor="business"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                >
                  <div className="mb-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 p-2">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Business</p>
                    <p className="text-sm text-muted-foreground">Restaurants, hotels, attractions, etc.</p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                <Label
                  htmlFor="personal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                >
                  <div className="mb-3 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 p-2">
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Personal</p>
                    <p className="text-sm text-muted-foreground">Itineraries, events, travel guides</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </GradientCard>

        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Promotion Details</CardTitle>
                <CardDescription>Tell us about what you're promoting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder={promotionType === "business" ? "Visit Our Restaurant" : "My NYC Travel Guide"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center border rounded-md">
                    <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Enter location" className="border-0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell travelers why they should check out your promotion"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Promotion Period</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Start Date</Label>
                      <DatePicker />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">End Date</Label>
                      <DatePicker />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website or Social Media</Label>
                  <div className="flex items-center border rounded-md">
                    <Globe className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input id="website" placeholder="https://your-website.com" className="border-0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">Promotion Image</Label>
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
          </TabsContent>

          <TabsContent value="targeting" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Audience Targeting</CardTitle>
                <CardDescription>Define who should see your promotion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <div className="flex items-center gap-4">
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="18">18</option>
                      <option value="21">21</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                    </select>
                    <span className="text-muted-foreground">to</span>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="24">24</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="65+">65+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="food" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="food" className="text-sm font-normal">
                        Food & Dining
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="nightlife" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="nightlife" className="text-sm font-normal">
                        Nightlife
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="culture" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="culture" className="text-sm font-normal">
                        Arts & Culture
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="outdoors" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="outdoors" className="text-sm font-normal">
                        Outdoors
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="shopping" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="shopping" className="text-sm font-normal">
                        Shopping
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="family" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="family" className="text-sm font-normal">
                        Family Friendly
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Geographic Targeting</Label>
                  <RadioGroup defaultValue="local">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <Label htmlFor="local" className="font-normal">
                        Local (within 25 miles)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regional" id="regional" />
                      <Label htmlFor="regional" className="font-normal">
                        Regional (within 100 miles)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="national" id="national" />
                      <Label htmlFor="national" className="font-normal">
                        National
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="font-normal">
                        International
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Target Travelers Who Are:</Label>
                  <RadioGroup defaultValue="planning">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="planning" id="planning" />
                      <Label htmlFor="planning" className="font-normal">
                        Planning a trip
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="currently" id="currently" />
                      <Label htmlFor="currently" className="font-normal">
                        Currently traveling
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="font-normal">
                        Both
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </GradientCard>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6 mt-6">
            <GradientCard>
              <CardHeader>
                <CardTitle>Budget & Duration</CardTitle>
                <CardDescription>Set your promotion budget and duration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Daily Budget</Label>
                  <div className="space-y-2">
                    <Slider
                      defaultValue={[budget]}
                      max={500}
                      min={20}
                      step={10}
                      onValueChange={(value) => setBudget(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">$20</span>
                      <span className="text-sm font-medium">${budget}</span>
                      <span className="text-sm text-muted-foreground">$500</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Higher budgets increase your visibility in the discover feed
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Promotion Duration</Label>
                  <div className="space-y-2">
                    <Slider
                      defaultValue={[duration]}
                      max={30}
                      min={1}
                      step={1}
                      onValueChange={(value) => setDuration(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">1 day</span>
                      <span className="text-sm font-medium">{duration} days</span>
                      <span className="text-sm text-muted-foreground">30 days</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Daily Budget:</span>
                    <span className="font-medium">${budget}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration:</span>
                    <span className="font-medium">{duration} days</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated Impressions:</span>
                    <span className="font-medium">{(budget * duration * 15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total Budget:</span>
                    <span className="font-bold">${budget * duration}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="flex items-center border rounded-md p-3">
                    <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Add Payment Method</span>
                  </div>
                </div>
              </CardContent>
            </GradientCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="bg-white">
            Save Draft
          </Button>
          <Button className="btn-sunset">Launch Promotion</Button>
        </div>
      </div>
    </div>
  )
}

