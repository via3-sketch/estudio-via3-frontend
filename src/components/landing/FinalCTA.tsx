import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#070707] px-6 py-28">
      <div className="mx-auto max-w-5xl text-center relative">

        
        <div className="absolute inset-0 flex justify-center">
          <div className="w-125 h-75 bg-[#C7962D]/20 blur-[120px] rounded-full"></div>
        </div>

        
        <div className="relative border border-white/10 rounded-2xl p-12 bg-white/5 backdrop-blur">

          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Empezá a transformar tu equipo hoy
          </h2>

          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
            Gestioná capacitaciones, coordiná reuniones y hacé seguimiento en una sola plataforma.
          </p>

          <Link
            href="/auth"
            className="inline-block px-10 py-5 rounded-md font-semibold text-lg bg-[#C7962D] text-black transition 
            hover:scale-105 hover:shadow-[0_0_30px_rgba(199,150,45,0.4)]"
          >
            Solicitar capacitación
          </Link>

        </div>
      </div>
    </section>
  );
}