import EditServiceView from "@/app/views/admin/EditServiceView";

type EditServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;

  return <EditServiceView id={id} />;
}