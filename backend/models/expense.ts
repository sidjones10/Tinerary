import { createClient } from "@/utils/supabase/server"
import type { Database } from "@/types/supabase"

export type Expense = Database["public"]["Tables"]["expenses"]["Row"]
export type ExpenseInsert = Database["public"]["Tables"]["expenses"]["Insert"]
export type ExpenseUpdate = Database["public"]["Tables"]["expenses"]["Update"]

export async function getExpensesByItineraryId(itineraryId: string): Promise<Expense[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("itinerary_id", itineraryId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching expenses:", error)
    return []
  }

  return data || []
}

export async function createExpense(expense: ExpenseInsert): Promise<Expense | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("expenses").insert(expense).select().single()

  if (error) {
    console.error("Error creating expense:", error)
    return null
  }

  return data
}

export async function updateExpense(expenseId: string, updates: ExpenseUpdate): Promise<Expense | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("expenses").update(updates).eq("id", expenseId).select().single()

  if (error) {
    console.error("Error updating expense:", error)
    return null
  }

  return data
}

export async function deleteExpense(expenseId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("expenses").delete().eq("id", expenseId)

  if (error) {
    console.error("Error deleting expense:", error)
    return false
  }

  return true
}

