"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import ServiceCard from "@/components/admin/ServiceCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const mockServices = [
  {
    id: "1",
    name: "Liderazgo",
    description: "Capacitación para equipos de trabajo",
    imgUrl: "/images/liderazgo.png",
  },
  {
    id: "2",
    name: "Comunicación",
    description: "Mejorá la comunicación organizacional",
    imgUrl: "/images/comunicacion.png",
  },
  {
    id: "3",
    name: "Trabajo en equipo",
    description: "Desarrollá equipos de alto rendimiento",
    imgUrl: "/images/equipo.png",
  },
  {
    id: "4",
    name: "Productividad",
    description: "Optimización del rendimiento organizacional",
    imgUrl: "/images/productividad.png",
  },
  {
    id: "5",
    name: "Innovación",
    description: "Fomentá la creatividad en tu empresa",
    imgUrl: "/images/innovacion.png",
  },
  {
    id: "6",
    name: "Bienestar",
    description: "Mejorá el clima laboral",
    imgUrl: "/images/bienestar.png",
  },
];

export default function ServicesView() {
  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Servicios
            </h1>

            <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />

            <p className="text-gray-400 mt-2">
              Gestión de capacitaciones disponibles.
            </p>
          </div>

          {/* BOTÓN CREAR */}
          <Link href="/admin/services/create">
            <Button>+ Crear servicio</Button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {mockServices.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No hay servicios disponibles.
          </div>
        )}

      </div>
    </AdminLayout>
  );
}