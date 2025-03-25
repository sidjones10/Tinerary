import { createClient } from "@/utils/supabase/server"

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  created_at: string
}

export async function sendNotification(
  userId: string,
  notification: Omit<Notification, "id" | "user_id" | "read" | "created_at">,
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error sending notification:", error)
    return { error: error.message }
  }

  return { success: true, notification: data }
}

export async function getUserNotifications(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notifications:", error)
    return []
  }

  return data || []
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

  if (error) {
    console.error("Error marking notification as read:", error)
    return { error: error.message }
  }

  return { success: true }
}

export async function deleteNotification(notificationId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("notifications").delete().eq("id", notificationId)

  if (error) {
    console.error("Error deleting notification:", error)
    return { error: error.message }
  }

  return { success: true }
}

