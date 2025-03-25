import { createClient } from "@/utils/supabase/server"
import type { Database } from "@/types/supabase"

export type User = Database["public"]["Tables"]["users"]["Row"]
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"]
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"]

export async function getUserById(userId: string): Promise<User | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return data
}

export async function updateUser(userId: string, updates: UserUpdate): Promise<User | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user:", error)
    return null
  }

  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error) {
    console.error("Error fetching user by email:", error)
    return null
  }

  return data
}

