export default function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Creá tu cuenta",
      description:
        "Registrá tu empresa y accedé a la plataforma para comenzar a gestionar capacitaciones.",
    },
    {
      number: "02",
      title: "Solicitá una capacitación",
      description:
        "Completá un formulario con los objetivos, cantidad de personas y necesidades de tu equipo.",
    },
    {
      number: "03",
      title: "Gestioná todo el proceso",
      description:
        "Coordiná reuniones, hacé seguimiento y accedé a materiales desde un solo lugar.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="bg-[#070707] text-white px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">

     
        <div className="max-w-xl mb-16">

        
          <div className="w-10 h-0.5 bg-[#C7962D] mb-4"></div>

          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Cómo funciona
          </h2>

          <p className="text-gray-400">
            Empezá a gestionar capacitaciones en simples pasos
          </p>
        </div>

    
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group border border-white/10 rounded-xl p-6 bg-white/5 transition hover:border-[#C7962D] hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(199,150,45,0.15)]"
            >

              
              <span className="text-[#C7962D] text-lg font-bold">
                {step.number}
              </span>

              
              <h3 className="text-xl font-semibold mt-3 mb-3 transition group-hover:text-white">
                {step.title}
              </h3>

            
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}