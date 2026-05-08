import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
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
    .min(1, "La dirección es obligatoria")
    .min(2, "La dirección debe tener al menos 2 caracteres")
    .max(50, "La dirección no puede tener más de 50 caracteres"),

  phone: z
    .number()
    .min(1, "El teléfono es obligatorio"),

  country: z
    .string()
    .min(1, "El país es obligatorio")
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(20, "El país no puede tener más de 20 caracteres"),

  city: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(20, "La ciudad no puede tener más de 20 caracteres"),

  companyName: z
    .string()
    .min(1, "La empresa es obligatoria")
    .min(3, "La empresa debe tener al menos 2 caracteres")
    .max(20, "La empresa no puede tener más de 20 caracteres"),

})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
