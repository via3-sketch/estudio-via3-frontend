"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth");

  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#070707]/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

       
        <Link href="/" className="flex items-center gap-4">
          <img src="/images/logo.png" alt="Viacore" className="h-9" />
          <span className="text-sm font-semibold text-white">VIACORE</span>
        </Link>

        {!isAuth && (
          <>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-200">
              <Link href="/plataforma" className="hover:text-white transition">
                Plataforma
              </Link>

              <Link href="/mis-solicitudes" className="hover:text-white transition">
                Mis solicitudes
              </Link>

              <Link href="/contacto" className="hover:text-white transition">
                Contacto
              </Link>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>

            <Link
              href="/auth"
              className="hidden md:block px-5 py-2 rounded-md text-sm font-semibold bg-[#C7962D] text-black hover:opacity-90 transition"
            >
              Ingresar
            </Link>
          </>
        )}
      </div>

      {open && !isAuth && (
        <div className="md:hidden bg-[#070707] border-t border-white/10 flex flex-col px-6 py-6 gap-4 text-sm text-gray-200">

          <Link
            href="/plataforma"
            onClick={() => setOpen(false)}
            className="hover:text-white transition"
          >
            Plataforma
          </Link>

          <Link
            href="/mis-solicitudes"
            onClick={() => setOpen(false)}
            className="hover:text-white transition"
          >
            Mis solicitudes
          </Link>

          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="hover:text-white transition"
          >
            Contacto
          </Link>

          <Link
            href="/auth"
            onClick={() => setOpen(false)}
            className="mt-4 px-5 py-3 rounded-md text-center font-semibold bg-[#C7962D] text-black hover:opacity-90 transition"
          >
            Ingresar
          </Link>

        </div>
      )}
    </header>
  );
}