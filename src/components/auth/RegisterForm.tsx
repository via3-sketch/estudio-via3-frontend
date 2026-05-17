"use client";

import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import GoogleButton from "./GoogleButton";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import TermsModal from "./TermsModal";

import { registerUser } from "@/services/auth.service";

import { registerSchema } from "@/validations/register.validations";

import { toast } from "sonner";

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

export default function RegisterForm({
  onSwitchToLogin,
}: RegisterFormProps) {

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    acceptedTerms,
    setAcceptedTerms,
  ] = useState(false);

  const [
    showTermsModal,
    setShowTermsModal,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const handleSubmit = async (
    e: any,
  ) => {

    e.preventDefault();

    const form =
      e.currentTarget;

    const formData =
      new FormData(form);

    const payload = {

      name:
        formData.get("name")?.toString() ||
        "",

      email:
        formData.get("email")?.toString() ||
        "",

      password:
        formData
          .get("password")
          ?.toString() || "",

      confirmPassword:
        formData
          .get("confirmPassword")
          ?.toString() || "",

      address:
        formData
          .get("address")
          ?.toString() || "",

      city:
        formData
          .get("city")
          ?.toString() || "",

      phone:
        formData
          .get("phone")
          ?.toString() || "",

      country:
        formData
          .get("country")
          ?.toString() || "",

      companyName:
        formData
          .get("companyName")
          ?.toString() || "",
    };

    if (!acceptedTerms) {

      toast.warning(
        "Debes aceptar los términos y condiciones",
      );

      return;
    }

    const result =
      registerSchema.safeParse(
        payload,
      );

    if (!result.success) {

      toast.warning(
        result.error.issues[0].message,
      );

      return;
    }

    try {

      await registerUser(
        result.data,
      );

      form.reset();

      setShowPassword(false);

      setShowConfirmPassword(false);

      setAcceptedTerms(false);

      toast.success(
        "Cuenta creada correctamente",
      );

      onSwitchToLogin();

    } catch (err: any) {

      toast.error(
        "Error al registrarse",
      );
    }
  };

  return (
    <>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >

        <GoogleButton />

        <div className="text-center text-gray-500">
          o
        </div>

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

          <div className="col-span-2">

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

                  <EyeOff
                    size={18}
                  />

                ) : (

                  <Eye
                    size={18}
                  />

                )}

              </button>

            </div>

            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Mínimo 8 caracteres,
              incluyendo mayúscula,
              minúscula, número y
              carácter especial.
            </p>

          </div>

          <div className="col-span-2">

            <div className="relative">

              <Input
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirmar contraseña"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword,
                  )
                }
                className="absolute right-4 top-3 text-gray-400 hover:text-[#C7962D] transition"
              >

                {showConfirmPassword ? (

                  <EyeOff
                    size={18}
                  />

                ) : (

                  <Eye
                    size={18}
                  />

                )}

              </button>

            </div>

            <p className="mt-2 text-xs text-gray-500">
              Repetí la contraseña
            </p>

          </div>

          <div>

            <Input
              name="address"
              type="text"
              placeholder="Dirección"
            />

            <p className="mt-2 text-xs text-gray-500">
              Dirección de la empresa
            </p>

          </div>

          <div>

            <Input
              name="phone"
              type="tel"
              placeholder="Teléfono"
            />

            <p className="mt-2 text-xs text-gray-500">
              Número de contacto
            </p>

          </div>

          <div>

            <select
              name="country"
              defaultValue=""
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0D0D0D]
                px-4
                py-3
                text-sm
                text-white
                outline-none
                transition
                focus:border-[#C7962D]
              "
            >

              <option
                value=""
                disabled
              >
                🌍 Seleccionar país
              </option>

              <option value="Argentina">
                🇦🇷 Argentina
              </option>

              <option value="Uruguay">
                🇺🇾 Uruguay
              </option>

              <option value="Chile">
                🇨🇱 Chile
              </option>

              <option value="Brasil">
                🇧🇷 Brasil
              </option>

              <option value="México">
                🇲🇽 México
              </option>

              <option value="España">
                🇪🇸 España
              </option>

              <option value="Estados Unidos">
                🇺🇸 Estados Unidos
              </option>

            </select>

            <p className="mt-2 text-xs text-gray-500">
              País donde opera la
              empresa
            </p>

          </div>

          <div>

            <Input
              name="city"
              type="text"
              placeholder="Ciudad"
            />

            <p className="mt-2 text-xs text-gray-500">
              Ciudad principal
            </p>

          </div>

          <div className="col-span-2">

            <Input
              name="companyName"
              type="text"
              placeholder="Empresa"
            />

            <p className="mt-2 text-xs text-gray-500">
              Nombre de la empresa o
              institución
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3 text-sm text-gray-400">

          <button
            type="button"
            onClick={() =>
              setShowTermsModal(true)
            }
            className="
              mt-1
              h-4
              w-4
              rounded
              border
              border-white/20
              flex
              items-center
              justify-center
              bg-[#0D0D0D]
              transition
              hover:border-[#C7962D]
            "
          >

            {acceptedTerms && (

              <div className="h-2 w-2 rounded-sm bg-[#C7962D]" />

            )}

          </button>

          <span className="leading-relaxed">

            Acepto los{" "}

            <button
              type="button"
              onClick={() =>
                setShowTermsModal(true)
              }
              className="text-[#C7962D] hover:underline"
            >
              Términos y Condiciones
            </button>

          </span>

        </div>

        <Button
          type="submit"
          className="w-full"
        >
          Crear cuenta
        </Button>

        <p className="text-sm text-gray-400 text-center">

          ¿Ya tenés cuenta?{" "}

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#C7962D] hover:underline cursor-pointer"
          >
            Iniciar sesión
          </button>

        </p>

      </form>

      {showTermsModal && (

        <TermsModal
          onAccept={() => {

            setAcceptedTerms(true);

            setShowTermsModal(false);
          }}
          onClose={() =>
            setShowTermsModal(false)
          }
        />

      )}

    </>
  );
}