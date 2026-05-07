"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import CreateServiceForm from "@/components/admin/CreateServiceForm";

type Props = {
  id: string;
};

export default function EditServiceView({ id }: Props) {

  const mockService = {
    id,
    name: "Liderazgo",
    description: "Capacitación para equipos de trabajo",
    imgUrl: "/images/liderazgo.png",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Editar servicio
          </h1>

          <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />

          <p className="text-gray-400 mt-2">
            Modificá la información del servicio.
          </p>
        </div>

        {/* FORM CORREGIDO */}
        <CreateServiceForm
          initialData={{
            name: mockService.name,
            description: mockService.description,
            imgUrl: mockService.imgUrl,
          }}
        />

      </div>
    </AdminLayout>
  );
}