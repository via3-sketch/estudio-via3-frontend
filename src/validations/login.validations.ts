import {z} from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Email inválido"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La constraseña debe contener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
    .regex(/[0-9]/, "La constraseña debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La constraseña debe contener al menos un carácter especial"),
});
