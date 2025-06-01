"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TestSupabasePage: React.FC = () => {
  const { session } = useSession();
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [rlsTestResult, setRlsTestResult] = useState<string | null>(null);

  useEffect(() => {
    const testAuthIntegration = async () => {
      if (!session) {
        setAuthStatus("No active session");
        return;
      }

      try {
        const accessToken = await session.getToken();
        const userId = session.user?.id || "Unknown";
        const role = session.user?.publicMetadata?.role || "Unknown";

        setAuthStatus(
          `Session active. User ID: ${userId}, Role: ${role}, Access Token: ${accessToken}`
        );

        const { data, error } = await supabase
          .from("test_table")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          setRlsTestResult(`RLS Test Failed: ${error.message}`);
        } else {
          setRlsTestResult(`RLS Test Passed. Data: ${JSON.stringify(data)}`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setRlsTestResult(`RLS Test Error: ${errorMessage}`);
      }
    };

    testAuthIntegration();
  }, [session]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Third-Party Auth Test</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Environment Variables</h2>
        <ul>
          <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</li>
          <li>Supabase Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}</li>
          <li>Clerk Publishable Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Auth Status</h2>
        <p>{authStatus || "Loading..."}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">RLS Test Result</h2>
        <p>{rlsTestResult || "Testing..."}</p>
      </div>
    </div>
  );
};

export default TestSupabasePage;