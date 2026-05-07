"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md transition ${
      pathname === path
        ? "bg-[#C7962D]/10 text-[#C7962D]"
        : "text-gray-300 hover:text-[#C7962D] hover:bg-white/5"
    }`;

  return (
    <aside className="w-64 border-r border-white/10 bg-black/80 p-6 flex flex-col justify-between">

      <div>

        <h2 className="text-xl font-semibold mb-6">
          Admin Panel
        </h2>

        <div className="h-0.5 w-10 bg-[#C7962D] mb-6" />

        <nav className="space-y-2 text-sm">

          <Link href="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>

          <Link href="/admin/users" className={linkClass("/admin/users")}>
            Usuarios
          </Link>

          <Link href="/admin/services" className={linkClass("/admin/services")}>
            Servicios
          </Link>

          <Link href="/admin/requests" className={linkClass("/admin/requests")}>
            Solicitudes
          </Link>

          <div className="text-gray-500 px-3 py-2">
            Pagos
          </div>

        </nav>

      </div>

      <div className="text-sm text-gray-500">
        Admin v1.0
      </div>

    </aside>
  );
}