import { z } from "zod";

export const contactSchema =
  z.object({
    nombre: z
      .string()
      .min(
        1,
        "El nombre es obligatorio",
      )
      .min(
        2,
        "El nombre debe tener al menos 2 caracteres",
      )
      .max(
        50,
        "El nombre no puede superar los 50 caracteres",
      ),

    email: z
      .string()
      .min(
        1,
        "El email es obligatorio",
      )
      .email(
        "Email inválido",
      ),

    empresa: z
      .string()
      .refine(
        (value) =>
          value === "" ||
          value.length >= 2,
        {
          message:
            "La empresa debe tener al menos 2 caracteres",
        },
      )
      .refine(
        (value) =>
          value.length <= 50,
        {
          message:
            "La empresa no puede superar los 50 caracteres",
        },
      ),

    mensaje: z
      .string()
      .min(
        1,
        "El mensaje es obligatorio",
      )
      .min(
        10,
        "El mensaje debe tener al menos 10 caracteres",
      )
      .max(
        1000,
        "El mensaje es demasiado largo",
      ),
  });