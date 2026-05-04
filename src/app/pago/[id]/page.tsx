import PagoView from "@/app/views/pago/PagoView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PagoView id={id} />;
}