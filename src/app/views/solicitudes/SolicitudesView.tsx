"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { createTrainingRequest } from "@/services/trainingRequests.service";

export default function SolicitudesView() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [trainingId, setTrainingId] = useState("");

  const [form, setForm] = useState({
    categoria: "",
    personas: "",
    objetivo: "",
    contexto: "",
  });

  useEffect(() => {
    const categoria =
      searchParams.get("categoria") || "";

    const trainingId =
      searchParams.get("trainingId") || "";

    setTrainingId(trainingId);

    setForm((prev) => ({
      ...prev,
      categoria,
    }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      await createTrainingRequest(
        {
          trainingId,

          participantsCount: Number(
            form.personas,
          ),

          objectives: form.objetivo,

          context: form.contexto,
        },

        token,
      );

      router.push("/mis-solicitudes");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Solicitar capacitación
        </h1>

        <p className="text-gray-400 mb-10">
          Completá el formulario y te
          contactaremos para diseñar una
          propuesta a medida.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="text-sm text-gray-300">
              Tipo de capacitación
            </label>

            <input
              name="categoria"
              value={form.categoria}
              disabled
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Cantidad de personas
            </label>

            <input
              name="personas"
              type="number"
              min={1}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Objetivo
            </label>

            <input
              name="objetivo"
              minLength={20}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Contexto
            </label>

            <textarea
              name="contexto"
              minLength={30}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-md bg-white/5 border border-white/10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Enviar solicitud
          </button>

        </form>
      </div>
    </div>
  );
}