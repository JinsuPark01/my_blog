import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("id, title, slug, cover_image_url, content, created_at, category_id")
      .eq("slug", params.slug)
      .single();

    if (error) {
      throw error;
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("id", post.category_id)
      .single();

    if (categoryError) {
      throw categoryError;
    }

    return NextResponse.json({ ...post, category });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}