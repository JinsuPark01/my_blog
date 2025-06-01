/**
 * Comment 인터페이스
 * 댓글 데이터 모델을 정의합니다.
 */
export interface Comment {
  /** 고유 식별자 */
  id: string;
  /** 댓글이 달린 포스트 ID */
  postId: string;
  /** 작성자 이름 */
  authorName: string;
  /** 작성자 이메일 (관리용, 표시되지 않음) */
  authorEmail: string;
  /** 댓글 내용 */
  content: string;
  /** 작성 시간 */
  createdAt: string;
  /** 수정 시간 (선택적) */
  updatedAt?: string;
}

/**
 * CommentFormData 인터페이스
 * 댓글 작성 폼에서 사용할 데이터 구조를 정의합니다.
 */
export interface CommentFormData {
  /** 작성자 이름 */
  authorName: string;
  /** 작성자 이메일 */
  authorEmail: string;
  /** 댓글 내용 */
  content: string;
}

/**
 * 댓글 목록 정렬 옵션
 */
export type CommentSortOption = 'newest' | 'oldest';

/**
 * 댓글 상태 타입
 */
export type CommentStatus = 'draft' | 'published' | 'editing';
