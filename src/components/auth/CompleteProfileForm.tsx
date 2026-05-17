"use client";

import { jwtDecode } from "jwt-decode";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { completeProfile } from "@/services/auth.service";

import { toast } from "sonner";

type DecodedToken = {
  id: string;
};

export default function CompleteProfileForm() {

  const handleSubmit = async (
    e: any,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const payload = {
      phone:
        formData.get("phone")?.toString() || "",

      country:
        formData.get("country")?.toString() || "",

      companyName:
        formData.get("companyName")?.toString() || "",

      city:
        formData.get("city")?.toString() || "",

      address:
        formData.get("address")?.toString() || "",
    };

    try {
      const token = document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith("userSession="),
        )
        ?.split("=")[1];

      if (!token) {
        throw new Error("No token found");
      }

      const decoded =
        jwtDecode<DecodedToken>(token);

      const id = decoded.id;

      const res =
        await completeProfile(
          id,
          payload,
        );

      document.cookie =
        `userSession=${res.access_token}; path=/; max-age=604800; SameSite=Lax`;

      toast.success(
        "Perfil completado",
      );

      form.reset();

      window.location.href = "/";

    } catch (err: any) {

      console.log(err);

      toast.error(
        err?.message ||
        "Error al completar perfil",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="grid grid-cols-2 gap-4">

        <div>
          <Input
            name="phone"
            type="tel"
            placeholder="Teléfono"
          />

          <p className="mt-2 text-xs text-gray-500">
            Número de contacto de la
            empresa
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

        <div>
          <Input
            name="address"
            type="text"
            placeholder="Dirección"
          />

          <p className="mt-2 text-xs text-gray-500">
            Dirección empresarial
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

      <Button type="submit">
        Finalizar configuración
      </Button>

    </form>
  );
}