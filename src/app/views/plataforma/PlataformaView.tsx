import Link from "next/link";

export default function PlataformaView() {
  const categories = [
    {
      title: "Liderazgo de equipos",
      description:
        "Desarrollá habilidades para liderar personas y tomar decisiones estratégicas.",
      href: "/soluciones/liderazgo",
    },
    {
      title: "Comunicación y feedback",
      description:
        "Mejorá la comunicación interna, la retroalimentación y la motivación del equipo.",
      href: "/soluciones/comunicacion",
    },
    {
      title: "Gestión de personas",
      description:
        "Organizá equipos, asigná responsabilidades y gestioná el trabajo de manera eficiente.",
      href: "/soluciones/gestion-personas",
    },
    {
      title: "Productividad y resultados",
      description:
        "Potenciá el rendimiento y la eficiencia en el trabajo diario.",
      href: "/soluciones/productividad",
    },
    {
      title: "Desarrollo personal",
      description:
        "Fortalecé habilidades personales, gestión emocional y crecimiento profesional.",
      href: "/soluciones/desarrollo-personal",
    },
    {
      title: "Resolución de problemas",
      description:
        "Desarrollá habilidades para analizar situaciones y tomar decisiones efectivas.",
      href: "/soluciones/resolucion-problemas",
    },
    {
      title: "Trabajo colaborativo",
      description:
        "Mejorá la interacción entre equipos y la coordinación del trabajo.",
      href: "/soluciones/trabajo-colaborativo",
    },
    {
      title: "Gestión de proyectos",
      description:
        "Planificá, organizá y ejecutá proyectos utilizando metodologías ágiles.",
      href: "/soluciones/proyectos",
    },
  ];

  return (
    <div className="bg-[#070707] text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        
        <div className="max-w-xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Gestioná todas tus capacitaciones en un solo lugar
          </h1>

          <p className="text-gray-400">
            Explorá las distintas áreas de capacitación y elegí la que mejor se adapte a tu equipo.
          </p>
        </div>

       
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {categories.map((category, index) => (
            <Link key={index} href={category.href}>
              <div className="cursor-pointer border border-white/10 p-6 rounded-xl bg-white/5 transition hover:border-[#C7962D] hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(199,150,45,0.15)] h-full flex flex-col justify-between">

                <h3 className="text-lg font-semibold mb-2">
                  {category.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {category.description}
                </p>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}