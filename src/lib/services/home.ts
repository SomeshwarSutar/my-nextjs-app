import { prisma } from "@/lib/db";

export async function getHomePageData() {
  const featuredPost = await prisma.post.findFirst({
    where: {
      status: "PUBLISHED",
      isFeatured: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      author: { select: { name: true } },
      coverImage: true,
    },
  });

  const mostViewed = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { viewCount: "desc" },
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      viewCount: true,
    },
  });

  return { featuredPost, mostViewed };
}