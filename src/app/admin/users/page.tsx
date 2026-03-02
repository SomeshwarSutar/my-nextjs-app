export default async function Users({searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { page, q } = await searchParams;
  const currentPage = Number(page || "1");
  const query = q || "";

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
    </div>
  );
}