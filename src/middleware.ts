import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./context/UserContext";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("userSession")?.value;

  const protectedRoutes = [
    "/mis-solicitudes",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/autenticacion", request.url));
  }

  if (token) {
    try {
      const user = jwtDecode<DecodedToken>(token);

      if (!user.profileCompleted && pathname !== "/completar-perfil") {
        return NextResponse.redirect(new URL("/completar-perfil", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/autenticacion", request.url));
    }
  }

  return NextResponse.next();
}
