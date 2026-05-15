import PagoView from "@/app/views/pago/PagoView";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <PagoView id={params.id} />;
}