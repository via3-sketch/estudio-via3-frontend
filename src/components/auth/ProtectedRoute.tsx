"use client";

import { useEffect } from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useUser } from "@/hooks/useUser";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const {
    isAuthenticated,
    isHydrated,
    user,
  } = useUser();

  const isAdminRoute =
      pathname.startsWith("/admin");

  useEffect(() => {
    if (
      isHydrated &&
      !isAuthenticated
    ) {
      router.push("/autenticacion");
      return
    }

    if (
      isHydrated &&
      isAdminRoute &&
      user?.role !== "admin"
    ) {
      router.push("/");
    }
  }, [
    isAuthenticated,
    isHydrated,
    router,
    pathname,
    user,
  ]);

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (
    isAdminRoute &&
    user?.role !== "admin"
  ) {
    return null;
  }

  return <>{children}</>;
}