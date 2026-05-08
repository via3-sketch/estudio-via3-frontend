"use client";

import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { useRouter } from "next/navigation";

import GoogleButton from "./GoogleButton";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import { loginUser } from "@/services/auth.service";

import { loginSchema } from "@/validations/login.validations";

import { useUser } from "@/hooks/useUser";

type LoginFormProps = {
  onSwitchToRegister: () => void;
};

export default function LoginForm({
  onSwitchToRegister,
}: LoginFormProps) {
  const router = useRouter();

  const { login } = useUser();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const handleSubmit = async (
    e: any,
  ) => {
    e.preventDefault();

    const formData = new FormData(
      e.currentTarget,
    );

    const payload = {
      email:
        formData.get("email")?.toString() ||
        "",

      password:
        formData
          .get("password")
          ?.toString() || "",
    };

    const result =
      loginSchema.safeParse(payload);

    if (!result.success) {
      alert(
        result.error.issues[0].message,
      );

      return;
    }

    try {
      const data =
        await loginUser(result.data);

      login(data.access_token);

      alert("Login exitoso");

      router.push("/");

    } catch (err: any) {
      console.log(err);

      alert(
        "Credenciales incorrectas",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >

      <GoogleButton />

      <div className="text-center text-gray-500">
        o
      </div>

      <Input
        name="email"
        type="email"
        placeholder="Correo electrónico"
      />

      <div className="relative">

        <Input
          name="password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Contraseña"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword,
            )
          }
          className="absolute right-4 top-3 text-gray-400 hover:text-[#C7962D] transition"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

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

        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#C7962D] hover:underline"
        >
          Registrate
        </button>

      </p>

    </form>
  );
}