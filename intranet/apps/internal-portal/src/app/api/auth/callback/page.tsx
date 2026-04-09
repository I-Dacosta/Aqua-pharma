"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { usePortalAuth } from "@platform/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { isAuthenticated, login, ready } = usePortalAuth();

  useEffect(() => {
    if (ready && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, ready, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#d7f0ff,transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef4f7_100%)] px-6">
      <div className="max-w-lg rounded-[2rem] border border-sky-100 bg-white/90 p-10 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Microsoft Entra ID</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">Completing sign-in</h1>
        <p className="mt-3 text-base text-slate-600">
          If the redirect did not complete automatically, continue the login flow.
        </p>
        <button
          className="mt-8 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          onClick={() => void login()}
          type="button"
        >
          Retry sign-in
        </button>
      </div>
    </main>
  );
}