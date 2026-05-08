"use client";

import { useRouter } from "next/navigation";

import GoogleButton from "./GoogleButton";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { loginUser } from "@/services/auth.service";

import { loginSchema } from "@/validations/login.validations";

import { useUser } from "@/hooks/useUser";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email")?.toString() || "",

      password:
        formData.get("password")?.toString() || "",
    };

    const result = loginSchema.safeParse(payload);

    if (!result.success) {
      alert(result.error.issues[0].message);

      return;
    }

    try {
      const data = await loginUser(result.data);

      login(data.access_token);

      alert("Login exitoso");

      router.push("/");

    } catch (err: any) {
      console.log(err);

      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      <GoogleButton />

      <div className="text-center text-gray-500">
        o
      </div>

      <Input
        name="email"
        type="email"
        placeholder="Correo electrónico"
      />

      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
      />

      <div className="flex items-center justify-between text-sm">

        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="accent-[#C7962D]"
          />

          Recordarme
        </label>

        <span className="text-[#C7962D] cursor-pointer hover:underline">
          ¿Olvidaste tu contraseña?
        </span>

      </div>

      <Button type="submit">
        Acceder
      </Button>

      <p className="text-sm text-gray-400 text-center">

        ¿No tenés cuenta?{" "}

        <span className="text-[#C7962D] cursor-pointer hover:underline">
          Registrate
        </span>

      </p>

    </form>
  );
}