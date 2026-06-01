# Authentication

My Blog App uses [NextAuth.js v4](https://next-auth.js.org/) with a **Credentials provider** (email + password).

## How It Works

1. The user submits their email and password on `/login`.
2. NextAuth calls the `authorize` callback defined in `src/lib/auth.ts`.
3. The callback fetches the user from the database and uses `bcryptjs.compare` to verify the password against the stored hash.
4. On success, NextAuth issues a **JWT** containing the user's `id`, `name`, `email`, and `role`.
5. Subsequent requests include the JWT in a `next-auth.session-token` cookie.
6. The role is attached to the session object so that pages and API routes can perform authorization checks.

## Session Shape

After sign-in, the session available via `getServerSession` or `useSession` looks like:

```ts
{
  user: {
    name: "Super Admin",
    email: "admin@someshwarsutar.com",
    role: "ADMIN"   // "ADMIN" | "EDITOR" | "VIEWER"
  },
  expires: "2026-07-01T00:00:00.000Z"
}
```

## Protecting Pages

Use `getServerSession` inside a Server Component or layout to guard protected routes:

```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return <>{children}</>;
}
```

## Protecting API Routes

```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ... handle request
}
```

## Password Hashing

Passwords are hashed with **bcryptjs** using a cost factor of `10`. The seed script (`prisma/seed.ts`) demonstrates correct usage:

```ts
import bcrypt from "bcryptjs";
const passwordHash = await bcrypt.hash("plainTextPassword", 10);
```

> **Never** store plain-text passwords. Always hash before saving to the database.

## Roles

| Role | Capabilities |
|---|---|
| `ADMIN` | Full platform access |
| `EDITOR` | Manage and publish posts |
| `VIEWER` | Read-only (default) |

## Configuration Reference

Auth options are exported from `src/lib/auth.ts` as `authOptions` and consumed by the NextAuth handler at `src/app/api/auth/[...nextauth]/route.ts`.

Key settings:

| Option | Value |
|---|---|
| Provider | `CredentialsProvider` |
| Sign-in page | `/login` |
| JWT secret | `NEXTAUTH_SECRET` env var |
| Session strategy | `jwt` (default) |
