"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/AdminLayout";

import {
  getUsers,
  deactivateUser,
} from "@/services/users.service";

import { toast } from "sonner";

type User = {
  id: string;

  firstName?: string;

  lastName?: string;

  email: string;

  isActive?: boolean;
};

export default function UsersView() {
  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      const data =
        await getUsers(token);

      setUsers(data);
    } catch (error) {
      console.error(
        "Error obteniendo usuarios",
        error,
      );

      toast.error(
        "Error obteniendo usuarios",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivate =
    async (id: string) => {
      try {
        const token =
          localStorage.getItem(
            "token",
          );

        if (!token) return;

        await deactivateUser(
          id,
          token,
        );

        toast.success(
          "Usuario bloqueado correctamente",
        );

        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? {
                  ...user,
                  isActive: false,
                }
              : user,
          ),
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Error bloqueando usuario",
        );
      }
    };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-gray-400">
          Cargando usuarios...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Usuarios
          </h1>

          <div className="h-0.5 w-12 bg-[#C7962D] mt-2" />

          <p className="text-gray-400 mt-2">
            Gestión de usuarios registrados.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">

          <table className="w-full text-sm">

            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                <th className="text-left p-4">
                  Nombre
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Estado
                </th>

                <th className="text-left p-4">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5"
                >

                  <td className="p-4">

                    {user.firstName ||
                    user.lastName
                      ? `${user.firstName || ""} ${
                          user.lastName || ""
                        }`
                      : "Usuario"}

                  </td>

                  <td className="p-4 text-gray-400">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        user.isActive
                          ? "text-green-400 bg-green-500/10"
                          : "text-red-400 bg-red-500/10"
                      }`}
                    >
                      {user.isActive
                        ? "Activo"
                        : "Inactivo"}
                    </span>

                  </td>

                  <td className="p-4">

                    {user.isActive && (
                      <button
                        onClick={() =>
                          handleDeactivate(
                            user.id,
                          )
                        }
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        Bloquear
                      </button>
                    )}

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