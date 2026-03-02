import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [totalPosts, publishedPosts, totalUsers, topPost] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count(),
    prisma.post.findFirst({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      select: { title: true, viewCount: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Posts</h2>
            <p className="text-3xl font-bold">{totalPosts}</p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Published Posts</h2>
            <p className="text-3xl font-bold">{publishedPosts}</p>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
        </div>

        <div className="card bg-neutral text-neutral-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Top Viewed Post</h2>
            {topPost ? (
              <>
                <p className="font-semibold">{topPost.title}</p>
                <p className="text-xl">{topPost.viewCount} views</p>
              </>
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <p className="opacity-70">You can add logs, charts, or shortcuts here.</p>
        </div>
      </div>
    </div>
  );
}