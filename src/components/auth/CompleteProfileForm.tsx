"use client";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import { completeProfile } from "@/services/auth.service";

type DecodedToken = {
  id: string;

  email: string;

  role: string;

  profileCompleted: boolean;
};

export default function CompleteProfileForm() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const decoded =
      jwtDecode<DecodedToken>(token);

    const formData = new FormData(
      e.currentTarget,
    );

    const payload = {
      phone:
        Number(formData.get("phone")) || 0,

      country:
        formData.get("country")?.toString() ||
        "",

      companyName:
        formData
          .get("companyName")
          ?.toString() || "",

      city:
        formData.get("city")?.toString() ||
        "",

      address:
        formData
          .get("address")
          ?.toString() || "",
    };

    try {
      await completeProfile(
        decoded.id,
        payload,
      );

      alert("Perfil completado");

      router.push("/");

    } catch (err) {
      console.log(err);

      alert(
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

        <Input
          name="phone"
          type="tel"
          placeholder="Teléfono"
        />

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

          <option value="" disabled>
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

        <Input
          name="city"
          type="text"
          placeholder="Ciudad"
        />

        <Input
          name="address"
          type="text"
          placeholder="Dirección"
        />

        <div className="col-span-2">

          <Input
            name="companyName"
            type="text"
            placeholder="Empresa"
          />

        </div>

      </div>

      <Button type="submit">
        Finalizar configuración
      </Button>

    </form>
  );
}