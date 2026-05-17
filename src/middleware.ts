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

  const publicPaths = [
    "/",
    "/plataforma",
    "/contacto",
  ];

  const isPublicPath = publicPaths.some(
    (path) =>
      pathname === path || pathname.startsWith(path + "/")
  );

  const isAuthPage = pathname === "/autenticacion";
  const isCompleteProfile =
    pathname === "/completar-perfil";

  if (!token) {
    if (
      isPublicPath ||
      isAuthPage ||
      isCompleteProfile
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL("/autenticacion", request.url)
    );
  }

  try {
    const user = jwtDecode<DecodedToken>(token);

    if (!user.profileCompleted) {
      if (!isCompleteProfile) {
        return NextResponse.redirect(
          new URL("/completar-perfil", request.url)
        );
      }

      return NextResponse.next();
    }

    return NextResponse.next();

  } catch {
    const response = NextResponse.redirect(
      new URL("/autenticacion", request.url)
    );

      response.cookies.delete("userSession");

  return response;
  }
}