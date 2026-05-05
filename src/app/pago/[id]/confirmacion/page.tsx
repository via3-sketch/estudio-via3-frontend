import ConfirmacionPagoView from "@/app/views/pago/ConfirmacionPagoView";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ConfirmacionPagoView id={id} />;
}