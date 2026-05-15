"use client";

import {
  useEffect,
  useState,
  type SubmitEvent,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  editTrainingRequest,
  getTrainingRequestById,
} from "@/services/trainingRequests.service";

type Props = {
  id: string;
};

type Solicitud = {
  id: string;

  participantsCount: number;

  objectives: string;

  context: string;

  status: string;

  training?: {
    title?: string;
  };
};

export default function EditarSolicitudView({
  id,
}: Props) {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    participantsCount,
    setParticipantsCount,
  ] = useState(1);

  const [objectives, setObjectives] =
    useState("");

  const [context, setContext] =
    useState("");

  const [solicitud, setSolicitud] =
    useState<Solicitud | null>(
      null,
    );

  useEffect(() => {
    const fetchSolicitud =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token",
            );

          if (!token) return;

          const data =
            await getTrainingRequestById(
              id,
              token,
            );

          setSolicitud(data);

          setParticipantsCount(
            data.participantsCount,
          );

          setObjectives(
            data.objectives,
          );

          setContext(
            data.context,
          );
        } catch (error) {
          console.error(
            "Error obteniendo solicitud",
            error,
          );

          toast.error(
            "Error cargando la solicitud",
          );
        } finally {
          setLoading(false);
        }
      };

    fetchSolicitud();
  }, [id]);

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "token",
        );

      if (!token) {
        toast.warning(
          "Debes iniciar sesión",
        );

        return;
      }

      await editTrainingRequest(
        id,
        {
          participantsCount,

          objectives,

          context,
        },
        token,
      );

      toast.success(
        "Solicitud actualizada correctamente",
      );

      router.push(
        `/mis-solicitudes/${id}`,
      );
    } catch (error) {
      console.error(
        "Error actualizando solicitud",
        error,
      );

      toast.error(
        "Error actualizando solicitud",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-[#0B0D0F] p-6 text-gray-400">
          Cargando solicitud...
        </div>
      </div>
    );
  }

  if (!solicitud) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          No se encontró la solicitud.
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-semibold text-white">
            Editar solicitud
          </h1>

          <div className="mt-3 h-0.5 w-16 bg-[#C7962D]" />

          <p className="mt-4 text-gray-400">
            Actualizá la información de tu solicitud.
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6 rounded-2xl border border-white/10 bg-[#0B0D0F] p-8"
        >
          {solicitud.training
            ?.title && (
            <div>
              <p className="text-sm text-gray-400">
                Capacitación
              </p>

              <p className="mt-2 text-lg font-medium text-white">
                {
                  solicitud
                    .training
                    .title
                }
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Participantes
            </label>

            <input
              type="number"
              min={1}
              value={
                participantsCount
              }
              onChange={(e) =>
                setParticipantsCount(
                  Number(
                    e.target.value,
                  ),
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Objetivos
            </label>

            <textarea
              value={objectives}
              onChange={(e) =>
                setObjectives(
                  e.target.value,
                )
              }
              className="min-h-35 w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Contexto organizacional
            </label>

            <textarea
              value={context}
              onChange={(e) =>
                setContext(
                  e.target.value,
                )
              }
              className="min-h-35 w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#C7962D] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {saving
              ? "Guardando..."
              : "Guardar cambios"}
          </button>
        </form>
      </div>
    </section>
  );
}