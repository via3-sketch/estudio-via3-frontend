"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import GoogleButton from "./GoogleButton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import TermsModal from "./TermsModal";
import { registerUser, loginUser } from "@/services/auth.service";
import { registerSchema } from "@/validations/register.validations";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    phone: "",
    country: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValues = { ...formData, [name]: value };
    setFormData(updatedValues);

    const result = registerSchema.safeParse(updatedValues);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.warning("Debes aceptar los términos y condiciones");
      return;
    }

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      toast.warning("Revisá los campos del formulario");
      return;
    }

    try {
      await registerUser(result.data);
      toast.success("Cuenta creada. Iniciando sesión automáticamente...");
      const loginData = await loginUser({
        email: result.data.email,
        password: result.data.password,
      });

      login(loginData.access_token);
      document.cookie = `userSession=${loginData.access_token}; path=/; max-age=604800; SameSite=Lax`;
      const returnTo = searchParams.get("returnTo");
      const pending = localStorage.getItem("pendingRequest");

      if (returnTo) {
        router.push(returnTo);
      } else if (pending) {
        const { trainingId, categoria } = JSON.parse(pending);
        localStorage.removeItem("pendingRequest");
        router.push(`/solicitudes?categoria=${encodeURIComponent(categoria)}&trainingId=${trainingId}`);
      } else {
        router.push("/plataforma");
      }
    } catch (err: any) {
      const mensajeBackend = err?.message || "Error al registrarse";
      toast.error(mensajeBackend);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <GoogleButton />

        <div className="text-center text-gray-500">o</div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input name="name" type="text" placeholder="Nombre completo" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="col-span-2">
            <Input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="col-span-2">
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-[#C7962D] transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y carácter especial.
            </p>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="col-span-2">
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-[#C7962D] transition cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">Repetí la contraseña</p>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <Input name="address" type="text" placeholder="Dirección" value={formData.address} onChange={handleChange} />
            <p className="mt-2 text-xs text-gray-500">Dirección de la empresa</p>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <Input name="phone" type="tel" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
            <p className="mt-2 text-xs text-gray-500">Número de contacto</p>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C7962D]"
            >
              <option value="" disabled>🌍 Seleccionar país</option>
              <option value="Argentina">🇦🇷 Argentina</option>
              <option value="Brasil">🇧🇷 Brasil</option>
              <option value="Chile">🇨🇱 Chile</option>
              <option value="Colombia">🇨🇴 Colombia</option>
              <option value="España">🇪🇸 España</option>
              <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
              <option value="México">🇲🇽 México</option>
              <option value="Perú">🇵🇪 Perú</option>
              <option value="Uruguay">🇺🇾 Uruguay</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">País donde opera la empresa</p>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>

          <div>
            <Input name="city" type="text" placeholder="Ciudad" value={formData.city} onChange={handleChange} />
            <p className="mt-2 text-xs text-gray-500">Ciudad principal</p>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div className="col-span-2">
            <Input name="companyName" type="text" placeholder="Empresa" value={formData.companyName} onChange={handleChange} />
            <p className="mt-2 text-xs text-gray-500">Nombre de la empresa o institución</p>
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-gray-400">
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="mt-1 h-4 w-4 rounded border border-white/20 flex items-center justify-center bg-[#0D0D0D] transition hover:border-[#C7962D]"
          >
            {acceptedTerms && (
              <div className="h-2 w-2 rounded-sm bg-[#C7962D]" />
            )}
          </button>
          <span className="leading-relaxed">
            Acepto los{" "}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-[#C7962D] hover:underline"
            >
              Términos y Condiciones
            </button>
          </span>
        </div>

        <Button type="submit" className="w-full">
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
          onClose={() => setShowTermsModal(false)}
        />
      )}
    </>
  );
}