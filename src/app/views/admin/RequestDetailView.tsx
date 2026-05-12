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

  status:
    | "pending"
    | "in_review"
    | "scheduled"
    | "awaiting_payment"
    | "confirmed"
    | "cancelled";

  user?: {
    companyName?: string;
  };

  training?: {
    title?: string;
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
          localStorage.getItem(
            "token",
          );

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

  const getStatusLabel = (
    status: string,
  ) => {
    switch (status) {
      case "pending":
        return "Pendiente";

      case "in_review":
        return "En revisión";

      case "scheduled":
        return "Agendada";

      case "awaiting_payment":
        return "Esperando pago";

      case "confirmed":
        return "Confirmada";

      case "cancelled":
        return "Cancelada";

      default:
        return status;
    }
  };

  const getStatusColor = (
    status: string,
  ) => {
    switch (status) {
      case "pending":
        return "text-yellow-400";

      case "in_review":
        return "text-blue-400";

      case "scheduled":
        return "text-purple-400";

      case "awaiting_payment":
        return "text-orange-400";

      case "confirmed":
        return "text-green-400";

      case "cancelled":
        return "text-red-400";

      default:
        return "text-gray-300";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-white/10 bg-[#0B0D0F] p-6 text-gray-400">
          Cargando solicitud...
        </div>
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          No se encontró la solicitud.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-semibold text-white">
              Detalle de solicitud
            </h1>

            <div className="h-0.5 w-14 bg-[#C7962D] mt-3" />

          </div>

          <Link href="/admin/requests">
            <button className="text-sm text-[#C7962D] hover:underline">
              ← Volver
            </button>
          </Link>

        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0B0D0F] p-8 space-y-6">

          {request.training
            ?.title && (
            <div>

              <p className="text-sm text-gray-400">
                Capacitación
              </p>

              <p className="mt-1 text-xl font-medium text-white">
                {
                  request.training
                    .title
                }
              </p>

            </div>
          )}

          <div>

            <p className="text-sm text-gray-400">
              Empresa
            </p>

            <p className="mt-1 text-lg font-medium text-white">
              {request.user
                ?.companyName ||
                "Empresa"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-400">
              Participantes
            </p>

            <p className="mt-1 text-lg font-medium text-white">
              {
                request.participantsCount
              }
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-400">
              Estado
            </p>

            <p
              className={`mt-1 text-lg font-medium ${getStatusColor(
                request.status,
              )}`}
            >
              {getStatusLabel(
                request.status,
              )}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-400">
              Objetivos
            </p>

            <p className="mt-2 leading-relaxed text-gray-300">
              {request.objectives}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-400">
              Contexto organizacional
            </p>

            <p className="mt-2 leading-relaxed text-gray-300">
              {request.context}
            </p>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}