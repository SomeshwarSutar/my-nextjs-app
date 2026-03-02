import { getHomePageData } from "@/lib/services/home";
import FeaturedPost from "@/components/posts/FeaturedPost";
import MostViewedList from "@/components/posts/MostViewedList";

export default async function Home() {
  const { featuredPost, mostViewed } = await getHomePageData();

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Welcome to My Blog</h1>
      <FeaturedPost post={featuredPost} />
      {/* Most Viewed Section */}
      <MostViewedList posts={mostViewed} />
    </div>
  );
}