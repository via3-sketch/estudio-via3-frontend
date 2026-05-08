"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    isAuthenticated,
    isHydrated,
    user,
  } = useUser();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/autenticacion");
      return;
    }

    if (
      isHydrated &&
      isAuthenticated &&
      user?.role !== "admin"
    ) {
      router.push("/");
    }
  }, [
    isAuthenticated,
    isHydrated,
    user,
    router,
  ]);

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}