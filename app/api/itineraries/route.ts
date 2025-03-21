import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Create Itinerary
export async function POST(req: Request) {
  try {
    const { userId, title, description, startDate, endDate } = await req.json();

    const { data, error } = await supabase
      .from("itineraries")
      .insert([{ userId, title, description, startDate, endDate }]);

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// ✅ Get All Itineraries
export async function GET() {
  try {
    const { data, error } = await supabase.from("itineraries").select("*");

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// ✅ Update Itinerary
export async function PUT(req: Request) {
  try {
    const { id, title, description, startDate, endDate } = await req.json();

    const { data, error } = await supabase
      .from("itineraries")
      .update({ title, description, startDate, endDate })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// ✅ Delete Itinerary
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const { error } = await supabase.from("itineraries").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
