# Project Structure

```
my-nextjs-app/
├── docs/                         # MkDocs documentation (this site)
├── prisma/
│   ├── schema.prisma             # Database models and relations
│   ├── seed.ts                   # Seed script (creates default admin user)
│   └── migrations/               # SQL migration history
├── public/                       # Static files served at /
├── scripts/
│   └── hash-test.js              # Utility: bcrypt hash testing
├── src/
│   ├── proxy.ts                  # Optional proxy / middleware entry
│   ├── app/
│   │   ├── globals.css           # Global Tailwind / DaisyUI styles
│   │   ├── layout.tsx            # Root layout (HTML shell)
│   │   ├── page.tsx              # Home page (/)
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin layout with sidebar/nav
│   │   │   ├── page.tsx          # Admin dashboard (/admin)
│   │   │   └── users/
│   │   │       └── page.tsx      # User management (/admin/users)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts  # NextAuth handler (GET + POST)
│   │   │   └── posts/
│   │   │       └── route.ts      # Posts API (GET /api/posts)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page (/login)
│   │   └── posts/
│   │       ├── page.tsx          # Post list (/posts)
│   │       └── [slug]/
│   │           └── page.tsx      # Single post (/posts/[slug])
│   ├── components/
│   │   └── posts/
│   │       ├── FeaturedPost.tsx  # Featured post card
│   │       ├── MostViewedList.tsx# Most-viewed posts list
│   │       └── PostList.tsx      # Generic paginated post list
│   └── lib/
│       ├── auth.ts               # NextAuth configuration & options
│       ├── db.ts                 # Prisma client singleton
│       └── services/
│           ├── home.ts           # Home page data queries
│           └── posts.ts          # Post queries (paginate, single, home)
├── eslint.config.mjs             # ESLint flat config
├── mkdocs.yml                    # MkDocs site configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS (Tailwind) config
├── prisma.config.ts              # Prisma CLI configuration
└── tsconfig.json                 # TypeScript configuration
```

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Pages | `page.tsx` in route folder | `app/posts/page.tsx` |
| Layouts | `layout.tsx` in route folder | `app/admin/layout.tsx` |
| API routes | `route.ts` in route folder | `app/api/posts/route.ts` |
| Components | PascalCase `.tsx` | `FeaturedPost.tsx` |
| Services | camelCase `.ts` | `posts.ts` |
| Path alias | `@/` → `src/` | `import { prisma } from "@/lib/db"` |
