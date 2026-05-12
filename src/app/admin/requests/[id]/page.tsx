import RequestDetailView from "@/app/views/admin/RequestDetailView";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RequestDetailPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <RequestDetailView id={id} />
  );
}