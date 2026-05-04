"use client";

export default function CasosView() {
  const casos = [
    {
      nombre: "NexLog",
      iniciales: "NL",
      color: "bg-blue-500/20 text-blue-400",
      industria: "Operador logístico (AMBA)",
      problema:
        "Descoordinación entre equipos operativos y fallas en la comunicación interna.",
      solucion:
        "Capacitación en comunicación y feedback con sesiones prácticas.",
      resultado:
        "Mejora en la coordinación diaria y reducción de errores operativos.",
      impacto: "+25% eficiencia operativa",
      testimonio:
        "El equipo logró alinearse mucho mejor. Hoy tenemos procesos más claros y menos errores.",
    },
    {
      nombre: "FlowTech",
      iniciales: "FT",
      color: "bg-purple-500/20 text-purple-400",
      industria: "Startup SaaS (15 empleados)",
      problema:
        "Crecimiento rápido sin liderazgo claro en los equipos.",
      solucion:
        "Programa de formación en liderazgo y gestión ágil.",
      resultado:
        "Mayor autonomía y mejor toma de decisiones.",
      impacto: "+30% productividad del equipo",
      testimonio:
        "Pasamos de depender de pocos líderes a tener equipos mucho más autónomos.",
    },
    {
      nombre: "Comercial Delta",
      iniciales: "CD",
      color: "bg-green-500/20 text-green-400",
      industria: "Empresa comercial B2B",
      problema:
        "Bajo rendimiento comercial y poca colaboración entre áreas.",
      solucion:
        "Capacitación en habilidades comerciales y trabajo en equipo.",
      resultado:
        "Mejora en resultados y clima laboral.",
      impacto: "+18% rendimiento en ventas",
      testimonio:
        "El cambio en la dinámica del equipo fue inmediato, hoy trabajamos mucho mejor.",
    },
  ];

  return (
    <div className="bg-[#070707] text-white px-6 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-5xl">

       
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Casos reales de impacto
        </h1>

        <p className="text-gray-400 mb-12 max-w-2xl">
          Empresas que transformaron sus equipos a través de capacitaciones diseñadas a medida.
        </p>

       
        <div className="space-y-12">

          {casos.map((caso, index) => (
            <div
              key={index}
              className="border border-white/10 p-6 rounded-xl bg-white/5 hover:border-[#C7962D]/40 transition"
            >

            
              <div className="flex justify-between items-start mb-6">

                <div className="flex items-center gap-4">

                 
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold ${caso.color}`}
                  >
                    {caso.iniciales}
                  </div>

              
                  <div>
                    <h3 className="text-xl font-semibold">
                      {caso.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {caso.industria}
                    </p>
                  </div>

                </div>

              
                <span className="text-sm font-semibold text-[#C7962D]">
                  {caso.impacto}
                </span>

              </div>

       
              <div className="space-y-3 text-sm leading-relaxed">

                <p>
                  <span className="text-gray-400">Problema: </span>
                  {caso.problema}
                </p>

                <p>
                  <span className="text-gray-400">Solución: </span>
                  {caso.solucion}
                </p>

                <p>
                  <span className="text-gray-400">Resultado: </span>
                  {caso.resultado}
                </p>

              </div>

              
              <div className="mt-6 border-l-2 border-[#C7962D] pl-4 text-sm italic text-gray-300">
                “{caso.testimonio}”
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}