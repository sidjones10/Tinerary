import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

export async function authMiddleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient(req)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/app") || req.nextUrl.pathname.startsWith("/api/protected")

  if (!session && isProtectedRoute) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If session and trying to access auth route
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/app", req.url))
  }

  return res
}

