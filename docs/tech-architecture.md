# 블로그 웹사이트 기술 아키텍처 설계서

## 1. 프로젝트 구조 및 파일 조직
### 폴더 구조
- `app/`: Next.js App Router 기반 페이지 구성.
- `components/`: 재사용 가능한 UI 및 페이지별 컴포넌트.
- `docs/`: 프로젝트 문서 관리.
- `lib/`: 유틸리티 함수 및 공통 로직.
- `public/`: 정적 파일 및 이미지.
- `styles/`: TailwindCSS 설정 및 전역 스타일.
- `types/`: TypeScript 타입 정의.

### 네이밍 규칙
- **폴더명**: `kebab-case` 사용.
- **파일명**: `camelCase` 또는 `kebab-case` 일관성 유지.

### 파일 분리 및 모듈화 전략
- 컴포넌트는 기능별로 분리하여 `components/` 폴더에 저장.
- 유틸리티 함수는 `lib/` 폴더에 모듈화.
- 타입 정의는 `types/` 폴더에 저장하여 재사용성 확보.

### 설정 파일 관리 방안
- `tsconfig.json`: TypeScript 설정.
- `tailwind.config.js`: TailwindCSS 설정.
- `next.config.ts`: Next.js 설정.

## 2. 컴포넌트 계층 구조
### Layout 컴포넌트 설계
- **역할**: 공통 레이아웃 제공 (헤더, 푸터 포함).
- **구성**:
  - `app/layout.tsx`: 전역 레이아웃.
  - `components/common/header.tsx`: 헤더 컴포넌트.
  - `components/common/footer.tsx`: 푸터 컴포넌트.

### 재사용 가능한 UI 컴포넌트
- **예시**:
  - 버튼: `components/ui/button.tsx`
  - 카드: `components/ui/card.tsx`
  - 폼: `components/ui/form.tsx`

### 페이지별 컴포넌트 구조
- **홈 페이지**: `app/page.tsx`
- **포스트 목록 페이지**: `app/posts/page.tsx`
- **포스트 상세 페이지**: `app/posts/[slug]/page.tsx`
- **카테고리 페이지**: `app/categories/[slug]/page.tsx`

### Props 전달 및 상태 관리 패턴
- **Props 전달**: 컴포넌트 간 데이터 전달 시 명시적 타입 정의.
- **상태 관리**: `useState`, `useEffect` 활용.

## 3. 데이터 모델 및 상태 관리 전략
### 블로그 포스트 데이터 구조
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}
```

### 카테고리 및 태그 모델
```typescript
interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}
```

### 클라이언트 상태 관리
- **기본 패턴**:
  - `useState`로 로컬 상태 관리.
  - `useEffect`로 데이터 초기화 및 업데이트.

### 목업 데이터 구조 및 관리
- `data/mockData.ts` 파일에 JSON 형식으로 저장.

## 4. 라우팅 및 네비게이션
### App Router 활용 전략
- **정적 라우팅**: `app/page.tsx`, `app/posts/page.tsx`.
- **동적 라우팅**: `app/posts/[slug]/page.tsx`, `app/categories/[slug]/page.tsx`.

### SEO 최적화를 위한 메타데이터 설정
- `next/head`를 활용하여 페이지별 메타 태그 설정.

## 5. 성능 최적화 전략
### Next.js Image 컴포넌트 활용
- 이미지 최적화를 위해 `next/image` 사용.

### 코드 스플리팅 기본 적용
- 페이지별 코드 스플리팅으로 초기 로딩 시간 단축.

### 기본적인 캐싱 전략
- 정적 데이터는 `getStaticProps` 또는 `getStaticPaths` 활용.

## 기술적 제약사항
- 복잡한 상태 관리 라이브러리 사용 금지.
- 데이터베이스 연동은 향후 장에서 구현.
- 현재는 정적 데이터 및 로컬 스토리지 활용.

이 아키텍처를 기반으로 개발을 진행하며, 추가 요청이 있으면 말씀해주세요!
