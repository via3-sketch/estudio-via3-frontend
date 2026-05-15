"use client";

import {
  useEffect,
  useState,
  type SubmitEvent,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import AdminLayout from "@/components/admin/AdminLayout";

import {
  getTrainingById,
  updateTraining,
} from "@/services/training.service";

type Props = {
  id: string;
};

export default function EditServiceView({
  id,
}: Props) {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [
    shortDescription,
    setShortDescription,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [tagline, setTagline] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [includes, setIncludes] =
    useState<string[]>([]);

  const [includeInput, setIncludeInput] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  useEffect(() => {

    const fetchService =
      async () => {

        try {

          const data =
            await getTrainingById(
              id,
            );

          setTitle(
            data.title || "",
          );

          setShortDescription(
            data.description ||
              "",
          );

          setDescription(
            data.description ||
              "",
          );

          setTagline(
            data.tagline || "",
          );

          setCategory(
            data.category || "",
          );

          setIncludes(
            data.includes || [],
          );

        } catch (error) {

          console.error(error);

          toast.error(
            "Error cargando servicio",
          );

        } finally {

          setLoading(false);

        }
      };

    fetchService();

  }, [id]);

  const handleAddInclude =
    () => {

      if (
        !includeInput.trim()
      ) return;

      setIncludes((prev) => [
        ...prev,
        includeInput,
      ]);

      setIncludeInput("");
    };

  const handleRemoveInclude =
    (
      index: number,
    ) => {

      setIncludes((prev) =>
        prev.filter(
          (_, i) =>
            i !== index,
        ),
      );
    };

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

      const formData =
        new FormData();

      formData.append(
        "title",
        title,
      );

      formData.append(
        "shortDescription",
        shortDescription,
      );

      formData.append(
        "description",
        description,
      );

      formData.append(
        "tagline",
        tagline,
      );

      formData.append(
        "category",
        category,
      );

      includes.forEach(
        (include) => {

          formData.append(
            "includes",
            include,
          );

        },
      );

      if (file) {

        formData.append(
          "file",
          file,
        );
      }

      await updateTraining(
        id,
        formData,
        token,
      );

      toast.success(
        "Servicio actualizado correctamente",
      );

      router.push(
        "/admin/services",
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Error actualizando servicio",
      );

    } finally {

      setSaving(false);

    }
  };

  if (loading) {

    return (
      <AdminLayout>

        <div className="text-gray-400">
          Cargando servicio...
        </div>

      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-semibold text-white">
            Editar servicio
          </h1>

          <div className="h-0.5 w-16 bg-[#C7962D] mt-3" />

          <p className="text-gray-400 mt-4">
            Modificá la información del servicio.
          </p>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6 rounded-2xl border border-white/10 bg-[#0B0D0F] p-8"
        >

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Título
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Descripción corta
            </label>

            <input
              type="text"
              value={
                shortDescription
              }
              onChange={(e) =>
                setShortDescription(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Descripción
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value,
                )
              }
              className="min-h-35 w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Tagline
            </label>

            <input
              type="text"
              value={tagline}
              onChange={(e) =>
                setTagline(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Categoría
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
            />

          </div>

          <div className="space-y-3">

            <label className="text-sm text-gray-300">
              Includes
            </label>

            <div className="flex gap-2">

              <input
                type="text"
                value={
                  includeInput
                }
                onChange={(e) =>
                  setIncludeInput(
                    e.target.value,
                  )
                }
                className="flex-1 rounded-xl border border-white/10 bg-black p-3 text-white outline-none focus:border-[#C7962D]"
              />

              <button
                type="button"
                onClick={
                  handleAddInclude
                }
                className="rounded-xl bg-[#C7962D] px-4 text-black font-semibold"
              >
                Agregar
              </button>

            </div>

            <div className="flex flex-wrap gap-2">

              {includes.map(
                (
                  item,
                  index,
                ) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
                  >

                    {item}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveInclude(
                          index,
                        )
                      }
                      className="text-red-400"
                    >
                      ×
                    </button>

                  </div>

                ),
              )}

            </div>

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-300">
              Nueva imagen
            </label>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={(e) =>
                setFile(
                  e.target
                    .files?.[0] ??
                    null,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-gray-300"
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

    </AdminLayout>
  );
}
