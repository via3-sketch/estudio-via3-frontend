import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/10 px-6 py-16 text-gray-400">
      <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-3">

        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="Viacore"
              className="h-8"
            />

            <span className="text-white font-semibold">
              VIACORE
            </span>
          </div>

          <p className="text-sm leading-relaxed">
            Plataforma de capacitación corporativa para gestionar el desarrollo
            de equipos de manera simple y eficiente.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Plataforma
          </h4>

          <ul className="space-y-3 text-sm">

            <li>
              <Link
                href="/plataforma"
                className="hover:text-white transition"
              >
                Explorar capacitaciones
              </Link>
            </li>

            <li>
              <a
                href="#como-funciona"
                className="hover:text-white transition"
              >
                Cómo funciona
              </a>
            </li>

            <li>
              <Link
                href="/casos"
                className="hover:text-white transition"
              >
                Casos reales
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">
            Contacto
          </h4>

          <p className="text-sm mb-2">
            contacto@viacore.com
          </p>

          <p className="text-xs text-gray-500">
            Respondemos dentro de las 24hs
          </p>
        </div>

      </div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Viacore. Todos los derechos reservados.
      </div>
    </footer>
  );
}