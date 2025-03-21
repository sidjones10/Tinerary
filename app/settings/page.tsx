"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bell,
  CreditCard,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Palette,
  Phone,
  Shield,
  User,
  Smartphone,
  Mail,
  Languages,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppHeader } from "@/components/app-header"
import { PhoneVerification } from "@/components/phone-verification"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Toggle dark class on document element
    if (darkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className={`flex min-h-screen flex-col ${darkMode ? "dark" : ""}`}>
      <AppHeader />

      <main className="flex-1 bg-background">
        <div className="container px-4 py-6 md:py-10">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-64 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center space-y-3 pb-4">
                    <Avatar className="h-20 w-20 mt-2">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="@user" />
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white text-xl">
                        JC
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-medium text-lg">Jessica Chen</h3>
                      <p className="text-sm text-muted-foreground">@jesschen</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>

                  <Separator className="my-2" />

                  <nav className="flex flex-col space-y-1 mt-2">
                    <Button
                      variant={activeTab === "profile" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "account" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("account")}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                    <Button
                      variant={activeTab === "notifications" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button
                      variant={activeTab === "appearance" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("appearance")}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Appearance
                    </Button>
                    <Button
                      variant={activeTab === "privacy" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("privacy")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Privacy
                    </Button>
                    <Button
                      variant={activeTab === "payment" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment
                    </Button>
                    <Button
                      variant={activeTab === "language" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("language")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Language & Region
                    </Button>
                    <Button
                      variant={activeTab === "help" ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => setActiveTab("help")}
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </Button>
                  </nav>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information and public profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" defaultValue="Jessica Chen" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="jesschen" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about yourself"
                          defaultValue="Travel enthusiast and foodie. Always planning my next adventure!"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Los Angeles, CA" />
                      </div>

                      <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="@user" />
                            <AvatarFallback className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 text-white text-xl">
                              JC
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              Change
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Social Profiles</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                            <Input defaultValue="@jesschen" />
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                            </svg>
                            <Input defaultValue="@jesschen_travels" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "account" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account credentials and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex items-center border rounded-md">
                              <Phone className="ml-3 h-4 w-4 text-muted-foreground" />
                              <Input defaultValue="+1 (555) 123-4567" className="border-0" />
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => setShowPhoneVerification(true)}>
                            Verify
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your primary login method. We'll send verification codes to this number.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <div className="flex items-center border rounded-md">
                              <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                              <Input defaultValue="jessica.chen@example.com" className="border-0" />
                            </div>
                          </div>
                          <Button variant="outline">Verify</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Secondary login method and for important notifications.
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <p className="text-sm text-amber-800">
                          <strong>Password requirements:</strong> At least 8 characters, including a number, uppercase
                          letter, and special character.
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Two-Factor Authentication</Label>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Authentication</p>
                            <p className="text-sm text-muted-foreground">Receive a code via SMS when logging in</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Connected Accounts</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <svg className="h-6 w-6 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                              </svg>
                              <div>
                                <p className="font-medium">Google</p>
                                <p className="text-sm text-muted-foreground">Connected</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <svg className="h-6 w-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                              <div>
                                <p className="font-medium">Facebook</p>
                                <p className="text-sm text-muted-foreground">Not connected</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Notification Channels</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Push Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Trip & Event Notifications</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Trip Reminders</p>
                              <p className="text-sm text-muted-foreground">Reminders about upcoming trips</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Activity Alerts</p>
                              <p className="text-sm text-muted-foreground">Alerts about activities during your trip</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Itinerary Changes</p>
                              <p className="text-sm text-muted-foreground">
                                Notifications when itineraries are updated
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Social Notifications</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">New Followers</p>
                              <p className="text-sm text-muted-foreground">When someone follows you</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Likes & Comments</p>
                              <p className="text-sm text-muted-foreground">
                                When someone likes or comments on your itineraries
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Mentions</p>
                              <p className="text-sm text-muted-foreground">When someone mentions you</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Marketing Notifications</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Special Deals</p>
                              <p className="text-sm text-muted-foreground">
                                Notifications about special deals and promotions
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Product Updates</p>
                              <p className="text-sm text-muted-foreground">
                                Updates about new features and improvements
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Newsletter</p>
                              <p className="text-sm text-muted-foreground">
                                Monthly newsletter with travel tips and inspiration
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "appearance" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize how Tinerary looks for you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer ${!darkMode ? "border-orange-500" : "border-transparent"}`}
                            onClick={() => toggleDarkMode()}
                          >
                            <div className="absolute inset-0 bg-white">
                              <div className="h-2 bg-gray-200 m-2 rounded"></div>
                              <div className="h-3 bg-gray-200 mx-2 rounded"></div>
                              <div className="h-2 bg-gray-200 m-2 rounded"></div>
                            </div>
                            <div className="absolute bottom-2 left-2 text-xs font-medium">Light</div>
                            {!darkMode && (
                              <div className="absolute bottom-2 right-2 text-orange-500">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>

                          <div
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer ${darkMode ? "border-orange-500" : "border-transparent"}`}
                            onClick={() => toggleDarkMode()}
                          >
                            <div className="absolute inset-0 bg-gray-900">
                              <div className="h-2 bg-gray-700 m-2 rounded"></div>
                              <div className="h-3 bg-gray-700 mx-2 rounded"></div>
                              <div className="h-2 bg-gray-700 m-2 rounded"></div>
                            </div>
                            <div className="absolute bottom-2 left-2 text-xs font-medium text-white">Dark</div>
                            {darkMode && (
                              <div className="absolute bottom-2 right-2 text-orange-500">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>

                          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                              <div className="h-2 bg-white/20 m-2 rounded"></div>
                              <div className="h-3 bg-white/20 mx-2 rounded"></div>
                              <div className="h-2 bg-white/20 m-2 rounded"></div>
                            </div>
                            <div className="absolute bottom-2 left-2 text-xs font-medium text-white">System</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Color Theme</Label>
                        <RadioGroup defaultValue="sunset" className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div>
                            <RadioGroupItem value="sunset" id="sunset" className="peer sr-only" />
                            <Label
                              htmlFor="sunset"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <div className="mb-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 h-6 w-6"></div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Sunset</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="ocean" id="ocean" className="peer sr-only" />
                            <Label
                              htmlFor="ocean"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                            >
                              <div className="mb-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 h-6 w-6"></div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Ocean</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="forest" id="forest" className="peer sr-only" />
                            <Label
                              htmlFor="forest"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 [&:has([data-state=checked])]:border-green-500"
                            >
                              <div className="mb-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-300 h-6 w-6"></div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Forest</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="lavender" id="lavender" className="peer sr-only" />
                            <Label
                              htmlFor="lavender"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 [&:has([data-state=checked])]:border-purple-500"
                            >
                              <div className="mb-3 rounded-full bg-gradient-to-r from-purple-400 to-violet-300 h-6 w-6"></div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Lavender</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-2">
                          <div>
                            <RadioGroupItem value="small" id="small" className="peer sr-only" />
                            <Label
                              htmlFor="small"
                              className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <span className="text-sm">Small</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                            <Label
                              htmlFor="medium"
                              className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <span className="text-base">Medium</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="large" id="large" className="peer sr-only" />
                            <Label
                              htmlFor="large"
                              className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <span className="text-lg">Large</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Home Screen Layout</Label>
                        <RadioGroup defaultValue="grid" className="grid grid-cols-2 gap-2">
                          <div>
                            <RadioGroupItem value="grid" id="grid" className="peer sr-only" />
                            <Label
                              htmlFor="grid"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <div className="mb-3 grid grid-cols-2 gap-1">
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Grid</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="list" id="list" className="peer sr-only" />
                            <Label
                              htmlFor="list"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500"
                            >
                              <div className="mb-3 flex flex-col gap-1">
                                <div className="h-2 w-10 bg-gray-200 rounded"></div>
                                <div className="h-2 w-10 bg-gray-200 rounded"></div>
                                <div className="h-2 w-10 bg-gray-200 rounded"></div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">List</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "privacy" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your privacy and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Profile Privacy</Label>
                        <RadioGroup defaultValue="public">
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="public" id="public-profile" />
                            <Label htmlFor="public-profile" className="flex-1 cursor-pointer">
                              <div className="font-medium">Public</div>
                              <div className="text-sm text-muted-foreground">
                                Anyone can view your profile and itineraries
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="followers" id="followers-profile" />
                            <Label htmlFor="followers-profile" className="flex-1 cursor-pointer">
                              <div className="font-medium">Followers Only</div>
                              <div className="text-sm text-muted-foreground">
                                Only people who follow you can view your profile and itineraries
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="private" id="private-profile" />
                            <Label htmlFor="private-profile" className="flex-1 cursor-pointer">
                              <div className="font-medium">Private</div>
                              <div className="text-sm text-muted-foreground">
                                Only you and people you specifically invite can view your itineraries
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Location Sharing</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Share Precise Location</p>
                              <p className="text-sm text-muted-foreground">
                                Allow others to see your exact location in itineraries
                              </p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Location History</p>
                              <p className="text-sm text-muted-foreground">
                                Save your location history for better recommendations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Activity Privacy</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Show Activity Status</p>
                              <p className="text-sm text-muted-foreground">
                                Let others see when you're active on Tinerary
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Read Receipts</p>
                              <p className="text-sm text-muted-foreground">
                                Let others know when you've read their messages
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Data & Personalization</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Personalized Recommendations</p>
                              <p className="text-sm text-muted-foreground">
                                Allow us to use your activity to personalize recommendations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Data Collection</p>
                              <p className="text-sm text-muted-foreground">
                                Allow us to collect usage data to improve our services
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                          <p className="text-sm text-blue-800">
                            Your privacy is important to us. Review our{" "}
                            <a href="#" className="underline font-medium">
                              Privacy Policy
                            </a>{" "}
                            to learn more about how we protect your data.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Privacy Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods and billing information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Saved Payment Methods</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center text-white text-xs font-bold">
                                VISA
                              </div>
                              <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 05/2025</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                Remove
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-14 bg-gradient-to-r from-red-600 to-orange-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                                MC
                              </div>
                              <div>
                                <p className="font-medium">Mastercard ending in 8888</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="mt-2">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Add Payment Method
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Billing Address</Label>
                        <div className="p-3 border rounded-md">
                          <p className="font-medium">Jessica Chen</p>
                          <p className="text-sm text-muted-foreground">123 Main Street</p>
                          <p className="text-sm text-muted-foreground">Apt 4B</p>
                          <p className="text-sm text-muted-foreground">Los Angeles, CA 90001</p>
                          <p className="text-sm text-muted-foreground">United States</p>

                          <Button variant="outline" size="sm" className="mt-2">
                            Edit Address
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Billing History</Label>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted/50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  Description
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  Amount
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-background divide-y divide-border">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">Mar 15, 2025</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">Premium Subscription</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">$9.99</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">Feb 15, 2025</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">Premium Subscription</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">$9.99</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "language" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>Customize language, region, and format preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="zh">中文</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                            <SelectItem value="ko">한국어</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="eu">European Union</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                            <SelectItem value="kr">South Korea</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="america_los_angeles">
                          <SelectTrigger>
                            <SelectValue placeholder="Select time zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america_los_angeles">Pacific Time (US & Canada)</SelectItem>
                            <SelectItem value="america_denver">Mountain Time (US & Canada)</SelectItem>
                            <SelectItem value="america_chicago">Central Time (US & Canada)</SelectItem>
                            <SelectItem value="america_new_york">Eastern Time (US & Canada)</SelectItem>
                            <SelectItem value="europe_london">London</SelectItem>
                            <SelectItem value="europe_paris">Paris</SelectItem>
                            <SelectItem value="asia_tokyo">Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Format Preferences</Label>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date-format">Date Format</Label>
                              <Select defaultValue="mdy">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                  <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="time-format">Time Format</Label>
                              <Select defaultValue="12h">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                                  <SelectItem value="24h">24-hour</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="currency">Currency</Label>
                              <Select defaultValue="usd">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="usd">USD ($)</SelectItem>
                                  <SelectItem value="eur">EUR (€)</SelectItem>
                                  <SelectItem value="gbp">GBP (£)</SelectItem>
                                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                                  <SelectItem value="cad">CAD (C$)</SelectItem>
                                  <SelectItem value="aud">AUD (A$)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="distance">Distance Unit</Label>
                              <Select defaultValue="miles">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select distance unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="miles">Miles</SelectItem>
                                  <SelectItem value="kilometers">Kilometers</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <Languages className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                          <p className="text-sm text-blue-800">
                            Language settings apply to the user interface only. Itinerary content will remain in its
                            original language.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="btn-sunset">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "help" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>Get help and learn more about Tinerary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Frequently Asked Questions</Label>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <p className="font-medium">How do I create a new itinerary?</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              To create a new itinerary, click the "Create New" button on the home page or in the
                              navigation menu.
                            </p>
                          </div>

                          <div className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <p className="font-medium">How do I invite friends to my itinerary?</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Open your itinerary and go to the "People" tab. Click "Invite More Friends" and enter
                              their email or phone number.
                            </p>
                          </div>

                          <div className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                            <p className="font-medium">How do I split expenses with my group?</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              In your itinerary, go to the "Expenses" tab. Add expenses and select how you want to split
                              them among your group.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Contact Support</Label>
                        <div className="p-4 border rounded-md">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Select defaultValue="general">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                  <SelectItem value="account">Account Issues</SelectItem>
                                  <SelectItem value="billing">Billing & Payments</SelectItem>
                                  <SelectItem value="technical">Technical Support</SelectItem>
                                  <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <textarea
                                id="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Describe your issue or question..."
                              ></textarea>
                            </div>

                            <Button className="w-full btn-sunset">Submit Request</Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Help Resources</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">User Guide</p>
                                <p className="text-sm text-muted-foreground">
                                  Learn how to use all features of Tinerary
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Community Forum</p>
                                <p className="text-sm text-muted-foreground">Connect with other travelers</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Video Tutorials</p>
                                <p className="text-sm text-muted-foreground">Watch step-by-step guides</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Travel Tips</p>
                                <p className="text-sm text-muted-foreground">Expert advice for better trips</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <PhoneVerification
        open={showPhoneVerification}
        onOpenChange={setShowPhoneVerification}
        phoneNumber="+1 (555) 123-4567"
      />
    </div>
  )
}

