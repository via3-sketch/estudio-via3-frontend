"use client";

import { useState } from "react";

import {toast} from "sonner";

export default function ContactoView() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const stored = localStorage.getItem("contacto");
    const mensajes = stored ? JSON.parse(stored) : [];

    const nuevoMensaje = {
      id: Date.now(),
      ...form,
      fecha: new Date().toLocaleDateString(),
    };

  
    localStorage.setItem(
      "contacto",
      JSON.stringify([nuevoMensaje, ...mensajes])
    );


  
    toast.success("Mensaje enviado correctamente");

    setForm({
      nombre: "",
      email: "",
      empresa: "",
      mensaje: "",
    });
  };

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-2xl">

        <h1 className="text-3xl font-semibold mb-6">
          Contacto
        </h1>

        <p className="text-gray-400 mb-10">
          Dejanos tu consulta y te responderemos a la brevedad.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          <input
            name="empresa"
            placeholder="Empresa"
            value={form.empresa}
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded"
          />

          <button className="cursor-pointer w-full py-3 bg-[#C7962D] text-black font-semibold rounded hover:opacity-90 transition">
            Enviar mensaje
          </button>

        </form>
      </div>
    </div>
  );
}