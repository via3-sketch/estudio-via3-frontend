"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md transition ${
      pathname === path
        ? "bg-[#C7962D]/10 text-[#C7962D]"
        : "text-gray-300 hover:text-[#C7962D] hover:bg-white/5"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/auth");
  };

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/80 p-4 md:p-6 md:flex md:flex-col md:justify-between md:min-h-screen">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-6">
          Admin Panel
        </h2>
        <div className="h-0.5 w-10 bg-[#C7962D] mb-3 hidden md:block md:mb-6" />

        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <nav className="flex flex-row md:flex-col gap-2 text-sm w-max md:w-auto">
            <Link href="/admin" className={linkClass("/admin")}>
              Dashboard
            </Link>
            <Link href="/admin/users" className={linkClass("/admin/users")}>
              Usuarios
            </Link>
            <Link
              href="/admin/services"
              className={linkClass("/admin/services")}
            >
              Servicios
            </Link>
            <Link
              href="/admin/requests"
              className={linkClass("/admin/requests")}
            >
              Solicitudes
            </Link>
            <Link
              href="/admin/meetings"
              className={linkClass("/admin/meetings")}
            >
              Reuniones
            </Link>
          </nav>
        </div>
      </div>

      <div className="hidden md:block space-y-4">
        <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-gray-300 hover:text-[#C7962D] hover:bg-white/5 transition"
          >
            ← Volver al sitio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-md text-red-400 hover:bg-red-500/10 transition"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="text-sm text-gray-500 px-3">Admin v1.0</div>
      </div>
    </aside>
  );
}
