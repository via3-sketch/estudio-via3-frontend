import { z } from "zod";

export const serviceSchema =
  z.object({
    title: z
      .string()
      .min(
        1,
        "El título es obligatorio",
      )
      .min(
        3,
        "El título debe tener al menos 3 caracteres",
      )
      .max(
        100,
        "El título no puede superar los 100 caracteres",
      ),

    shortDescription: z
      .string()
      .min(
        1,
        "La descripción corta es obligatoria",
      )
      .min(
        10,
        "La descripción corta debe tener al menos 10 caracteres",
      )
      .max(
        120,
        "La descripción corta no puede superar los 120 caracteres",
      ),

    description: z
      .string()
      .min(
        1,
        "La descripción es obligatoria",
      )
      .min(
        30,
        "La descripción debe tener al menos 30 caracteres",
      )
      .max(
        3000,
        "La descripción es demasiado larga",
      ),

    tagline: z
      .string()
      .min(
        1,
        "La tagline es obligatoria",
      )
      .min(
        5,
        "La tagline debe tener al menos 5 caracteres",
      )
      .max(
        120,
        "La tagline no puede superar los 120 caracteres",
      ),

    category: z
      .string()
      .min(
        1,
        "La categoría es obligatoria",
      )
      .min(
        3,
        "La categoría debe tener al menos 3 caracteres",
      )
      .max(
        50,
        "La categoría no puede superar los 50 caracteres",
      ),

    includes: z
      .array(
        z.string().min(
          2,
          "Los includes deben tener al menos 2 caracteres",
        ),
      )
      .min(
        1,
        "Debes agregar al menos un include",
      ),

    file: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          if (!file) return true;

          return [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
          ].includes(file.type);
        },
        {
          message:
            "Formato de imagen inválido",
        },
      )
      .refine(
        (file) => {
          if (!file) return true;

          return (
            file.size <=
            5 * 1024 * 1024
          );
        },
        {
          message:
            "La imagen no puede superar los 5MB",
        },
      ),
  });