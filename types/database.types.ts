/**
 * Supabase 데이터베이스 타입 정의
 * 데이터베이스 스키마와 일치하도록 설계
 */

// Clerk 사용자 타입 정의
export interface ClerkUser {
  id: string; // Clerk 사용자 ID
  fullName: string; // 사용자 이름
  email: string; // 사용자 이메일
  role: 'authenticated' | 'anon'; // 사용자 역할
}

// Posts 테이블 타입 정의
export interface Post {
  id: number; // 자동 증가 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  author_id: string; // Clerk 사용자 ID
  category_id: number | null; // 카테고리 ID (null 허용)
  created_at: string; // 생성 시간
}

export interface PostInsert {
  title: string;
  content: string;
  author_id?: string; // 기본값: auth.jwt()->>'sub'
  category_id?: number | null;
}

export interface PostUpdate {
  title?: string;
  content?: string;
  category_id?: number | null;
}

// Comments 테이블 타입 정의
export interface Comment {
  id: number; // 자동 증가 ID
  post_id: number; // 게시물 ID
  user_id: string; // Clerk 사용자 ID
  content: string; // 댓글 내용
  created_at: string; // 생성 시간
}

export interface CommentInsert {
  post_id: number;
  user_id?: string; // 기본값: auth.jwt()->>'sub'
  content: string;
}

export interface CommentUpdate {
  content?: string;
}

// Likes 테이블 타입 정의
export interface Like {
  id: number; // 자동 증가 ID
  post_id: number; // 게시물 ID
  user_id: string; // Clerk 사용자 ID
  created_at: string; // 생성 시간
}

export interface LikeInsert {
  post_id: number;
  user_id?: string; // 기본값: auth.jwt()->>'sub'
}

export interface LikeUpdate {}

// Categories 테이블 타입 정의
export interface Category {
  id: number; // 자동 증가 ID
  name: string; // 카테고리 이름
}

export interface CategoryInsert {
  name: string;
}

export interface CategoryUpdate {
  name?: string;
}

// Supabase Database 타입 정의
export interface Database {
  posts: {
    Row: Post;
    Insert: PostInsert;
    Update: PostUpdate;
  };
  comments: {
    Row: Comment;
    Insert: CommentInsert;
    Update: CommentUpdate;
  };
  likes: {
    Row: Like;
    Insert: LikeInsert;
    Update: LikeUpdate;
  };
  categories: {
    Row: Category;
    Insert: CategoryInsert;
    Update: CategoryUpdate;
  };
}

// 블로그 특화 타입 정의
export interface PostWithCategory extends Post {
  category: Category | null; // 카테고리 정보 포함
}
