"use client";

import React, { useState, useEffect } from "react";
import { Comment, CommentFormData } from "../../types/comment";
import { SignedIn, SignedOut, useUser, SignInButton } from "@clerk/nextjs";
import { useAuthStatus } from "../../hooks/use-auth-status";

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useUser();
  const { userId } = useAuthStatus();
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState<CommentFormData>({
    authorName: "",
    authorEmail: "",
    content: "",
  });

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${postId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      alert("Content is required.");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      authorName: user?.fullName || "Anonymous",
      authorEmail: user?.id || "",
      content: formData.content,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));

    setFormData({ authorName: "", authorEmail: "", content: "" });
  };

  const handleDelete = (commentId: string) => {
    console.log("Deleting comment with ID:", commentId);
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
    console.log("Updated comments:", updatedComments);
  };

  const handleEdit = (commentId: string, newContent: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>

      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => {
            const isAuthor = user?.id === comment.authorEmail;
            return (
              <li key={comment.id} className="border rounded p-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{comment.authorName}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p>{comment.content}</p>
                {isAuthor && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          comment.id,
                          prompt("Edit your comment:", comment.content) || comment.content
                        )
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      )}

      <SignedIn>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              id="content"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </SignedIn>

      <SignedOut>
        <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
          <p className="mb-2">댓글을 작성하려면 로그인이 필요합니다.</p>
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              로그인하기
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </section>
  );
};

export default CommentSection;
