import { createClient } from "@/utils/supabase/server"

export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    console.error("Error uploading file:", error)
    return { error: error.message }
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)

  return {
    success: true,
    path: data.path,
    url: publicUrl.publicUrl,
  }
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = createClient()

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    console.error("Error deleting file:", error)
    return { error: error.message }
  }

  return { success: true }
}

export async function getFileUrl(bucket: string, path: string) {
  const supabase = createClient()

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}

