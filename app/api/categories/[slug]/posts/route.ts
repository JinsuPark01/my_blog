import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, title, slug, cover_image_url, content, created_at")
      .eq("category_id", params.slug)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(posts || []);
  } catch (error) {
    console.error("Error fetching posts for category:", error);
    return NextResponse.json({ error: "Failed to fetch posts for category" }, { status: 500 });
  }
}