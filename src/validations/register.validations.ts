import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(12, "El nombre no puede tener más de 12 caracteres"),

  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Email inválido"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La constraseña debe contener al menos una mayúscula")
    .regex(/[a-z]/, "La constraseña debe contener al menos una minúscula")
    .regex(/[0-9]/, "La constraseña debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La constraseña debe contener al menos un carácter especial"),

  confirmPassword: z
    .string()
    .min(1, "Debes confirmar la contraseña"),

  address: z
    .string()
    .min(1, "La dirección es obligatoria"),

  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(/^[0-9]+$/, "El teléfono debe contener solo números"),

  country: z
    .string()
    .min(1, "El país es obligatorio"),

  city: z
    .string()
    .min(1, "La ciudad es obligatoria"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
