"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/AdminLayout";

import Link from "next/link";

import { getTrainingRequestById } from "@/services/trainingRequests.service";

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

export default function RequestDetailView({
  id,
}: {
  id: string;
}) {
  const [request, setRequest] =
    useState<Request | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getTrainingRequestById(
            id,
            token,
          );

        setRequest(data);
      } catch (error) {
        console.error(
          "Error obteniendo solicitud",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-400">
          Cargando solicitud...
        </div>
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout>
        <div className="text-red-400">
          No se encontró la solicitud.
        </div>
      </AdminLayout>
    );
  }

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
            <p className="text-sm text-gray-400">
              Empresa
            </p>

            <p className="text-white font-medium">
              {request.user?.companyName ||
                "Empresa"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Participantes
            </p>

            <p className="text-white font-medium">
              {request.participantsCount}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Estado
            </p>

            <p className="text-yellow-400">
              {request.status ===
              "PENDING"
                ? "Pendiente"
                : request.status ===
                  "APPROVED"
                ? "Aprobada"
                : "Rechazada"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Objetivos
            </p>

            <p className="text-gray-300">
              {request.objectives}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Contexto
            </p>

            <p className="text-gray-300">
              {request.context}
            </p>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}