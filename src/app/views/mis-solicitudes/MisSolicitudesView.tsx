"use client";

import Link from "next/link";

export default function MisSolicitudesView() {
 
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("solicitudes")
      : null;

  const solicitudes = stored
    ? JSON.parse(stored)
    : [
        {
          id: "1",
          categoria: "Liderazgo de equipos",
          estado: "Pendiente",
          fecha: "12/05/2026",
        },
        {
          id: "2",
          categoria: "Comunicación y feedback",
          estado: "Aprobado",
          fecha: "10/05/2026",
        },
      ];

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-10">
          Mis solicitudes
        </h1>

        <div className="space-y-6">

          {solicitudes.map((sol: any) => {
          
            const agendaGuardada =
              typeof window !== "undefined"
                ? localStorage.getItem(`agenda-${sol.id}`)
                : null;

            const estadoVisual =
              sol.estado === "Pagado"
                ? "Pagado"
                : agendaGuardada
                ? "Agendado"
                : sol.estado;

            return (
              <div
                key={sol.id}
                className="border border-white/10 p-6 rounded-xl bg-white/5 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {sol.categoria}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Fecha: {sol.fecha}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4">

                  {/* 🔥 ESTADO */}
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      estadoVisual === "Pendiente"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : estadoVisual === "Aprobado"
                        ? "bg-blue-500/20 text-blue-400"
                        : estadoVisual === "Agendado"
                        ? "bg-purple-500/20 text-purple-400"
                        : estadoVisual === "Pagado"
                        ? "bg-green-500/20 text-green-400"
                        : ""
                    }`}
                  >
                    {estadoVisual}
                  </span>

                  <Link
                    href={`/mis-solicitudes/${sol.id}`}
                    className="text-sm text-[#C7962D] hover:underline"
                  >
                    Ver detalle
                  </Link>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}