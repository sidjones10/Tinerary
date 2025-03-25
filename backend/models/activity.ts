import { createClient } from "@/utils/supabase/server"
import type { Database } from "@/types/supabase"

export type Activity = Database["public"]["Tables"]["activities"]["Row"]
export type ActivityInsert = Database["public"]["Tables"]["activities"]["Insert"]
export type ActivityUpdate = Database["public"]["Tables"]["activities"]["Update"]

export async function getActivitiesByItineraryId(itineraryId: string): Promise<Activity[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("itinerary_id", itineraryId)
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching activities:", error)
    return []
  }

  return data || []
}

export async function createActivity(activity: ActivityInsert): Promise<Activity | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("activities").insert(activity).select().single()

  if (error) {
    console.error("Error creating activity:", error)
    return null
  }

  return data
}

export async function updateActivity(activityId: string, updates: ActivityUpdate): Promise<Activity | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("activities").update(updates).eq("id", activityId).select().single()

  if (error) {
    console.error("Error updating activity:", error)
    return null
  }

  return data
}

export async function deleteActivity(activityId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("activities").delete().eq("id", activityId)

  if (error) {
    console.error("Error deleting activity:", error)
    return false
  }

  return true
}

export async function getActivityById(activityId: string): Promise<Activity | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("activities").select("*").eq("id", activityId).single()

  if (error) {
    console.error("Error fetching activity:", error)
    return null
  }

  return data
}

