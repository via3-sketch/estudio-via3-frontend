"use client";

import Link from "next/link";

type SolicitudDetalleViewProps = {
  id: string;
};

export default function SolicitudDetalleView({ id }: SolicitudDetalleViewProps) {

  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("solicitudes")
      : null;

  const solicitudes = stored ? JSON.parse(stored) : [];

  const solicitud = solicitudes.find(
    (s: any) => s.id.toString() === id
  );

  if (!solicitud) {
    return (
      <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
        <div className="mx-auto max-w-4xl">
          <p>Solicitud no encontrada</p>
        </div>
      </div>
    );
  }

  const agendaGuardada =
    typeof window !== "undefined"
      ? localStorage.getItem(`agenda-${solicitud.id}`)
      : null;

  const tieneAgenda = !!agendaGuardada;

  const agendaData = agendaGuardada
    ? JSON.parse(agendaGuardada)
    : null;

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-10">
          Detalle de solicitud
        </h1>

      
        <div className="flex gap-2 text-xs text-gray-400 mb-6">
          <span>● Pendiente</span>
          <span>→</span>
          <span className={solicitud.estado === "Aprobado" ? "text-blue-400" : ""}>
            ● Aprobado
          </span>
          <span>→</span>
          <span className={tieneAgenda ? "text-purple-400" : ""}>
            ● Agendado
          </span>
          <span>→</span>
          <span className="text-gray-500">● Pagado</span>
        </div>

        
        <div className="space-y-6 border border-white/10 p-6 rounded-xl bg-white/5">

          <div>
            <p className="text-gray-400 text-sm">Capacitación</p>
            <p className="text-lg">{solicitud.categoria}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Estado</p>
            <p className="text-lg">
              {tieneAgenda ? "Agendado" : solicitud.estado}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Fecha</p>
            <p className="text-lg">{solicitud.fecha}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Cantidad de personas</p>
            <p className="text-lg">{solicitud.personas}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Objetivo</p>
            <p className="text-lg">{solicitud.objetivo}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Contexto</p>
            <p className="text-lg">{solicitud.contexto}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2">Notificaciones</p>

            <div className="space-y-1 text-sm">
              <p>✔️ Tu solicitud fue creada</p>

              {solicitud.estado === "Aprobado" && (
                <p className="text-blue-400">
                  ✔️ Tu solicitud fue aprobada
                </p>
              )}

              {tieneAgenda && (
                <p className="text-green-400">
                  ✔️ Reunión agendada correctamente
                </p>
              )}
            </div>
          </div>

        
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2">Materiales</p>

            <ul className="space-y-1 text-sm text-gray-300">
              <li>📄 Guía de trabajo</li>
              <li>📊 Presentación de la capacitación</li>
              <li>🧠 Ejercicios prácticos</li>
            </ul>
          </div>

        
          {tieneAgenda && agendaData && (
            <div>
              <p className="text-gray-400 text-sm">Reunión agendada</p>
              <p className="text-lg">
                {agendaData.fecha} - {agendaData.horario}
              </p>
            </div>
          )}

        </div>

      
        {solicitud.estado === "Aprobado" && !tieneAgenda && (
          <div className="mt-10 flex justify-between items-center">
            <span className="text-sm text-blue-400">
              Tu solicitud fue aprobada, coordiná la reunión
            </span>

            <Link
              href={`/agenda/${solicitud.id}`}
              className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold hover:opacity-90 transition"
            >
              Agendar reunión
            </Link>
          </div>
        )}

      
        {tieneAgenda && (
          <div className="mt-10 flex justify-between items-center">
            <span className="text-sm text-green-400">
              Reunión agendada, podés avanzar al pago
            </span>

            <Link
              href={`/pago/${solicitud.id}`}
              className="px-6 py-3 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition"
            >
              Pagar servicio
            </Link>
          </div>
        )}

        <Link
          href="/mis-solicitudes"
          className="inline-block mt-10 text-[#C7962D] hover:underline"
        >
          ← Volver
        </Link>

      </div>
    </div>
  );
}