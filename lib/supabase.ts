"use client";

import { useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { Database } from "@/types/database.types";

// 환경 변수 확인
const config = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

if (!config.url || !config.anonKey) {
  throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
}

/**
 * useSupabaseClient: 세션 기반 Supabase 클라이언트 반환
 */
export function useSupabaseClient() {
  const { session } = useSession();

  const supabase = useMemo(() => {
    if (!session) {
      throw new Error("Clerk 세션이 없습니다.");
    }

    const token = session.getToken();

    return createClient<Database>(config.url, config.anonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }, [session]);

  return supabase;
}

/**
 * useCurrentUserId: 현재 Clerk 사용자 ID 반환
 * 새로운 Third-Party Auth 방식에서 session.user.id를 사용합니다.
 */
export function useCurrentUserId() {
  const { session } = useSession();
  return session?.user?.id || null;
}

/**
 * extractJWTClaims: JWT 토큰 클레임 추출 (디버깅용)
 * 기존 방식과 새로운 방식의 차이점:
 * - 기존 방식: auth.jwt()->>'sub'를 사용하여 서버에서 클레임 추출
 * - 새로운 방식: 클라이언트에서 session.user.publicMetadata를 사용
 */
export function extractJWTClaims(token: string) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("JWT 클레임 추출 실패:", error);
    return null;
  }
}
