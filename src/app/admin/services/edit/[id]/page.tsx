import EditServiceView from "@/app/views/admin/EditServiceView";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  return (
    <EditServiceView
      id={id}
    />
  );
}