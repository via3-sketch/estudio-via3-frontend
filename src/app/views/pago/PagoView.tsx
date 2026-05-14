"use client";

import { useEffect, useState } from "react";

type PagoViewProps = {
  id: string;
};

export default function PagoView({ id }: PagoViewProps) {
  const [solicitud, setSolicitud] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  const precioPorPersona = 30000;
  const total = Number(solicitud.personas || 1) * precioPorPersona;

  const handlePago = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/create-preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: solicitud.id,
          title: solicitud.categoria,
          quantity: solicitud.personas,
          unit_price: precioPorPersona,
        }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point; 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-semibold mb-6">
          Confirmar servicio
        </h1>

        <div className="border border-white/10 p-6 rounded-xl bg-white/5 space-y-4">
          <p>Servicio: {solicitud.categoria}</p>
          <p>Participantes: {solicitud.personas}</p>
          <p>Precio por persona: $30.000 ARS</p>
        </div>

        <div className="mt-6 border border-white/10 p-6 rounded-xl bg-white/5 flex justify-between">
          <p>Total</p>
          <p className="text-[#C7962D] text-2xl font-semibold">
            ${total.toLocaleString()} ARS
          </p>
        </div>

        <button
          onClick={handlePago}
          disabled={loading}
          className="w-full mt-10 py-4 bg-[#C7962D] text-black rounded-md font-semibold"
        >
          {loading ? "Redirigiendo..." : "Pagar con Mercado Pago"}
        </button>

      </div>
    </div>
  );
}