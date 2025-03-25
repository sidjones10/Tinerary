"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone } from "lucide-react"
import { supabase } from "@/app/supabase/supabase-js" // Import your Supabase client


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhoneVerification } from "@/components/phone-verification"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number
    if (!phoneNumber.trim()) return

    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    })


    // Show OTP verification dialog
    if (error) {
      console.error("Error sending OTP:", error.message)
    } else {
    setShowPhoneVerification(true)
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email and password
    if (!email.trim() || !password.trim()) return

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // Handle email login
    
    if (error) {
      console.error("Error logging in:", error.message)
    } else {
    console.log("Email login:", email, password)

    // In a real app, you would call your API here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-orange-50 to-white">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Welcome to Tinerary</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue planning your adventures</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your preferred sign in method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-4">
                <form onSubmit={handlePhoneLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center border rounded-md">
                      <Phone className="ml-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="border-0"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">We'll send a verification code to this number</p>
                  </div>

                  <Button type="submit" className="w-full mt-4 btn-sunset">
                    Continue with Phone
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-4">
                <form onSubmit={handleEmailLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center border rounded-md">
                      <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="border-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full mt-4 btn-sunset">
                    Sign In with Email
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      <PhoneVerification
        open={showPhoneVerification}
        onOpenChange={setShowPhoneVerification}
        phoneNumber={phoneNumber || "+1 (555) 123-4567"}
      />
    </div>
  )
)
  }