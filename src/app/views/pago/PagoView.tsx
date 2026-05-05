"use client";

import { useEffect, useState } from "react";

type PagoViewProps = {
  id: string;
};

export default function PagoView({ id }: PagoViewProps) {
  const [tipoPago, setTipoPago] = useState("seña");
  const [solicitud, setSolicitud] = useState<any>(null);

 
  useEffect(() => {
    const stored = localStorage.getItem("solicitudes");
    const solicitudes = stored ? JSON.parse(stored) : [];

    const encontrada = solicitudes.find(
      (s: any) => s.id.toString() === id
    );

    setSolicitud(encontrada);
  }, [id]);

  if (!solicitud) {
    return <p className="text-white p-10">Cargando...</p>;
  }

  
  const total = Number(solicitud.personas || 1) * 10000;
  const seña = total * 0.3;
  const monto = tipoPago === "seña" ? seña : total;

  const handlePago = () => {
    window.open("https://www.mercadopago.com.ar", "_blank");

    // 🔥 redirección correcta con ID
    setTimeout(() => {
      window.location.href = `/pago/${id}/confirmacion`;
    }, 2000);

  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Confirmar servicio
        </h1>

        <p className="text-gray-400 mb-10">
          Revisá la propuesta antes de avanzar con la reserva.
        </p>

        <div className="border border-white/10 p-6 rounded-xl bg-white/5 space-y-6">

          <div>
            <p className="text-gray-400 text-sm">Servicio</p>
            <p className="text-lg">{solicitud.categoria}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Participantes</p>
            <p>{solicitud.personas} personas</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Incluye</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✔ Diagnóstico inicial</li>
              <li>✔ Talleres prácticos</li>
              <li>✔ Seguimiento del equipo</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 space-y-4">
          <p className="text-sm text-gray-400">Seleccioná forma de pago</p>

          <div className="flex gap-4">

            <button
              onClick={() => setTipoPago("seña")}
              className={`flex-1 p-4 rounded-lg border ${
                tipoPago === "seña"
                  ? "border-[#C7962D] bg-[#C7962D]/10"
                  : "border-white/10"
              }`}
            >
              <p className="font-semibold">Seña</p>
              <p className="text-sm text-gray-400">30%</p>
            </button>

            <button
              onClick={() => setTipoPago("total")}
              className={`flex-1 p-4 rounded-lg border ${
                tipoPago === "total"
                  ? "border-[#C7962D] bg-[#C7962D]/10"
                  : "border-white/10"
              }`}
            >
              <p className="font-semibold">Total</p>
              <p className="text-sm text-gray-400">100%</p>
            </button>

          </div>
        </div>

        <div className="mt-10 border border-white/10 p-6 rounded-xl bg-white/5">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Total a pagar</p>
            <p className="text-2xl font-semibold text-[#C7962D]">
              ${monto.toLocaleString()} ARS
            </p>
          </div>
        </div>

        <button
          onClick={handlePago}
          className="w-full mt-10 py-4 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition"
        >
          Pagar con Mercado Pago
        </button>

      </div>
    </div>
  );
}