"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import CreateServiceForm from "@/components/admin/CreateServiceForm";

export default function CreateServiceView() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Crear servicio
          </h1>
          <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />
          <p className="text-gray-400 mt-2">
            Completá la información del nuevo servicio.
          </p>
        </div>

        <CreateServiceForm />
      </div>
    </AdminLayout>
  );
}