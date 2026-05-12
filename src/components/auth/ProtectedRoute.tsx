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

  useEffect(() => {
    if (
      isHydrated &&
      !isAuthenticated
    ) {
      router.push("/autenticacion");
    }

    const isAdminRoute =
      pathname.startsWith("/admin");

    if (
      isHydrated &&
      isAdminRoute &&
      user?.role !== "Admin"
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

  return <>{children}</>;
}