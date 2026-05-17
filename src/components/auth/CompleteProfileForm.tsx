"use client";

import { jwtDecode } from "jwt-decode";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { completeProfile } from "@/services/auth.service";

import { toast } from "sonner";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { completeProfileSchema } from "@/validations/completeProfile.validations";

type DecodedToken = {
  id: string;
};

type CompleteProfileFormData = {
  phone: string;
  country: string;
  companyName: string;
  city: string;
  address: string;
};

export default function CompleteProfileForm() {

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {
      errors, isValid
    },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onChange", // 
  });
  
 const address = watch("address");
 const phone = watch("phone");
 const country = watch("country");
 const city = watch("city");
 const companyName = watch("companyName");

const isDisabled = !address || !phone || !country || !city || !companyName || !isValid;

  const onSubmit = async (data: CompleteProfileFormData) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userSession="))
        ?.split("=")[1];

      if (!token) throw new Error("No token found");

      const decoded = jwtDecode<DecodedToken>(token);

      const res = await completeProfile(decoded.id, data);

      document.cookie = `userSession=${res.access_token}; path=/; max-age=604800; SameSite=Lax`;
      
      toast.success("Perfil completado");

      window.location.href = "/";
    } catch (err: any) {
      toast.error(err?.message || "Error al completar perfil");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div className="grid grid-cols-2 gap-4">

        <div>
            <Input
    type="tel"
    placeholder="Teléfono"
    {...register("phone")}
  />

  {errors.phone && (
    <p className="text-red-500 text-xs mt-1">
      {errors.phone.message}
    </p>
  )}

          <p className="mt-2 text-xs text-gray-500">
            Número de contacto de la
            empresa
          </p>
        </div>

        <div>

            <Controller
  control={control}
  name="country"
  render={({ field }) => (
    <select
      {...field}
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
  )} 
  />

          <p className="mt-2 text-xs text-gray-500">
            País donde opera la
            empresa
          </p>

        </div>

        <div>
                    <Input
    type="text"
    placeholder="Ciudad"
    {...register("city")}
  />

  {errors.city && (
    <p className="text-red-500 text-xs mt-1">
      {errors.city.message}
    </p>
  )}

          <p className="mt-2 text-xs text-gray-500">
            Ciudad principal
          </p>
        </div>

        <div>
                  <Input
    type="text"
    placeholder="Dirección"
    {...register("address")}
  />

  {errors.address && (
    <p className="text-red-500 text-xs mt-1">
      {errors.address.message}
    </p>
  )}

          <p className="mt-2 text-xs text-gray-500">
            Dirección empresarial
          </p>
        </div>

        <div className="col-span-2">

                <Input
    type="text"
    placeholder="Nombre de la empresa"
    {...register("companyName")}
  />

  {errors.companyName && (
    <p className="text-red-500 text-xs mt-1">
      {errors.companyName.message}
    </p>
  )}

          <p className="mt-2 text-xs text-gray-500">
            Nombre de la empresa o
            institución
          </p>

        </div>

      </div>

      <Button type="submit"         
      className={`w-full transition ${
    isDisabled
      && "opacity-20 cursor-not-allowed"
  }`}
        disabled={isDisabled}>
        Finalizar configuración
      </Button>

    </form>
  );
}