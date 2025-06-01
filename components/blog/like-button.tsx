"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${postId}`);
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLiked(parsedLikes.liked);
      setLikeCount(parsedLikes.likeCount);
    }
  }, [postId]);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    localStorage.setItem(
      `likes-${postId}`,
      JSON.stringify({ liked: !liked, likeCount: liked ? likeCount - 1 : likeCount + 1 })
    );
  };

  return (
    <button
      onClick={handleLikeToggle}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 focus:outline-none"
      aria-label={liked ? "Unlike this post" : "Like this post"}
    >
      <Heart
        className={`w-5 h-5 transition-transform ${liked ? "text-red-500 scale-110" : "text-gray-400"}`}
      />
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
