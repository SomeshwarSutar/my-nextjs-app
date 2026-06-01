# My Blog App

A full-stack blog platform built with **Next.js 16**, **Prisma**, **MariaDB**, **NextAuth**, and **TailwindCSS + DaisyUI**.

## Overview

My Blog App is a content-focused web application that allows authors to publish articles and readers to discover them. It features a clean public-facing blog, a credential-based authentication system, and an admin dashboard for managing content and users.

## Key Features

| Feature | Description |
|---|---|
| **Public Blog** | Browse the latest posts, a featured article, and most-viewed content |
| **Post Pages** | Individual post pages with view-count tracking |
| **REST API** | Paginated, searchable posts API endpoint |
| **Authentication** | Secure email/password login via NextAuth.js |
| **Admin Dashboard** | Overview metrics (posts, users, top content) |
| **User Management** | Role-based access control (ADMIN, EDITOR, VIEWER) |
| **Database ORM** | Prisma with MariaDB/MySQL |

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/), [TailwindCSS v4](https://tailwindcss.com/), [DaisyUI v5](https://daisyui.com/)
- **Auth**: [NextAuth.js v4](https://next-auth.js.org/)
- **ORM**: [Prisma v7](https://www.prisma.io/) with `@prisma/adapter-mariadb`
- **Database**: MariaDB / MySQL
- **Language**: TypeScript

## Quick Links

- [Getting Started](user-manual/getting-started.md)
- [Configuration](user-manual/configuration.md)
- [API Reference](user-manual/api-usage.md)
- [Architecture Overview](architecture/overview.md)
- [Database Schema](architecture/database-schema.md)
- [Admin Panel Guide](guides/admin-panel.md)
- [Deployment](guides/deployment.md)
