import AgendaView from "@/app/views/agenda/AgendaView";

export default async function AgendaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AgendaView id={id} />;
}