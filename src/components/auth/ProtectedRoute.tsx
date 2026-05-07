"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    isAuthenticated,
    isHydrated,
  } = useUser();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/autenticacion");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}