import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory rate limiter
// In production, you'd use Redis or another distributed store
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

export function rateLimit(limit = 100, windowMs = 60000) {
  return (req: NextRequest) => {
    const ip = req.ip || "unknown"
    const now = Date.now()

    // Initialize or reset if window has passed
    if (!ipRequests[ip] || now > ipRequests[ip].resetTime) {
      ipRequests[ip] = {
        count: 1,
        resetTime: now + windowMs,
      }
      return NextResponse.next()
    }

    // Increment request count
    ipRequests[ip].count++

    // Check if over limit
    if (ipRequests[ip].count > limit) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
    }

    return NextResponse.next()
  }
}

