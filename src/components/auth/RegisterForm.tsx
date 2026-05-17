"use client";
import {useState} from "react";
import { Eye, EyeOff} from "lucide-react";
import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerUser } from "@/services/auth.service";
import { registerSchema } from "@/validations/register.validations";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

export default function RegisterForm({
  onSwitchToLogin,
}: RegisterFormProps) {

  const [ showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword] = useState(false);
const {
  control,
  register,
  handleSubmit,
  watch,
  formState: {
    errors, isValid
  },
} = useForm({
  resolver: zodResolver(registerSchema),
  mode: "onChange", // 
});

 const name = watch("name")
 const email = watch("email");
 const password = watch("password");
 const confirmPassword = watch("confirmPassword");
 const address = watch("address");
 const phone = watch("phone");
 const country = watch("country");
 const city = watch("city");
 const companyName = watch("companyName");

const isDisabled = !name || !email || !password || !confirmPassword || !address || !phone || !country || !city || !companyName || !isValid;

const onSubmit = async (data: any) => {
  if (!acceptedTerms) {
    toast.warning(
      "Debes aceptar los términos y condiciones"
    );

    return;
  }

  try {
    await registerUser(data);

    toast.success(
      "Cuenta creada correctamente"
    );

    setShowPassword(false);

    setShowConfirmPassword(false);

    onSwitchToLogin();

  } catch {
    toast.error(
      "Error al registrarse"
    );
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
    type="text"
    placeholder="Nombre completo"
    {...register("name")}
  />

  {errors.name && (
    <p className="text-red-500 text-xs mt-1">
      {errors.name.message as string}
    </p>
  )}
</div>

        <div className="col-span-2">
      <Input
    type="email"
    placeholder="Email"
    {...register("email")}
  />

  {errors.email && (
    <p className="text-red-500 text-xs mt-1">
      {errors.email.message}
    </p>
  )}
        </div>

        <div className="col-span-2">

          <div className="relative">

<Input
  type={
    showPassword
      ? "text"
      : "password"
  }
  placeholder="Contraseña"
  {...register("password")}
/>

{
  errors.password && (
    <p className="text-red-500 text-xs mt-1">
      {errors.password.message}
    </p>
  )
}

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
  type={
    showConfirmPassword
      ? "text"
      : "password"
  }
  placeholder="Confirmar contraseña"
  {...register(
    "confirmPassword"
  )}
/>

{
  errors.confirmPassword && (
    <p className="text-red-500 text-xs mt-1">
      {
        errors.confirmPassword
          .message
      }
    </p>
  )
}

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
            Dirección de la empresa
          </p>
        </div>

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
            Número de contacto
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

      <div className="flex items-start gap-2 text-sm text-gray-400">

        <input
          type="checkbox"
          className="mt-1 accent-[#C7962D] cursor-pointer"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
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

      <Button type="submit"      
       className={`w-full transition ${
    isDisabled
      && "opacity-20 cursor-not-allowed"
  }`}
        disabled={isDisabled}>
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
  );
}