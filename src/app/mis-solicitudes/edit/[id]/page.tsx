import EditarSolicitudView from "@/app/views/mis-solicitudes/EditarSolicitudView";

export default async function EditarSolicitudPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  return (
    <EditarSolicitudView
      id={id}
    />
  );
}