# Deployment

This guide covers deploying My Blog App to a production environment.

## Prerequisites

- A Linux server (Ubuntu 22.04+ recommended) or a PaaS platform
- Node.js 20.x
- MariaDB 10.6+ or MySQL 8.0+
- A domain name (optional but recommended)

---

## Option 1: Vercel (Recommended for simplicity)

Vercel is the easiest deployment target for Next.js applications.

### Steps

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Set the following **Environment Variables** in the Vercel project settings:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Your production MariaDB/MySQL connection string |
   | `NEXTAUTH_SECRET` | A strong random secret (`openssl rand -base64 32`) |
   | `NEXTAUTH_URL` | Your production domain, e.g. `https://myblog.example.com` |

4. Click **Deploy**.

> **Note**: Vercel does not host databases. Use a managed database service such as [PlanetScale](https://planetscale.com), [Railway](https://railway.app), or [Aiven](https://aiven.io).

---

## Option 2: Self-Hosted (VPS)

### 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clone and Install

```bash
git clone https://github.com/SomeshwarSutar/my-nextjs-app.git
cd my-nextjs-app
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
nano .env   # Fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
```

### 4. Run Migrations

```bash
npx prisma migrate deploy
npm run seed   # Only for first-time setup
```

### 5. Build the Application

```bash
npm run build
```

### 6. Start the Production Server

```bash
npm run start
```

The app will listen on port `3000` by default.

### 7. Set Up a Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name myblog.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable HTTPS with [Certbot](https://certbot.eff.org/):

```bash
sudo certbot --nginx -d myblog.example.com
```

### 8. Run with PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "my-blog-app" -- start
pm2 save
pm2 startup
```

---

## Option 3: Docker

A `Dockerfile` is not yet included in this repository. A basic example:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## Post-Deployment Checklist

- [ ] `NEXTAUTH_SECRET` is set to a strong, unique value
- [ ] `NEXTAUTH_URL` matches the production domain exactly
- [ ] Database migrations have been applied (`npx prisma migrate deploy`)
- [ ] Default admin password has been changed
- [ ] HTTPS is enabled
- [ ] Database is not publicly accessible (use internal networking or firewall rules)
