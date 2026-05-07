"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

export default function RequestDetailView({ id }: { id: string }) {

  const request = {
    id,
    company: "TechCorp",
    service: "Liderazgo",
    status: "Pendiente",
    description:
      "Necesitamos una capacitación para líderes de equipo enfocada en comunicación y gestión.",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

       
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Detalle de solicitud
            </h1>
            <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />
          </div>

          <Link href="/admin/requests">
            <button className="text-sm text-[#C7962D] hover:underline">
              ← Volver
            </button>
          </Link>
        </div>

        
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">

          <div>
            <p className="text-sm text-gray-400">Empresa</p>
            <p className="text-white font-medium">{request.company}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Servicio</p>
            <p className="text-white font-medium">{request.service}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Estado</p>
            <p className="text-yellow-400">{request.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Descripción</p>
            <p className="text-gray-300">{request.description}</p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}