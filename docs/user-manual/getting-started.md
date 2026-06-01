# Getting Started

This guide walks you through cloning the repository, installing dependencies, and running the application locally.

## Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 20.x |
| npm | 9.x |
| MariaDB or MySQL | 10.6+ / 8.0+ |

## 1. Clone the Repository

```bash
git clone https://github.com/SomeshwarSutar/my-nextjs-app.git
cd my-nextjs-app
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and secrets. See [Configuration](configuration.md) for all available variables.

## 4. Set Up the Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate deploy
```

Seed the database with an initial admin user:

```bash
npm run seed
```

This creates the following admin account:

| Field | Value |
|---|---|
| Email | `admin@someshwarsutar.com` |
| Password | `Admin@123` |
| Role | `ADMIN` |

> **Important**: Change the admin password immediately after your first login in a production environment.

## 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 6. Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Compile the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the codebase |
| `npm run seed` | Seed the database with initial data |

## Next Steps

- [Configure environment variables](configuration.md)
- [Explore the API](api-usage.md)
- [Learn about the Admin Panel](../guides/admin-panel.md)
