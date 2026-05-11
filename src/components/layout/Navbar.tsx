"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useState } from "react";

import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const pathname = usePathname();

  const isAuth =
    pathname.startsWith("/auth");

  const [open, setOpen] =
    useState(false);

  const {
    isAuthenticated,
    logout,
    user,
  } = useUser();

  const isAdmin =
    user?.role?.toLowerCase() ===
    "admin";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#070707]/80 backdrop-blur border-b border-white/10">

      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-4"
        >

          <img
            src="/images/logo.png"
            alt="Viacore"
            className="h-9"
          />

          <span className="text-sm font-semibold text-white">
            VIACORE
          </span>

        </Link>

        {!isAuth && (
          <>

            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-200">

              <Link
                href="/plataforma"
                className="hover:text-white transition"
              >
                Plataforma
              </Link>

              <Link
                href="/mis-solicitudes"
                className="hover:text-white transition"
              >
                Mis solicitudes
              </Link>

              <Link
                href="/contacto"
                className="hover:text-white transition"
              >
                Contacto
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-[#C7962D] hover:text-white transition font-medium"
                >
                  Admin
                </Link>
              )}

            </nav>

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>

            {isAuthenticated ? (

              <div className="hidden md:flex items-center gap-4">

                <div className="flex flex-col items-end">

                  <span className="text-xs text-gray-500">
                    Conectado como
                  </span>

                  <span className="text-sm text-white font-medium">
                    {user?.email}
                  </span>

                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-md text-sm font-semibold border border-[#C7962D] text-[#C7962D] hover:bg-[#C7962D] hover:text-black transition cursor-pointer"
                >
                  Cerrar sesión
                </button>

              </div>

            ) : (

              <Link
                href="/autenticacion"
                className="hidden md:block px-5 py-2 rounded-md text-sm font-semibold bg-[#C7962D] text-black hover:opacity-90 transition"
              >
                Ingresar
              </Link>

            )}

          </>
        )}

      </div>

      {open && !isAuth && (

        <div className="md:hidden bg-[#070707] border-t border-white/10 flex flex-col px-6 py-6 gap-4 text-sm text-gray-200">

          <Link
            href="/plataforma"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-white transition"
          >
            Plataforma
          </Link>

          <Link
            href="/mis-solicitudes"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-white transition"
          >
            Mis solicitudes
          </Link>

          <Link
            href="/contacto"
            onClick={() =>
              setOpen(false)
            }
            className="hover:text-white transition"
          >
            Contacto
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() =>
                setOpen(false)
              }
              className="text-[#C7962D] font-medium"
            >
              Admin
            </Link>
          )}

          {isAuthenticated ? (

            <>
              <div className="mt-4 flex flex-col text-sm">

                <span className="text-gray-500">
                  Conectado como
                </span>

                <span className="text-white font-medium break-all">
                  {user?.email}
                </span>

              </div>

              <button
                onClick={() => {
                  logout();

                  setOpen(false);
                }}
                className="mt-2 px-5 py-3 rounded-md text-center font-semibold border border-[#C7962D] text-[#C7962D]"
              >
                Cerrar sesión
              </button>
            </>

          ) : (

            <Link
              href="/autenticacion"
              onClick={() =>
                setOpen(false)
              }
              className="mt-4 px-5 py-3 rounded-md text-center font-semibold bg-[#C7962D] text-black hover:opacity-90 transition"
            >
              Ingresar
            </Link>

          )}

        </div>

      )}
    </header>
  );
}