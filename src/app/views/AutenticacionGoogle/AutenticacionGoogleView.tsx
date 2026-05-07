"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AutenticacionGoogleView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      router.push("/");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Iniciando sesión...
    </div>
  );
}