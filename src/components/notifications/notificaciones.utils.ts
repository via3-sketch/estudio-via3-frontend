export const mensajesNotificaciones: Record<
  string,
  {
    titulo: string;
    descripcion: string;
  }
> = {

  TRAINING_REQUEST_ACCEPTED: {
    titulo:
      "Solicitud actualizada",

    descripcion:
      "Tu capacitación avanzó correctamente en el proceso.",
  },

  TRAINING_REQUEST_REJECTED: {
    titulo:
      "Solicitud cancelada",

    descripcion:
      "Tu capacitación fue cancelada.",
  },

  IN_REVIEW: {
    titulo:
      "Solicitud en revisión",

    descripcion:
      "Tu solicitud está siendo revisada.",
  },

  AWAITING_PAYMENT: {
    titulo:
      "Pago pendiente",

    descripcion:
      "Tu solicitud está esperando el pago.",
  },

  SCHEDULED: {
    titulo:
      "Capacitación agendada",

    descripcion:
      "Tu capacitación ya tiene una reunión programada.",
  },

  CONFIRMED: {
    titulo:
      "Capacitación confirmada",

    descripcion:
      "Tu capacitación fue confirmada correctamente.",
  },

  CANCELLED: {
    titulo:
      "Solicitud cancelada",

    descripcion:
      "La capacitación fue cancelada.",
  },
};

export const obtenerContenidoNotificacion =
  (type: string) => {

    return (
      mensajesNotificaciones[
        type
      ] ?? {
        titulo:
          "Nueva notificación",

        descripcion:
          "Tenés una nueva actualización.",
      }
    );
  };