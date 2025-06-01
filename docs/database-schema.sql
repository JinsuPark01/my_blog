-- Supabase PostgreSQL 데이터베이스 스키마
-- pgcrypto 확장 활성화
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 기존 테이블 삭제 (의존성 순서 고려)
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;

-- 카테고리 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY, -- 자동 증가 ID
    name TEXT NOT NULL UNIQUE -- 카테고리 이름
);

-- 초기 카테고리 데이터 삽입
INSERT INTO categories (name)
VALUES ('일반'), ('기술'), ('일상'), ('개발')
ON CONFLICT (name) DO NOTHING; -- 중복 데이터 처리

-- 게시물 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY, -- 자동 증가 ID
    title TEXT NOT NULL, -- 게시물 제목
    content TEXT NOT NULL, -- 게시물 내용
    author_id TEXT NOT NULL DEFAULT auth.jwt()->>'sub', -- Clerk 사용자 ID
    category_id INT REFERENCES categories(id) ON DELETE SET NULL, -- 카테고리 참조
    created_at TIMESTAMP DEFAULT NOW() -- 생성 시간
);

-- 댓글 테이블 생성
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY, -- 자동 증가 ID
    post_id INT REFERENCES posts(id) ON DELETE CASCADE, -- 게시물 참조
    user_id TEXT NOT NULL DEFAULT auth.jwt()->>'sub', -- Clerk 사용자 ID
    content TEXT NOT NULL, -- 댓글 내용
    created_at TIMESTAMP DEFAULT NOW() -- 생성 시간
);

-- 좋아요 테이블 생성
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY, -- 자동 증가 ID
    post_id INT REFERENCES posts(id) ON DELETE CASCADE, -- 게시물 참조
    user_id TEXT NOT NULL DEFAULT auth.jwt()->>'sub', -- Clerk 사용자 ID
    created_at TIMESTAMP DEFAULT NOW() -- 생성 시간
);

-- Storage 버킷 생성
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING; -- 중복 데이터 처리
