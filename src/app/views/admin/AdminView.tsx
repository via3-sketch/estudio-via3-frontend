"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/AdminLayout";

import { getUsers } from "@/services/users.service";

import { getTrainingRequests } from "@/services/trainingRequests.service";

import { getAllTrainings } from "@/services/training.service";

export default function AdminView() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      users: 0,

      requests: 0,

      trainings: 0,
    });

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token",
            );

          if (!token) return;

          const [
            users,
            requests,
            trainings,
          ] = await Promise.all([
            getUsers(token),

            getTrainingRequests(
              token,
            ),

            getAllTrainings(),
          ]);

          setStats({
            users: users.length,

            requests:
              requests.length,

            trainings:
              trainings.length,
          });
        } catch (error) {
          console.error(
            "Error cargando dashboard",
            error,
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-400">
          Cargando dashboard...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-semibold text-white">
            Dashboard
          </h1>

          <div className="h-0.5 w-16 bg-[#C7962D] mt-3" />

          <p className="text-gray-400 mt-4">
            Panel de administración de la plataforma.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-[#0B0D0F] border border-white/10 shadow-lg">

            <p className="text-gray-400 text-sm">
              Usuarios
            </p>

            <p className="text-3xl font-semibold text-white mt-2">
              {stats.users}
            </p>

          </div>

          <div className="p-6 rounded-2xl bg-[#0B0D0F] border border-white/10 shadow-lg">

            <p className="text-gray-400 text-sm">
              Solicitudes
            </p>

            <p className="text-3xl font-semibold text-white mt-2">
              {stats.requests}
            </p>

          </div>

          <div className="p-6 rounded-2xl bg-[#0B0D0F] border border-white/10 shadow-lg">

            <p className="text-gray-400 text-sm">
              Capacitaciones
            </p>

            <p className="text-3xl font-semibold text-white mt-2">
              {stats.trainings}
            </p>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}