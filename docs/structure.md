# 블로그 프로젝트 폴더 구조 가이드

## 1. 프로젝트 폴더 구조
```
my_blog/
├── app/
│   ├── layout.tsx                # 전역 레이아웃 설정
│   ├── page.tsx                  # 메인 페이지
│   ├── posts/
│   │   ├── page.tsx              # 블로그 포스트 목록 페이지
│   │   ├── [slug]/page.tsx       # 블로그 포스트 상세 페이지
│   ├── categories/
│   │   ├── page.tsx              # 카테고리 목록 페이지
│   │   ├── [slug]/page.tsx       # 카테고리별 필터링 페이지
│   ├── search/
│   │   ├── page.tsx              # 검색 결과 페이지
├── components/
│   ├── common/
│   │   ├── header.tsx            # 헤더 컴포넌트
│   │   ├── footer.tsx            # 푸터 컴포넌트
│   ├── blog/
│   │   ├── post-card.tsx         # 블로그 포스트 카드 컴포넌트
│   │   ├── comment-section.tsx   # 댓글 섹션 컴포넌트
│   │   ├── like-button.tsx       # 좋아요 버튼 컴포넌트
│   │   ├── markdown-content.tsx  # 마크다운 렌더링 컴포넌트
│   │   ├── related-posts.tsx     # 관련 포스트 추천 컴포넌트
│   ├── ui/
│   │   ├── button.tsx            # 버튼 컴포넌트
│   │   ├── card.tsx              # 카드 컴포넌트
│   │   ├── search-dialog.tsx     # 검색 다이얼로그 컴포넌트
├── data/
│   ├── mockData.ts               # 목업 데이터 파일
├── lib/
│   ├── utils.ts                  # 유틸리티 함수 모음
│   ├── formatDate.ts             # 날짜 포맷팅 함수
├── styles/
│   ├── globals.css               # 전역 스타일 파일
│   ├── tailwind.config.js        # TailwindCSS 설정 파일
├── types/
│   ├── post.ts                   # 블로그 포스트 타입 정의
│   ├── comment.ts                # 댓글 타입 정의
├── public/
│   ├── favicon.ico               # 파비콘 파일
├── docs/
│   ├── requirements.md           # 요구사항 문서
│   ├── structure.md              # 폴더 구조 문서
│   ├── design.md                 # 디자인 가이드 문서
│   ├── wireframes.md             # 와이어프레임 문서
│   ├── tech-architecture.md      # 기술 아키텍처 문서
├── package.json                  # 프로젝트 설정 파일
├── tsconfig.json                 # TypeScript 설정 파일
├── README.md                     # 프로젝트 설명 파일
```

## 2. 폴더 및 파일 역할 설명

### 2.1. `app/`
- **라우팅 및 페이지 구성**: Next.js App Router 기반으로 페이지를 구성하며, 각 디렉토리는 라우트와 연결됩니다.

### 2.2. `components/`
- **공통 컴포넌트**: `common/` 폴더에 Header, Footer 등 전역 컴포넌트를 배치.
- **블로그 컴포넌트**: `blog/` 폴더에 블로그 관련 컴포넌트 배치.
- **UI 컴포넌트**: `ui/` 폴더에 재사용 가능한 UI 요소 배치.

### 2.3. `data/`
- **목업 데이터**: 개발 초기 단계에서 사용할 샘플 데이터를 저장.

### 2.4. `lib/`
- **유틸리티 함수**: 데이터 처리 및 공통 로직을 모듈화하여 저장.

### 2.5. `styles/`
- **스타일 파일**: TailwindCSS 설정 및 전역 스타일을 관리.

### 2.6. `types/`
- **타입 정의**: TypeScript를 활용한 데이터 구조 정의.

### 2.7. `docs/`
- **문서 관리**: 요구사항, 디자인, 와이어프레임, 기술 아키텍처 등 프로젝트 관련 문서를 저장.

### 2.8. `public/`
- **정적 파일**: 파비콘 및 기타 정적 자원을 저장.

## 3. 기술적 요구사항 준수
- 폴더명은 `kebab-case`를 사용하여 일관성 유지.
- 파일명은 `camelCase` 또는 `kebab-case`로 작성.
- 확장 가능한 구조로 설계하여 향후 기능 추가를 고려.

이 폴더 구조를 기반으로 프로젝트를 진행하며, 추가 요청이 있으면 말씀해주세요!
