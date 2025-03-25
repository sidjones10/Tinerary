// Auth types

export type AuthUser = {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  role: "user" | "admin"
}

export type Session = {
  user: AuthUser
  expires_at: number
  access_token: string
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpData = {
  email: string
  password: string
  name?: string
}

export type ResetPasswordData = {
  token: string
  password: string
}

