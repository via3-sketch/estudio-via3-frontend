"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/AdminLayout";

import Link from "next/link";

import {
  getTrainingRequests,
  updateTrainingRequest,
} from "@/services/trainingRequests.service";

type Request = {
  id: string;

  participantsCount: number;

  objectives: string;

  context: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  user?: {
    companyName?: string;
  };
};

const statusStyles = {
  PENDING:
    "bg-yellow-500/10 text-yellow-400",

  APPROVED:
    "bg-green-500/10 text-green-400",

  REJECTED:
    "bg-red-500/10 text-red-400",
};

export default function RequestsView() {
  const [requests, setRequests] =
    useState<Request[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getTrainingRequests(token);

        setRequests(data);
      } catch (error) {
        console.error(
          "Error obteniendo solicitudes",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: Request["status"],
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      await updateTrainingRequest(
        id,
        {
          status: newStatus,
        },
        token,
      );

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                status: newStatus,
              }
            : req,
        ),
      );
    } catch (error) {
      console.error(
        "Error actualizando estado",
        error,
      );
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-400">
          Cargando solicitudes...
        </div>
      </AdminLayout>
    );
  }

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
                <th className="p-4 text-left">
                  Empresa
                </th>

                <th className="p-4 text-left">
                  Objetivos
                </th>

                <th className="p-4 text-left">
                  Estado
                </th>

                <th className="p-4 text-right">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-white/5"
                >

                  <td className="p-4">
                    {req.user?.companyName ||
                      "Empresa"}
                  </td>

                  <td className="p-4 max-w-xs truncate">
                    {req.objectives}
                  </td>

                  <td className="p-4 space-y-2">

                    <span
                      className={`text-xs px-2 py-1 rounded block w-fit ${
                        statusStyles[
                          req.status
                        ]
                      }`}
                    >
                      {req.status ===
                      "PENDING"
                        ? "Pendiente"
                        : req.status ===
                          "APPROVED"
                        ? "Aprobada"
                        : "Rechazada"}
                    </span>

                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(
                          req.id,
                          e.target
                            .value as Request["status"],
                        )
                      }
                      className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
                    >
                      <option value="PENDING">
                        Pendiente
                      </option>

                      <option value="APPROVED">
                        Aprobada
                      </option>

                      <option value="REJECTED">
                        Rechazada
                      </option>
                    </select>

                  </td>

                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/requests/${req.id}`}
                    >
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