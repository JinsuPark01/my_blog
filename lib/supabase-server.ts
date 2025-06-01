import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { Database } from "@/types/database.types";

// 환경 변수 확인
const config = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};

if (!config.url || !config.anonKey || !config.serviceRoleKey) {
  throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
}

/**
 * createServerSupabaseClient: auth() 함수 기반 서버 클라이언트 생성
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient<Database>> {
  const { userId, getToken } = await auth();

  const token = userId ? await getToken() : null;

  const supabase = createClient<Database>(
    config.url,
    config.anonKey,
    {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  return supabase;
}

/**
 * createAdminSupabaseClient: Service Role Key 기반 관리자 클라이언트 생성
 */
export function createAdminSupabaseClient(): SupabaseClient<Database> {
  if (!config.serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경 변수가 설정되지 않았습니다.");
  }

  return createClient<Database>(config.url, config.serviceRoleKey, {
    global: {
      headers: {
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * getCurrentUserIdServer: 서버에서 현재 사용자 ID 반환
 */
export async function getCurrentUserIdServer(): Promise<string | null> {
  const { userId } = await auth();
  return userId || null;
}
