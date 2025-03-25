// Database model types

export type User = {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  role: "user" | "admin"
  preferences: UserPreferences | null
}

export type UserPreferences = {
  theme: "light" | "dark" | "system"
  notifications_enabled: boolean
  currency: string
  language: string
}

export type Itinerary = {
  id: string
  user_id: string
  title: string
  description: string | null
  start_date: string
  end_date: string
  location: string | null
  cover_image_url: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export type Activity = {
  id: string
  itinerary_id: string
  title: string
  description: string | null
  location: string | null
  start_time: string
  end_time: string | null
  type: "accommodation" | "transportation" | "food" | "attraction" | "other"
  cost: number | null
  currency: string | null
  booking_reference: string | null
  booking_url: string | null
  created_at: string
  updated_at: string
}

export type Expense = {
  id: string
  itinerary_id: string
  activity_id: string | null
  title: string
  amount: number
  currency: string
  date: string
  category: "accommodation" | "transportation" | "food" | "attraction" | "shopping" | "other"
  paid_by: string | null
  split_with: string[] | null
  created_at: string
  updated_at: string
}

export type ItineraryShare = {
  id: string
  itinerary_id: string
  user_id: string
  permission: "view" | "edit"
  created_at: string
  updated_at: string
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  created_at: string
  updated_at: string
}

