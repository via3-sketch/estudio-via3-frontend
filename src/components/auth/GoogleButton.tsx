"use client";

export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    window.location.href = "https://estudio-via3-backend-production.up.railway.app/auth/google";
  };

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
          w-full
          border
          border-[#C7962D]/40
          bg-[#111111]
          hover:bg-[#181818]
          text-white
          rounded-xl
          py-3
          px-6
          flex
          items-center
          justify-center
          gap-3
          font-medium
          transition-all
          duration-300
          cursor-pointer
          hover:border-[#C7962D]
          hover:shadow-[0_0_20px_rgba(199,150,45,0.15)]
        "
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        <span>Continuar con Google</span>
      </button>
    </div>
  );
}
