"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  contactSchema,
} from "@/validations/contact.validations";

import { z } from "zod";

import Button from "@/components/ui/Button";

type ContactFormData = z.infer<
  typeof contactSchema
>;

export default function ContactoView() {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(
      contactSchema
    ),
    mode: "onChange",
  });

 const name = watch("name");
 const email = watch("email");
 const companyName = watch("companyName");
 const message = watch("message");

const isDisabled = !name || !email || !companyName || !message || !isValid;

  const onSubmit = (
    data: ContactFormData
  ) => {
    const stored =
      localStorage.getItem("contacto");

    const mensajes = stored
      ? JSON.parse(stored)
      : [];

    const nuevoMensaje = {
      id: Date.now(),
      ...data,
      fecha: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "contacto",
      JSON.stringify([
        nuevoMensaje,
        ...mensajes,
      ])
    );

    toast.success(
      "Mensaje enviado correctamente"
    );

    reset();
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div>
            <input
              type="text"
              placeholder="Nombre"
              {...register("name")}
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Empresa"
              {...register("companyName")}
              className="w-full p-3 bg-white/5 border border-white/10 rounded"
            />

            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Mensaje"
              {...register("message")}
              className="w-full p-3 bg-white/5 border border-white/10 rounded min-h-[140px]"
            />

            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

     <Button
        type="submit"
          className={`w-full transition ${
    isDisabled
      && "opacity-20 cursor-not-allowed"
  }`}
        disabled={isDisabled}
      >
        Enviar mensaje
      </Button>
        </form>
      </div>
    </div>
  );
}