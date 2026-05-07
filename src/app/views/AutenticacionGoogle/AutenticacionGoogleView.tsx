"use client";

import { useEffect, useRef } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useUser } from "@/hooks/useUser";

import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;

  email: string;

  role: string;

  profileCompleted: boolean;
};

export default function AutenticacionGoogleView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { login } = useUser();

  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current) return;

    const token = searchParams.get("token");

    if (token) {
      hasLogged.current = true;

      const decoded =
        jwtDecode<DecodedToken>(token);

      login(token);

      if (!decoded.profileCompleted) {
        router.push("/completar-perfil");

        return;
      }

      router.push("/");
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Iniciando sesión...
    </div>
  );
}