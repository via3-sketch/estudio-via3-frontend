"use client";

type Service = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={service.imgUrl}
          alt={service.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold text-white">
          {service.name}
        </h3>

        <p className="text-sm text-gray-400">
          {service.description}
        </p>

        <div className="flex justify-between pt-2">
          <button className="text-sm text-[#C7962D] hover:underline">
            Editar
          </button>

          <button className="text-sm text-red-400 hover:underline">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}