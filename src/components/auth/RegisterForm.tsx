"use client";

import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  return (
    <form className="space-y-5">

      <GoogleButton />

      <div className="text-center text-gray-500">o</div>

      <Input type="text" placeholder="Nombre completo" />
      <Input type="email" placeholder="Correo electrónico" />
      <Input type="password" placeholder="Contraseña" />
      <Input type="password" placeholder="Confirmar contraseña" />

      <div className="flex items-start gap-2 text-sm text-gray-400">
        <input type="checkbox" className="mt-1 accent-[#C7962D]" />
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