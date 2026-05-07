"use client";

import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerUser } from "@/services/auth.service";
import { registerSchema } from "@/validations/register.validations";

export default function RegisterForm() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name")?.toString() || "",

      email: formData.get("email")?.toString() || "",

      password: formData.get("password")?.toString() || "",

      confirmPassword:
        formData.get("confirmPassword")?.toString() || "",

      address: formData.get("address")?.toString() || "",

      city: formData.get("city")?.toString() || "",

      phone: Number(formData.get("phone")) || 0,

      country: formData.get("country")?.toString() || "",

      companyName:
        formData.get("companyName")?.toString() || "",
    };

    const result = registerSchema.safeParse(payload);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      await registerUser(result.data);

      alert("Usuario creado correctamente");
    } catch (err: any) {
      console.log(err);

      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <GoogleButton />

      <div className="text-center text-gray-500">o</div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            name="name"
            type="text"
            placeholder="Nombre completo"
          />
        </div>

        <div className="col-span-2">
          <Input
            name="email"
            type="email"
            placeholder="Correo electrónico"
          />
        </div>

        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
        />

        <Input
          name="address"
          type="text"
          placeholder="Dirección"
        />

        <Input
          name="phone"
          type="tel"
          placeholder="Teléfono"
        />

        <Input
          name="country"
          type="text"
          placeholder="País"
        />

        <Input
          name="city"
          type="text"
          placeholder="Ciudad"
        />

        <div className="col-span-2">
          <Input
            name="companyName"
            type="text"
            placeholder="Empresa"
          />
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-400">
        <input
          type="checkbox"
          className="mt-1 accent-[#C7962D]"
        />

        <span>
          Acepto los{" "}
          <span className="text-[#C7962D] cursor-pointer hover:underline">
            Términos y Condiciones
          </span>{" "}
          y la{" "}
          <span className="text-[#C7962D] cursor-pointer hover:underline">
            Política de Privacidad
          </span>
        </span>
      </div>

      <Button type="submit">Crear cuenta</Button>

      <p className="text-sm text-gray-400 text-center">
        ¿Ya tenés cuenta?{" "}
        <span className="text-[#C7962D] cursor-pointer hover:underline">
          Iniciar sesión
        </span>
      </p>
    </form>
  );
}