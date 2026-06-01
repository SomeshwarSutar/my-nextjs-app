# Admin Panel

The admin panel is available at `/admin` and is restricted to users with the `ADMIN` role.

## Accessing the Admin Panel

1. Navigate to `/login`.
2. Enter your admin credentials.
3. After a successful login, you are redirected to the home page. Go to `/admin` manually or follow a link in the navigation.

Default credentials (development only):

| Field | Value |
|---|---|
| Email | `admin@someshwarsutar.com` |
| Password | `Admin@123` |

> Change these credentials immediately in a production environment.

## Dashboard (`/admin`)

The dashboard provides a high-level overview of the platform:

| Metric | Description |
|---|---|
| **Total Posts** | Count of all posts regardless of status |
| **Published Posts** | Count of posts with `status = PUBLISHED` |
| **Users** | Total number of registered users |
| **Top Viewed Post** | Title and view count of the most-viewed published post |

## User Management (`/admin/users`)

Provides a searchable, paginated list of all users. Supports filtering by page (`page`) and keyword (`q`).

Planned features (not yet implemented):

- Create / edit / delete users
- Change user roles
- Reset passwords

## Access Control

The admin layout (`src/app/admin/layout.tsx`) enforces authentication and role checks before rendering any admin page. Unauthenticated users or users without the `ADMIN` role are redirected to `/login`.

## Navigation

The admin section uses its own layout (`src/app/admin/layout.tsx`) which wraps all `/admin` pages and can include a sidebar, breadcrumbs, or top navigation specific to the admin area.
