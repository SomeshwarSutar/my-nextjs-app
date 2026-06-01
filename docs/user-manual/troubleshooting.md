# Troubleshooting

Common issues and their solutions.

---

## Database Connection Errors

### `Error: Can't reach database server`

**Cause**: The database is not running or the connection string is incorrect.

**Fix**:
1. Ensure MariaDB/MySQL is running: `sudo systemctl status mariadb`
2. Verify your `DATABASE_URL` in `.env` matches your database host, port, credentials, and database name.
3. Confirm the database exists: `SHOW DATABASES;` in your MariaDB client.

---

### `PrismaClientInitializationError: Prisma Client is not initialized`

**Cause**: The Prisma client has not been generated after a schema change or fresh install.

**Fix**:

```bash
npx prisma generate
```

---

## Authentication Issues

### Redirect loop on `/login`

**Cause**: `NEXTAUTH_URL` does not match the actual URL you're accessing.

**Fix**: Set `NEXTAUTH_URL` in `.env` to exactly match the URL in your browser, including the port:

```env
NEXTAUTH_URL="http://localhost:3000"
```

---

### `[next-auth][error][JWT_SESSION_ERROR]`

**Cause**: `NEXTAUTH_SECRET` is missing or has changed since existing sessions were created.

**Fix**:
1. Ensure `NEXTAUTH_SECRET` is set in `.env`.
2. If you changed the secret, existing sessions are invalidated — users must log in again.

---

### Login fails with "Invalid credentials"

**Cause**: The email or password does not match any user in the database.

**Fix**:
- If this is a fresh install, run `npm run seed` to create the default admin account.
- Reset the password by running a custom Prisma script or using `npx prisma studio`.

---

## Build Errors

### `Module not found: Can't resolve '@/lib/...'`

**Cause**: TypeScript path aliases are not configured.

**Fix**: Verify `tsconfig.json` contains the path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### `Type error: Property 'role' does not exist on type 'User'`

**Cause**: NextAuth type augmentation is missing.

**Fix**: Create or update `src/types/next-auth.d.ts`:

```ts
import "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: User & {
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
```

---

## Migration Issues

### `Migration failed to apply cleanly`

**Fix**: Reset the development database and re-apply migrations (data will be lost):

```bash
npx prisma migrate reset
```

---

## Still Stuck?

- Check the [Next.js docs](https://nextjs.org/docs)
- Check the [Prisma docs](https://www.prisma.io/docs)
- Check the [NextAuth.js docs](https://next-auth.js.org/getting-started/introduction)
- Open an issue on [GitHub](https://github.com/SomeshwarSutar/my-nextjs-app/issues)
