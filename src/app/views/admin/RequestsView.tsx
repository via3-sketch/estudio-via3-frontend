"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";

type Request = {
  id: string;
  company: string;
  service: string;
  status: "Pendiente" | "En proceso" | "Finalizada";
};

const initialRequests: Request[] = [
  {
    id: "1",
    company: "TechCorp",
    service: "Liderazgo",
    status: "Pendiente",
  },
  {
    id: "2",
    company: "Innova SRL",
    service: "Comunicación",
    status: "En proceso",
  },
];

const statusStyles = {
  Pendiente: "bg-yellow-500/10 text-yellow-400",
  "En proceso": "bg-blue-500/10 text-blue-400",
  Finalizada: "bg-green-500/10 text-green-400",
};

export default function RequestsView() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  const handleStatusChange = (id: string, newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

       
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Solicitudes
          </h1>

          <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />

          <p className="text-gray-400 mt-2">
            Gestión de solicitudes de capacitación.
          </p>
        </div>

        
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">

          <table className="w-full text-sm">

            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                <th className="p-4 text-left">Empresa</th>
                <th className="p-4 text-left">Servicio</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-white/5">

                  <td className="p-4">{req.company}</td>
                  <td className="p-4">{req.service}</td>

                  
                  <td className="p-4 space-y-2">

                    <span
                      className={`text-xs px-2 py-1 rounded block w-fit ${
                        statusStyles[req.status]
                      }`}
                    >
                      {req.status}
                    </span>

                    {/* SELECT EDITABLE */}
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(
                          req.id,
                          e.target.value as Request["status"]
                        )
                      }
                      className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>

                  </td>

                  
                  <td className="p-4 text-right">
                    <Link href={`/admin/requests/${req.id}`}>
                      <button className="text-[#C7962D] hover:underline">
                        Ver detalle
                      </button>
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </AdminLayout>
  );
}