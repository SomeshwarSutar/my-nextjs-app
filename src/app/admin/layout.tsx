import "../globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
      <div className="drawer lg:drawer-open">
        {/* Drawer toggle for mobile */}
        <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="w-full navbar bg-base-100 shadow">
            <div className="flex-none lg:hidden">
              <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>

            <div className="flex-1 px-4 text-xl font-bold">Admin Console</div>

            <div className="flex-none">
              <form action="/api/auth/signout" method="post">
                <button className="btn btn-sm btn-outline">Logout</button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <main className="p-6 bg-base-200 min-h-screen">{children}</main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="admin-drawer" className="drawer-overlay"></label>
          <aside className="w-72 bg-base-100 text-base-content min-h-screen border-r">
            <div className="p-4 text-xl font-bold">CMS Menu</div>
            <ul className="menu p-4 space-y-2">
              <li>
                <Link href="/admin">🏠 Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/posts">📝 Posts</Link>
              </li>
              <li>
                <Link href="/admin/users">👤 Users</Link>
              </li>
              <li>
                <Link href="/admin/media">🖼️ Media</Link>
              </li>
            </ul>

            <div className="p-4 text-sm opacity-60">
              Logged in as <strong>{session?.user?.email}</strong>
            </div>
          </aside>
        </div>
      </div>
  );
}