export default function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-gray-600 p-3 rounded hover:bg-gray-800 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5"
      />
      Continuar con Google
    </button>
  );
}