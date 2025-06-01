export function handleAuthError(error: any): string {
  if (error?.code === "SESSION_EXPIRED") {
    return "SESSION_EXPIRED";
  }
  if (error?.code === "UNAUTHORIZED_ACTION") {
    return "UNAUTHORIZED_ACTION";
  }
  if (error?.code === "LOGIN_FAILED") {
    return "LOGIN_FAILED";
  }
  if (error?.message?.includes("Network Error")) {
    return "NETWORK_ERROR";
  }
  return "DEFAULT";
}
