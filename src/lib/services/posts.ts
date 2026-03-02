import { prisma } from "@/lib/db";

export async function getPaginatedPosts(params: {
  page: number;
  limit: number;
  query?: string;
}) {
  const { page, limit, query } = params;
  const where =
    query && query.trim().length > 0
      ? {
          status: "PUBLISHED" as const,
          OR: [
            { title: { contains: query} },
            { excerpt: { contains: query} },
            { content: { contains: query} },
          ],
        }
      : { status: "PUBLISHED" as const };

  const [items, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        viewCount: true,
        isFeatured: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.update({
    where: { slug },
    data: { viewCount: { increment: 1 } },
    include: {
      author: { select: { name: true } },
      coverImage: true,
    },
  });
}

export async function getHomePageData() {
  const [featured, mostViewed, latest] = await Promise.all([
    prisma.post.findFirst({
      where: { status: "PUBLISHED", isFeatured: true },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 5,
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 5,
    }),
  ]);

  return { featured, mostViewed, latest };
}