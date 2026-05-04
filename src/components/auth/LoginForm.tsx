"use client";

import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  return (
    <form className="space-y-5">

      <GoogleButton />

      <div className="text-center text-gray-500">o</div>

      <Input type="email" placeholder="Correo electrónico" />
      <Input type="password" placeholder="Contraseña" />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
          <input type="checkbox" className="accent-[#C7962D]" />
          Recordarme
        </label>

        <span className="text-[#C7962D] cursor-pointer hover:underline">
          ¿Olvidaste tu contraseña?
        </span>
      </div>

      <Button type="submit">Acceder</Button>

      <p className="text-sm text-gray-400 text-center">
        ¿No tenés cuenta?{" "}
        <span className="text-[#C7962D] cursor-pointer hover:underline">
          Registrate
        </span>
      </p>

    </form>
  );
}