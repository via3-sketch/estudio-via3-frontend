"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SolicitudesView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    categoria: "",
    personas: "",
    objetivo: "",
    contexto: "",
    email: "",
    empresa: "",
  });

  useEffect(() => {
    const categoria = searchParams.get("categoria") || "";

    setForm((prev) => ({
      ...prev,
      categoria,
    }));
  }, [searchParams]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const nuevaSolicitud = {
      id: Date.now().toString(),
      categoria: form.categoria,
      estado: "Aprobado",
      fecha: new Date().toLocaleDateString(),
      personas: form.personas,
      objetivo: form.objetivo,
      contexto: form.contexto,
    };

    const stored = localStorage.getItem("solicitudes");
    const solicitudes = stored ? JSON.parse(stored) : [];

    localStorage.setItem(
      "solicitudes",
      JSON.stringify([nuevaSolicitud, ...solicitudes])
    );

    router.push("/mis-solicitudes");
  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Solicitar capacitación
        </h1>

        <p className="text-gray-400 mb-10">
          Completá el formulario y te contactaremos para diseñar una propuesta a medida.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm text-gray-300">Tipo de capacitación</label>
            <input
              name="categoria"
              value={form.categoria}
              disabled
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Cantidad de personas</label>
            <input
              name="personas"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Objetivo</label>
            <input
              name="objetivo"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Contexto</label>
            <textarea
              name="contexto"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              name="email"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Empresa (opcional)</label>
            <input
              name="empresa"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition"
          >
            Enviar solicitud
          </button>

        </form>
      </div>
    </div>
  );
}