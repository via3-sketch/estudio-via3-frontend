"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/AdminLayout";

import { getUsers } from "@/services/users.service";

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

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}