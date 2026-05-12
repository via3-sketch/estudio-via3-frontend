import CapacitacionDetailView from "@/app/views/capacitaciones/CapacitacionDetailView";

export default async function CapacitacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CapacitacionDetailView id={id} />;
}