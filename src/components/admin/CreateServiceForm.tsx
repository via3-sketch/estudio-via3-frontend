"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import { createTraining } from "@/services/training.service";

type FormDataType = {
  title: string;

  shortDescription: string;

  description: string;

  tagline: string;

  category: string;

  includes: string[];

  file: File | null;
};

type Props = {
  initialData?: FormDataType;
};

export default function CreateServiceForm({
  initialData,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<FormDataType>(
      initialData || {
        title: "",

        shortDescription: "",

        description: "",

        tagline: "",

        category: "",

        includes: [""],

        file: null,
      },
    );

  const handleChange = (
    field: keyof FormDataType,
    value: any,
  ) => {
    setForm({
      ...form,

      [field]: value,
    });
  };

  const handleIncludeChange = (
    index: number,
    value: string,
  ) => {
    const updatedIncludes = [
      ...form.includes,
    ];

    updatedIncludes[index] = value;

    setForm({
      ...form,

      includes: updatedIncludes,
    });
  };

  const addInclude = () => {
    setForm({
      ...form,

      includes: [
        ...form.includes,
        "",
      ],
    });
  };

  const removeInclude = (
    index: number,
  ) => {
    setForm({
      ...form,

      includes: form.includes.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Debes iniciar sesión",
        );

        return;
      }

      if (!form.file) {
        alert(
          "Debes seleccionar una imagen",
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title,
      );

      formData.append(
        "shortDescription",
        form.shortDescription,
      );

      formData.append(
        "description",
        form.description,
      );

      formData.append(
        "tagline",
        form.tagline,
      );

      formData.append(
        "category",
        form.category,
      );

      form.includes.forEach(
        (item) => {
          formData.append(
            "includes",
            item,
          );
        },
      );

      formData.append(
        "file",
        form.file,
      );

      await createTraining(
        formData,
        token,
      );

      alert(
        "Servicio creado correctamente",
      );

      setForm({
        title: "",

        shortDescription: "",

        description: "",

        tagline: "",

        category: "",

        includes: [""],

        file: null,
      });
    } catch (error) {
      console.error(
        "ERROR BACK:",
        JSON.stringify(
          error,
          null,
          2,
        ),
      );

      alert(
        "Error creando servicio",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-5">

      <Input
        placeholder="Título"
        value={form.title}
        onChange={(e) =>
          handleChange(
            "title",
            e.target.value,
          )
        }
      />

      <Input
        placeholder="Descripción corta"
        value={
          form.shortDescription
        }
        onChange={(e) =>
          handleChange(
            "shortDescription",
            e.target.value,
          )
        }
      />

      <Input
        placeholder="Tagline"
        value={form.tagline}
        onChange={(e) =>
          handleChange(
            "tagline",
            e.target.value,
          )
        }
      />

      <Input
        placeholder="Categoría"
        value={form.category}
        onChange={(e) =>
          handleChange(
            "category",
            e.target.value,
          )
        }
      />

      <textarea
        placeholder="Descripción completa"
        value={form.description}
        onChange={(e) =>
          handleChange(
            "description",
            e.target.value,
          )
        }
        className="w-full min-h-35 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
      />

      <div className="space-y-3">

        <p className="text-sm text-gray-400">
          Incluye
        </p>

        {form.includes.map(
          (item, index) => (
            <div
              key={index}
              className="flex gap-2"
            >

              <Input
                placeholder="Ej: Diagnóstico de equipo"
                value={item}
                onChange={(e) =>
                  handleIncludeChange(
                    index,
                    e.target.value,
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  removeInclude(
                    index,
                  )
                }
                className="px-4 rounded-lg bg-red-500/20 text-red-400"
              >
                -
              </button>

            </div>
          ),
        )}

        <button
          type="button"
          onClick={addInclude}
          className="text-sm text-[#C7962D]"
        >
          + Agregar item
        </button>

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleChange(
            "file",
            e.target.files?.[0] ||
              null,
          )
        }
        className="block w-full text-sm text-gray-300"
      />

      <Button
        onClick={handleSubmit}
      >
        {loading
          ? "Guardando..."
          : "Guardar servicio"}
      </Button>

    </div>
  );
}