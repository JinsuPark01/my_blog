### 프로젝트 전역 설정

**프로젝트 전역 설정:**
- 터미널 명령어: Command Prompt 사용 (PowerShell 사용 금지)
- 파일 생성/수정/삭제: Command Prompt 명령어로 안내
- 대화는 한글로 진행
- TypeScript와 한글 주석 사용
- 기본적인 에러 처리 포함
- 초보자도 이해할 수 있는 수준으로 구현
- 복잡한 고급 기능은 제외하고 기본적인 것만
- **Clerk와 Supabase 통합 방식**: Clerk 도메인을 Supabase의 Third-Party Auth에 입력하여 JWKS URL 자동 참조. RLS 정책은 `requesting_user_id()`를 통해 `sub` 클레임 활용. Supabase 클라이언트는 `global.headers`로 JWT 전달: 이 사실은 2025년 4월 1일 변경되었기에 반드시 기억해야 한다. 

**AI 실수 방지 체크리스트:**
✓ Next.js App Router 경로 구조 정확히 사용 (app/ 디렉토리 기준)  
✓ 'use client' 지시문 필요한 컴포넌트에만 추가  
✓ import 경로는 절대경로(@/) 또는 상대경로 일관성 유지  
✓ TypeScript 타입 정의 누락 없이 구현  
✓ 존재하지 않는 라이브러리나 컴포넌트 사용 금지  
✓ 복잡한 상태 관리나 최적화 기법 사용 금지  

**프로젝트 맥락 정보:**
- 8장 완료: 기본 블로그 구조, 포스트 목록/상세 페이지, 검색 기능, 댓글 시스템(로컬), 좋아요 기능  
- 9장 완료: Clerk 인증 시스템 통합, 권한 기반 댓글 관리  
- 현재 사용 중: Next.js 15, TypeScript, TailwindCSS, ShadCN UI, Clerk  
- 10장 목표: Supabase 데이터베이스 연동 및 이미지 업로드 시스템  
- **MOCK 데이터 제거 원칙**: 모든 mockData import를 제거하고 Supabase로 대체  
- **에러 처리**: try-catch로 감싸고 에러 시 빈 배열 반환  
- **빈 상태 처리**: 데이터가 없을 때 안내 메시지 필수
