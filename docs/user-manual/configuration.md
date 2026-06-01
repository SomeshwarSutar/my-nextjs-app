# Configuration

All runtime configuration is managed through environment variables in a `.env` file at the project root.

## Environment Variables

### Database

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Prisma-compatible connection string for MariaDB/MySQL | `mysql://user:pass@localhost:3306/blog_db` |

### Authentication (NextAuth.js)

| Variable | Description | Example |
|---|---|---|
| `NEXTAUTH_SECRET` | Secret key used to sign JWTs and encrypt cookies. **Required in production.** | A 32+ character random string |
| `NEXTAUTH_URL` | The canonical URL of your application | `http://localhost:3000` |

### Example `.env` File

```env
# Database
DATABASE_URL="mysql://blog_user:strong_password@localhost:3306/blog_db"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Generating a Secure Secret

Use the following command to generate a strong `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

## Next.js Configuration

The `next.config.ts` file at the project root is used for Next.js-specific settings such as image domains, redirects, and headers.

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Add your config options here */
};

export default nextConfig;
```

## Prisma Configuration

The `prisma/schema.prisma` file defines the database provider and data models. The `prisma.config.ts` file at the root can hold additional Prisma CLI configuration.

After any schema change, regenerate the Prisma client:

```bash
npx prisma generate
```

Apply changes to the database:

```bash
npx prisma migrate dev --name <migration-name>
```

## Tailwind CSS

Tailwind is configured via `postcss.config.mjs`. DaisyUI is included as a Tailwind plugin and can be themed in `src/app/globals.css`.
