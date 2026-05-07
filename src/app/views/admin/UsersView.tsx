"use client";

import AdminLayout from "@/components/admin/AdminLayout";

const mockUsers = [
  { id: "1", name: "Juan Pérez", email: "juan@test.com", status: "Activo" },
  { id: "2", name: "Ana Gómez", email: "ana@test.com", status: "Activo" },
  { id: "3", name: "Carlos Ruiz", email: "carlos@test.com", status: "Bloqueado" },
];

export default function UsersView() {
  return (
    <AdminLayout>
      <div className="space-y-6">

        <h1 className="text-2xl font-semibold">Usuarios</h1>

        <div className="h-0.5 w-12 bg-[#C7962D]" />

        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">

          <table className="w-full text-sm">

            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                <th className="text-left p-4">Nombre</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-right p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5">

                  <td className="p-4">{user.name}</td>
                  <td className="p-4 text-gray-400">{user.email}</td>

                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.status === "Activo"
                        ? "text-green-400 bg-green-500/10"
                        : "text-red-400 bg-red-500/10"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">

                    <button className="text-[#C7962D] hover:underline">
                      Editar
                    </button>

                    <button className="text-red-400 hover:underline">
                      Eliminar
                    </button>

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