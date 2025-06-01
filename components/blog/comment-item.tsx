import React from "react";
import { useUser } from "@clerk/nextjs";

type CommentItemProps = {
  comment: {
    id: string;
    userId: string;
    content: string;
    authorName: string;
    authorImageUrl: string;
    createdAt: string;
  };
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { user } = useUser();
  const isAuthor = user?.id === comment.userId;

  // 날짜 포맷팅
  const formattedDate = new Date(comment.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="comment-item p-4 border rounded-md">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <img
            src={comment.authorImageUrl}
            alt={comment.authorName}
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-center">
            {/* 작성자 이름 */}
            <h4 className="font-medium">{comment.authorName}</h4>

            {/* 자신의 댓글 표시 */}
            {isAuthor && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                내 댓글
              </span>
            )}

            {/* 작성 날짜 */}
            <span className="ml-2 text-gray-500 text-sm">{formattedDate}</span>
          </div>

          {/* 댓글 내용 */}
          <p className="mt-1 text-gray-700">{comment.content}</p>

          {/* 자신의 댓글에만 편집/삭제 버튼 표시 */}
          {isAuthor && (
            <div className="mt-2 space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                수정
              </button>
              <button className="text-sm text-red-500 hover:text-red-700">
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
