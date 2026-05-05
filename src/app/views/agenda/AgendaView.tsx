"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AgendaViewProps = {
  id: string;
};

export default function AgendaView({ id }: AgendaViewProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    fecha: "",
    horario: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

  
    localStorage.setItem(`agenda-${id}`, JSON.stringify(form));

    

    router.push(`/mis-solicitudes/${id}`);
  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Agendar reunión
        </h1>

        <p className="text-gray-400 mb-10">
          Seleccioná una fecha y horario para coordinar la reunión inicial.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm text-gray-300">Fecha</label>
            <input
              type="date"
              name="fecha"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Horario</label>
            <input
              type="time"
              name="horario"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition"
          >
            Confirmar reunión
          </button>

        </form>
      </div>
    </div>
  );
}