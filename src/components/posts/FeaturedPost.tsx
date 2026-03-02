import Link from "next/link";

export default function FeaturedPost({ post }: { post: any }) {
  if (!post) return null;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl mb-8">
      {post.coverImage?.url && (
        <figure className="w-full lg:w-1/2">
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            className="object-cover w-full h-80"
          />
        </figure>
      )}

      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">{post.title}</h2>
        <p className="opacity-70">{post.excerpt}</p>

        <p className="text-sm text-gray-500">
          By {post.author?.name} ·{" "}
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString()}
        </p>

        <div className="card-actions justify-end">
          <Link
            href={`/posts/${post.slug}`}
            className="btn btn-primary"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}