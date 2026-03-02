"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PostList({
  data,
  query,
}: {
  data: {
    items: any[];
    page: number;
    totalPages: number;
  };
  query: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateQuery(param: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(param, value);
    else params.delete(param);
    router.push(`/posts?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <input
          className="input input-bordered w-full max-w-md"
          placeholder="Search posts..."
          defaultValue={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateQuery("q", (e.target as HTMLInputElement).value);
            }
          }}
        />
        <button
          className="btn"
          onClick={() => updateQuery("page", String(data.page - 1))}
          disabled={data.page <= 1}
        >
          Prev
        </button>
        <button
          className="btn"
          onClick={() => updateQuery("page", String(data.page + 1))}
          disabled={data.page >= data.totalPages}
        >
          Next
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.slug}`}
            className="card bg-base-100 shadow hover:shadow-lg transition"
          >
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="text-xs opacity-70">
                Views: {post.viewCount ?? 0}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}