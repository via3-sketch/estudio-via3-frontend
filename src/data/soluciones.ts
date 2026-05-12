export type Solucion = {
  title: string;
  description: string;
  incluye: string[];
  beneficio: string;
};

export const soluciones: Record<string, Solucion> = {
  liderazgo: {
    title: "Liderazgo de equipos",
    description:
      "Desarrollá habilidades para liderar personas y tomar decisiones estratégicas.",
    incluye: [
      "Diagnóstico del equipo",
      "Entrenamiento en liderazgo",
      "Seguimiento de resultados",
    ],
    beneficio:
      "Lográ equipos más alineados y con mejores resultados.",
  },

  comunicacion: {
    title: "Comunicación y feedback",
    description:
      "Mejorá la comunicación interna y la motivación del equipo.",
    incluye: [
      "Talleres de comunicación",
      "Prácticas de feedback",
      "Dinámicas grupales",
    ],
    beneficio:
      "Mejorá la claridad en la comunicación y reducí los conflictos del equipo.",
  },

  productividad: {
    title: "Productividad y resultados",
    description:
      "Potenciá el rendimiento y la eficiencia en el trabajo diario.",
    incluye: [
      "Gestión del tiempo",
      "Optimización de procesos",
      "Seguimiento de objetivos",
    ],
    beneficio:
      "Mejorá el rendimiento del equipo.",
  },

  "gestion-personas": {
    title: "Gestión de personas",
    description:
      "Organizá equipos y asigná responsabilidades de forma eficiente.",
    incluye: [
      "Delegación de tareas",
      "Asignación de roles",
      "Seguimiento del equipo",
    ],
    beneficio:
      "Equipos más organizados y eficientes.",
  },

  "desarrollo-personal": {
    title: "Desarrollo personal",
    description:
      "Fortalecé habilidades personales y crecimiento profesional.",
    incluye: [
      "Gestión emocional",
      "Autodesarrollo",
      "Hábitos laborales",
    ],
    beneficio:
      "Personas más preparadas y motivadas.",
  },

  "resolucion-problemas": {
    title: "Resolución de problemas",
    description:
      "Aprendé a analizar situaciones y tomar decisiones.",
    incluye: [
      "Análisis de situaciones",
      "Toma de decisiones",
      "Resolución práctica",
    ],
    beneficio:
      "Mejores decisiones en el equipo.",
  },

  "trabajo-colaborativo": {
    title: "Trabajo colaborativo",
    description:
      "Mejorá la coordinación entre equipos.",
    incluye: [
      "Trabajo en equipo",
      "Comunicación interáreas",
      "Reuniones efectivas",
    ],
    beneficio:
      "Equipos más conectados y eficientes.",
  },

  proyectos: {
    title: "Gestión de proyectos",
    description:
      "Planificá y ejecutá proyectos con metodologías ágiles.",
    incluye: [
      "Scrum / Agile",
      "Planificación",
      "Seguimiento",
    ],
    beneficio:
      "Proyectos mejor organizados y ejecutados.",
  },
};