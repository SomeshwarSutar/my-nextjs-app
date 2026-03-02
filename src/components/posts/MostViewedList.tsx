import Link from "next/link";

export default function MostViewedList({ posts }: { posts: any[] }) {
  if (!posts?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Top 3 Most Viewed Posts</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="card bg-base-100 shadow hover:shadow-lg transition"
          >
            <div className="card-body">
              <h3 className="card-title text-lg">{post.title}</h3>
              <p className="text-sm opacity-70">{post.excerpt}</p>
              <div className="text-xs opacity-50">
                Views: {post.viewCount}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}