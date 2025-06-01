import React from "react";

type AuthErrorProps = {
  errorCode: string;
};

const errorMessages: Record<string, string> = {
  SESSION_EXPIRED: "세션이 만료되었습니다. 다시 로그인해 주세요.",
  UNAUTHORIZED_ACTION: "이 작업을 수행할 권한이 없습니다.",
  LOGIN_FAILED: "로그인에 실패했습니다. 자격 증명을 확인하세요.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
  DEFAULT: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
};

export default function AuthError({ errorCode }: AuthErrorProps) {
  const message = errorMessages[errorCode] || errorMessages.DEFAULT;

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded-md">
      <p>{message}</p>
      {errorCode === "SESSION_EXPIRED" && (
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          다시 로그인
        </button>
      )}
    </div>
  );
}
