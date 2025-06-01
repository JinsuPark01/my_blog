/**
 * 블로그 애플리케이션 데이터 모델 및 목업 데이터
 */

/**
 * BlogPost 인터페이스
 */
export interface BlogPost {
  id: string; // 고유 식별자
  title: string; // 포스트 제목
  slug: string; // URL 슬러그
  content: string; // 포스트 본문
  excerpt: string; // 요약
  publishedAt: string; // 게시 날짜
  updatedAt: string; // 수정 날짜
  readingTime: number; // 읽는 시간 (분 단위)
  coverImage: string; // 대표 이미지 URL
  images: string[]; // 추가 이미지 URL 배열
  category: Category; // 카테고리
  tags: string[]; // 태그 배열
  viewCount: number; // 조회수
  likeCount: number; // 좋아요 수
  featured: boolean; // 추천 포스트 여부
}

/**
 * Author 인터페이스
 */
export interface Author {
  id: string; // 고유 식별자
  name: string; // 작성자 이름
  avatar: string; // 아바타 이미지 URL
  bio: string; // 작성자 소개
}

/**
 * Category 인터페이스
 */
export interface Category {
  id: string; // 고유 식별자
  name: string; // 카테고리 이름
}

/**
 * Comment 인터페이스
 */
export interface Comment {
  id: string; // 고유 식별자
  postId: string; // 댓글이 속한 포스트 ID
  author: Author; // 작성자 정보
  content: string; // 댓글 내용
  createdAt: string; // 작성 날짜
}

/**
 * 목업 데이터: BlogPost 배열
 */
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js로 시작하는 웹 개발",
    slug: "nextjs-web-development",
    content: "Next.js는 React 기반의 프레임워크로, 서버 사이드 렌더링과 정적 사이트 생성 기능을 제공합니다...",
    excerpt: "Next.js를 활용한 웹 개발의 기본을 알아봅니다.",
    publishedAt: "2025-06-01",
    updatedAt: "2025-06-02",
    readingTime: 5,
    coverImage: "/public/next.svg",
    images: ["/public/next.svg", "/public/vercel.svg"],
    category: { id: "1", name: "웹 개발" },
    tags: ["Next.js", "React", "웹 개발"],
    viewCount: 120,
    likeCount: 45,
    featured: true,
  },
  {
    id: "2",
    title: "JavaScript의 비동기 처리 이해하기",
    slug: "javascript-async",
    content: "JavaScript의 비동기 처리는 Promise와 async/await를 통해 효율적으로 관리할 수 있습니다...",
    excerpt: "JavaScript의 비동기 처리 메커니즘을 살펴봅니다.",
    publishedAt: "2025-05-28",
    updatedAt: "2025-05-30",
    readingTime: 7,
    coverImage: "/public/globe.svg",
    images: ["/public/globe.svg"],
    category: { id: "2", name: "JavaScript" },
    tags: ["JavaScript", "비동기", "Promise"],
    viewCount: 200,
    likeCount: 60,
    featured: false,
  },
  {
    id: "3",
    title: "React 컴포넌트 디자인 패턴",
    slug: "react-component-design",
    content: "React 컴포넌트 디자인 패턴은 재사용성과 유지보수성을 높이는 데 중요한 역할을 합니다...",
    excerpt: "React 컴포넌트 디자인 패턴을 학습합니다.",
    publishedAt: "2025-05-20",
    updatedAt: "2025-05-22",
    readingTime: 6,
    coverImage: "/public/window.svg",
    images: ["/public/window.svg"],
    category: { id: "3", name: "React" },
    tags: ["React", "컴포넌트", "디자인 패턴"],
    viewCount: 150,
    likeCount: 50,
    featured: false,
  },
];
