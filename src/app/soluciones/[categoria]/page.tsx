import Link from "next/link";
import { soluciones } from "@/data/soluciones";

export default async function SolucionPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;

  const data = soluciones[categoria as keyof typeof soluciones];

  if (!data) {
    return (
      <div className="text-white p-10">
        No encontramos esta capacitación
      </div>
    );
  }

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          {data.title}
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          {data.description}
        </p>

      
        <div className="mb-12 p-6 border border-[#C7962D]/30 rounded-xl bg-[#C7962D]/5">
          <p className="text-white font-medium">
            {data.beneficio}
          </p>
        </div>

        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            ¿Qué incluye esta capacitación?
          </h2>

          <ul className="space-y-3 text-gray-300">
            {data.incluye.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

       
        <Link
          href={`/solicitudes?categoria=${categoria}`}
          className="inline-block px-8 py-4 bg-[#C7962D] text-black rounded-md font-semibold hover:opacity-90 transition w-full sm:w-auto"
        >
          Solicitar capacitación
        </Link>

      </div>
    </div>
  );
}