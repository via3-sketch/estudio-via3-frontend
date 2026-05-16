"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { isHydrated, user } = useUser();

  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isHydrated) return;

    if (isAdminRoute && user?.role !== "admin") {
      router.replace("/");
    }
  }, [isHydrated, isAdminRoute, user, router]);

  if (!isHydrated) return null;

  if (isAdminRoute && user?.role !== "admin") return null;

  return <>{children}</>;
}