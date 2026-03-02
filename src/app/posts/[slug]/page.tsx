import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    if (!slug) {
        return notFound();
    }

    const post = await prisma.post.update({
        where: { slug: slug },
        data: { viewCount: { increment: 1 } },
        include: {
            author: { select: { name: true } },
            coverImage: true,
        },
    });

    if (!post || post.status !== "PUBLISHED") return notFound();

    return (
        <article className="container mx-auto py-12 prose">
            <h1>{post.title}</h1>
            <p className="text-sm text-gray-500">
                By {post.author?.name} ·{" "}
                {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString()}
            </p>
            {/* cover image, tags, etc. */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}