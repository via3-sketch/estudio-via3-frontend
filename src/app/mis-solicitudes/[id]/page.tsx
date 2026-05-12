import SolicitudDetalleView from "@/app/views/mis-solicitudes/SolicitudDetalleView";

export default async function SolicitudDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SolicitudDetalleView id={id} />;
}