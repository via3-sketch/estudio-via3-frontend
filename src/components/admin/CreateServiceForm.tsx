"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type FormData = {
  name: string;
  description: string;
  imgUrl: string;
};

type Props = {
  initialData?: FormData;
};

export default function CreateServiceForm({ initialData }: Props) {
  const [form, setForm] = useState<FormData>(
    initialData || {
      name: "",
      description: "",
      imgUrl: "",
    }
  );

  const handleChange = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Servicio:", form);
    alert("Guardado (modo UI)");
  };

  return (
    <div className="max-w-xl space-y-5">

      <Input
        placeholder="Nombre del servicio"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <Input
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Input
        placeholder="Ruta de imagen (ej: /images/liderazgo.png)"
        value={form.imgUrl}
        onChange={(e) => handleChange("imgUrl", e.target.value)}
      />

      <Button onClick={handleSubmit}>
        Guardar servicio
      </Button>

    </div>
  );
}