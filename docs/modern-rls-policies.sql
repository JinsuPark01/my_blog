-- Supabase 최신 RLS 정책 설정
-- auth.jwt()->>'sub' 기반 정책 적용

-- posts 테이블 RLS 정책 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_select_policy ON posts;
DROP POLICY IF EXISTS posts_insert_policy ON posts;
DROP POLICY IF EXISTS posts_update_policy ON posts;

-- SELECT 정책: 모든 로그인 사용자 허용
CREATE POLICY posts_select_policy ON posts
  FOR SELECT TO authenticated USING (true);

-- INSERT 정책: 로그인 사용자만 허용
CREATE POLICY posts_insert_policy ON posts
  FOR INSERT TO authenticated WITH CHECK (
    auth.jwt()->>'sub' IS NOT NULL
  );

-- UPDATE 정책: 작성자만 수정 가능
CREATE POLICY posts_update_policy ON posts
  FOR UPDATE TO authenticated USING (
    author_id = auth.jwt()->>'sub'
  );

-- comments 테이블 RLS 정책 설정
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS comments_select_policy ON comments;
DROP POLICY IF EXISTS comments_insert_policy ON comments;
DROP POLICY IF EXISTS comments_update_policy ON comments;
DROP POLICY IF EXISTS comments_delete_policy ON comments;

-- SELECT 정책: 모든 로그인 사용자 허용
CREATE POLICY comments_select_policy ON comments
  FOR SELECT TO authenticated USING (true);

-- INSERT 정책: 로그인 사용자만 허용
CREATE POLICY comments_insert_policy ON comments
  FOR INSERT TO authenticated WITH CHECK (
    auth.jwt()->>'sub' IS NOT NULL
  );

-- UPDATE 정책: 작성자만 수정 가능
CREATE POLICY comments_update_policy ON comments
  FOR UPDATE TO authenticated USING (
    user_id = auth.jwt()->>'sub'
  );

-- DELETE 정책: 작성자만 삭제 가능
CREATE POLICY comments_delete_policy ON comments
  FOR DELETE TO authenticated USING (
    user_id = auth.jwt()->>'sub'
  );

-- likes 테이블 RLS 정책 설정
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS likes_select_policy ON likes;
DROP POLICY IF EXISTS likes_insert_policy ON likes;
DROP POLICY IF EXISTS likes_delete_policy ON likes;

-- SELECT 정책: 모든 로그인 사용자 허용
CREATE POLICY likes_select_policy ON likes
  FOR SELECT TO authenticated USING (true);

-- INSERT 정책: 로그인 사용자만 허용
CREATE POLICY likes_insert_policy ON likes
  FOR INSERT TO authenticated WITH CHECK (
    auth.jwt()->>'sub' IS NOT NULL
  );

-- DELETE 정책: 본인만 삭제 가능
CREATE POLICY likes_delete_policy ON likes
  FOR DELETE TO authenticated USING (
    user_id = auth.jwt()->>'sub'
  );

-- categories 테이블 RLS 정책 설정
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS categories_select_policy ON categories;
DROP POLICY IF EXISTS categories_insert_policy ON categories;
DROP POLICY IF EXISTS categories_update_policy ON categories;
DROP POLICY IF EXISTS categories_delete_policy ON categories;

-- SELECT 정책: 모든 로그인 사용자 허용
CREATE POLICY categories_select_policy ON categories
  FOR SELECT TO authenticated USING (true);

-- INSERT 정책: 로그인 사용자만 허용
CREATE POLICY categories_insert_policy ON categories
  FOR INSERT TO authenticated WITH CHECK (
    auth.jwt()->>'sub' IS NOT NULL
  );

-- UPDATE 정책: 로그인 사용자만 수정 가능
CREATE POLICY categories_update_policy ON categories
  FOR UPDATE TO authenticated USING (true);

-- DELETE 정책: 로그인 사용자만 삭제 가능
CREATE POLICY categories_delete_policy ON categories
  FOR DELETE TO authenticated USING (true);
