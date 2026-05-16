import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./context/UserContext";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("userSession")?.value;

  const isGoogleAuth =
    pathname.startsWith("/autenticacion/autenticacion-google") ||
    pathname.startsWith("/auth/google/callback");

  if (isGoogleAuth) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAuthPage = pathname === "/autenticacion";
  const isCompleteProfile = pathname === "/completar-perfil";
  const isHome = pathname === "/"; // ← agregue isHome
  const isPublic =
    pathname.startsWith("/solicitudes") ||
    pathname.startsWith("/plataforma") ||
    pathname.startsWith("/capacitaciones"); // ← agregue isPublic

  if (isAuthPage || isCompleteProfile || isHome || isPublic) {
    // ← agregue isHome e isPublic
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/autenticacion", request.url));
  }

  try {
    const user = jwtDecode<DecodedToken>(token);

    if (!user.profileCompleted) {
      if (!isCompleteProfile) {
        return NextResponse.redirect(new URL("/completar-perfil", request.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/autenticacion", request.url));
  }
}
