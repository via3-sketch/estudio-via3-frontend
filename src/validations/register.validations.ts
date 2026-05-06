import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio"),

  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Email inválido"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

  confirmPassword: z
    .string()
    .min(1, "Debes confirmar la contraseña"),

  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^[0-9]+$/, "El teléfono debe contener solo números"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
