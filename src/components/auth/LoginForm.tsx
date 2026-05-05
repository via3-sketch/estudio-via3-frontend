"use client";

import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginUser } from "@/services/auth.service";

export default function LoginForm() {

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      const data = await loginUser(payload);

     
      localStorage.setItem("token", data.access_token);

      alert("Login exitoso");

    } catch (err: any) {
      console.log(err);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <GoogleButton />

      <div className="text-center text-gray-500">o</div>

      <Input name="email" type="email" placeholder="Correo electrónico" />
      <Input name="password" type="password" placeholder="Contraseña" />

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