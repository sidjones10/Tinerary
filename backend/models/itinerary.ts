import { createClient } from "@/utils/supabase/server"
import type { Database } from "@/types/supabase"

export type Itinerary = Database["public"]["Tables"]["itineraries"]["Row"]
export type ItineraryInsert = Database["public"]["Tables"]["itineraries"]["Insert"]
export type ItineraryUpdate = Database["public"]["Tables"]["itineraries"]["Update"]

export async function getItineraryById(itineraryId: string): Promise<Itinerary | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("itineraries").select("*").eq("id", itineraryId).single()

  if (error) {
    console.error("Error fetching itinerary:", error)
    return null
  }

  return data
}

export async function getUserItineraries(userId: string): Promise<Itinerary[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("itineraries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user itineraries:", error)
    return []
  }

  return data || []
}

export async function createItinerary(itinerary: ItineraryInsert): Promise<Itinerary | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("itineraries").insert(itinerary).select().single()

  if (error) {
    console.error("Error creating itinerary:", error)
    return null
  }

  return data
}

export async function updateItinerary(itineraryId: string, updates: ItineraryUpdate): Promise<Itinerary | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("itineraries").update(updates).eq("id", itineraryId).select().single()

  if (error) {
    console.error("Error updating itinerary:", error)
    return null
  }

  return data
}

export async function deleteItinerary(itineraryId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("itineraries").delete().eq("id", itineraryId)

  if (error) {
    console.error("Error deleting itinerary:", error)
    return false
  }

  return true
}

export async function getSharedItineraries(userId: string): Promise<Itinerary[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("itinerary_shares").select("itinerary_id").eq("user_id", userId)

  if (error) {
    console.error("Error fetching shared itinerary IDs:", error)
    return []
  }

  if (!data || data.length === 0) {
    return []
  }

  const itineraryIds = data.map((share) => share.itinerary_id)

  const { data: itineraries, error: itinerariesError } = await supabase
    .from("itineraries")
    .select("*")
    .in("id", itineraryIds)
    .order("created_at", { ascending: false })

  if (itinerariesError) {
    console.error("Error fetching shared itineraries:", itinerariesError)
    return []
  }

  return itineraries || []
}

