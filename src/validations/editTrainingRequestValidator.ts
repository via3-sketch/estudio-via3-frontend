import { z } from "zod";

export const editTrainingRequestSchema =
  z.object({

    participantsCount: z
      .number()
      .min(
        1,
        "Debe haber al menos 1 participante",
      )
      .max(
        10000,
        "La cantidad de participantes es demasiado alta",
      ),

    objectives: z
      .string()
      .min(
        10,
        "Los objetivos deben tener al menos 10 caracteres",
      )
      .max(
        2000,
        "Los objetivos no pueden superar los 2000 caracteres",
      ),

    context: z
      .string()
      .min(
        10,
        "El contexto debe tener al menos 10 caracteres",
      )
      .max(
        3000,
        "El contexto no puede superar los 3000 caracteres",
      ),

  });