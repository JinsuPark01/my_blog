import { auth } from "@clerk/nextjs/server";
import clerkClient from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

// 댓글 조회 - 모든 사용자 접근 가능
export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

  // 댓글 데이터 조회 로직 (현재는 목업 데이터)
  const storedComments = localStorage.getItem(`comments-${postId}`);
  const comments = storedComments ? JSON.parse(storedComments) : [];

  return NextResponse.json({ comments });
}

// 댓글 작성 - 인증된 사용자만 접근 가능
export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    const body = await request.json();

    const commentData = {
      ...body,
      userId,
      userName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
      userImage: user.profileImageUrl || "",
      createdAt: new Date().toISOString(),
    };

    const postId = body.postId;
    const storedComments = localStorage.getItem(`comments-${postId}`);
    const comments = storedComments ? JSON.parse(storedComments) : [];
    comments.push(commentData);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));

    return NextResponse.json({ success: true, comment: commentData });
  } catch (error) {
    console.error("Failed to fetch user or save comment:", error);
    return NextResponse.json({ error: "댓글 작성 실패" }, { status: 500 });
  }
}
