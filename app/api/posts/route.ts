import { createServerSupabaseClient } from "@/lib/supabase-server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient();
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, title, slug, cover_image_url, category_id, content, created_at")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json(posts || []);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, slug, cover_image_url, category_id } = body;

    if (!title || !content || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        slug,
        cover_image_url: cover_image_url || null,
        category_id: category_id || null,
        author_id: userId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}