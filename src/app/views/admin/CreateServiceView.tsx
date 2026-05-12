"use client";

import AdminLayout from "@/components/admin/AdminLayout";

import CreateServiceForm from "@/components/admin/CreateServiceForm";

export default function CreateServiceView() {
  return (
    <AdminLayout>

      <div className="flex justify-center">

        <div className="w-full max-w-3xl">

          <div className="mb-8">

            <h1 className="text-3xl font-semibold text-white">
              Crear servicio
            </h1>

            <div className="h-0.5 w-16 bg-[#C7962D] mt-3" />

            <p className="text-gray-400 mt-4 text-sm">
              Configurá una nueva capacitación para la plataforma.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B0D0F] p-8 shadow-2xl">

            <CreateServiceForm />

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}