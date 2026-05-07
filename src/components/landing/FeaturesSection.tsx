import ServiceCard from "./ServiceCard";

import {
  FileText,
  Calendar,
  BarChart3,
  Users,
  CreditCard,
  Bell,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Solicitudes de capacitación",
      description:
        "Completá un formulario y definí las necesidades de tu empresa",
      icon: FileText,
      href: "/solicitudes",
    },
    {
      title: "Agenda de reuniones",
      description:
        "Elegí fecha y horario para coordinar una reunión inicial",
      icon: Calendar,
      href: "/agenda",
    },
    {
      title: "Seguimiento en tiempo real",
      description:
        "Visualizá el estado de cada capacitación en todo momento",
      icon: BarChart3,
      href: "/seguimiento",
    },
    {
      title: "Gestión de participantes",
      description:
        "Indicá cantidad de personas y objetivos de formación",
      icon: Users,
      href: "/participantes",
    },
    {
      title: "Pagos online",
      description:
        "Confirmá el servicio realizando una seña o reserva",
      icon: CreditCard,
      href: "/pagos",
    },
    {
      title: "Notificaciones y materiales",
      description:
        "Recibí avisos y accedé a propuestas y contenidos digitales",
      icon: Bell,
      href: "/notificaciones",
    },
  ];

  return (
    <section className="bg-[#070707] text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Todo lo que podés hacer en la plataforma
          </h2>

          <p className="text-gray-400">
            Gestioná capacitaciones de principio a fin desde un solo lugar
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {features.map((feature, index) => (
            <ServiceCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
            />
          ))}
        </div>

      </div>
    </section>
  );
}