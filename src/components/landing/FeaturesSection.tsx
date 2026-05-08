import ServiceCard from "./ServiceCard";

import {
  FileText,
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
    },
    {
      title: "Seguimiento del proceso",
      description:
        "Consultá el estado de tus capacitaciones y solicitudes en tiempo real",
      icon: BarChart3,
    },
    {
      title: "Capacitaciones personalizadas",
      description:
        "Adaptamos cada formación según los objetivos y necesidades de tu equipo",
      icon: Users,
    },
    {
      title: "Pagos online",
      description:
        "Confirmá el servicio realizando una seña o reserva",
      icon: CreditCard,
    },
    {
      title: "Notificaciones y materiales",
      description:
        "Recibí avisos, propuestas y contenidos digitales desde la plataforma",
      icon: Bell,
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
            />
          ))}
        </div>

      </div>
    </section>
  );
}