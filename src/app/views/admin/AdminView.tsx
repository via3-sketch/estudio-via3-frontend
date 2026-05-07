"use client";

import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminView() {
  return (
    <AdminLayout>
      <div className="space-y-6">

        <h1 className="text-2xl font-semibold text-white">
          Dashboard
        </h1>

        <div className="h-0.5 w-12 bg-[#C7962D]" />

        <p className="text-gray-400">
          Panel de administración del sistema.
        </p>

        <div className="grid grid-cols-3 gap-4">

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Usuarios</p>
            <p className="text-xl font-semibold">120</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Solicitudes</p>
            <p className="text-xl font-semibold">35</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Pagos</p>
            <p className="text-xl font-semibold">18</p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}