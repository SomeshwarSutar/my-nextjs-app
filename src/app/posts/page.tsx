import PostList from "@/components/posts/PostList";

export default async function PostsPage({searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { page, q } = await searchParams;
  const currentPage = Number(page || "1");
  const query = q || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${currentPage}&q=${encodeURIComponent(
      query
    )}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="container mx-auto py-8">
      {/* search bar + PostList + Pagination */}
      <PostList data={data} query={query} />
    </div>
  );
}