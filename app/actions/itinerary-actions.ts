"use server"

import { revalidatePath } from "next/cache"
import { ItineraryAPI, ActivityAPI } from "@/lib/api-client-crud"
import type {
  CreateItineraryInput,
  UpdateItineraryInput,
  CreateActivityInput,
  UpdateActivityInput,
} from "@/lib/api-client-crud"

// Itinerary actions
export async function createItinerary(formData: FormData) {
  try {
    const data: CreateItineraryInput = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
      location: formData.get("location") as string,
      cover_image_url: (formData.get("cover_image_url") as string) || undefined,
      is_public: formData.get("is_public") === "true",
      is_template: formData.get("is_template") === "true",
    }

    const itinerary = await ItineraryAPI.create(data)
    revalidatePath("/itinerary")
    return { success: true, data: itinerary }
  } catch (error) {
    console.error("Error creating itinerary:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateItinerary(id: string, formData: FormData) {
  try {
    const data: UpdateItineraryInput = {
      title: (formData.get("title") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      start_date: (formData.get("start_date") as string) || undefined,
      end_date: (formData.get("end_date") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      cover_image_url: (formData.get("cover_image_url") as string) || undefined,
      is_public: formData.get("is_public") === "true" || undefined,
      is_template: formData.get("is_template") === "true" || undefined,
    }

    const itinerary = await ItineraryAPI.update(id, data)
    revalidatePath(`/itinerary/${id}`)
    return { success: true, data: itinerary }
  } catch (error) {
    console.error("Error updating itinerary:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteItinerary(id: string) {
  try {
    await ItineraryAPI.delete(id)
    revalidatePath("/itinerary")
    return { success: true }
  } catch (error) {
    console.error("Error deleting itinerary:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function rsvpToItinerary(itineraryId: string, response: "yes" | "no" | "maybe") {
  try {
    const rsvp = await ItineraryAPI.rsvp(itineraryId, response)
    revalidatePath(`/itinerary/${itineraryId}`)
    return { success: true, data: rsvp }
  } catch (error) {
    console.error("Error RSVPing to itinerary:", error)
    return { success: false, error: (error as Error).message }
  }
}

// Activity actions
export async function createActivity(formData: FormData) {
  try {
    const data: CreateActivityInput = {
      itinerary_id: formData.get("itinerary_id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      category: formData.get("category") as string,
      cost: formData.get("cost") ? Number.parseFloat(formData.get("cost") as string) : undefined,
      currency: (formData.get("currency") as string) || undefined,
      booking_url: (formData.get("booking_url") as string) || undefined,
      image_url: (formData.get("image_url") as string) || undefined,
    }

    const activity = await ActivityAPI.create(data)
    revalidatePath(`/itinerary/${data.itinerary_id}`)
    return { success: true, data: activity }
  } catch (error) {
    console.error("Error creating activity:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function updateActivity(id: string, formData: FormData) {
  try {
    const itineraryId = formData.get("itinerary_id") as string

    const data: UpdateActivityInput = {
      title: (formData.get("title") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      start_time: (formData.get("start_time") as string) || undefined,
      end_time: (formData.get("end_time") as string) || undefined,
      category: (formData.get("category") as string) || undefined,
      cost: formData.get("cost") ? Number.parseFloat(formData.get("cost") as string) : undefined,
      currency: (formData.get("currency") as string) || undefined,
      booking_url: (formData.get("booking_url") as string) || undefined,
      image_url: (formData.get("image_url") as string) || undefined,
    }

    const activity = await ActivityAPI.update(id, data)
    revalidatePath(`/itinerary/${itineraryId}`)
    return { success: true, data: activity }
  } catch (error) {
    console.error("Error updating activity:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function deleteActivity(id: string, itineraryId: string) {
  try {
    await ActivityAPI.delete(id)
    revalidatePath(`/itinerary/${itineraryId}`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting activity:", error)
    return { success: false, error: (error as Error).message }
  }
}

