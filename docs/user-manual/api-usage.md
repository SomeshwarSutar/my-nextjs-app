# API Reference

The application exposes a REST API under `/api`. All endpoints return JSON.

---

## Posts

### `GET /api/posts`

Returns a paginated list of **published** posts, with optional full-text search.

#### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `integer` | `1` | Page number (1-based) |
| `limit` | `integer` | `10` | Number of posts per page |
| `q` | `string` | `""` | Search query (matches title, excerpt, and content) |

#### Example Request

```
GET /api/posts?page=1&limit=5&q=nextjs
```

#### Example Response

```json
{
  "items": [
    {
      "id": 3,
      "title": "Getting Started with Next.js",
      "slug": "getting-started-with-nextjs",
      "excerpt": "A beginner's guide to building with Next.js.",
      "publishedAt": "2026-05-20T10:00:00.000Z",
      "viewCount": 142,
      "isFeatured": false
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 5,
  "totalPages": 1
}
```

#### Response Fields

| Field | Type | Description |
|---|---|---|
| `items` | `array` | Array of post objects |
| `items[].id` | `integer` | Unique post identifier |
| `items[].title` | `string` | Post title |
| `items[].slug` | `string` | URL-friendly post identifier |
| `items[].excerpt` | `string \| null` | Short description of the post |
| `items[].publishedAt` | `string \| null` | ISO 8601 publish timestamp |
| `items[].viewCount` | `integer` | Total view count |
| `items[].isFeatured` | `boolean` | Whether the post is featured |
| `total` | `integer` | Total number of matching posts |
| `page` | `integer` | Current page |
| `limit` | `integer` | Posts per page |
| `totalPages` | `integer` | Total number of pages |

---

## Authentication

Authentication is handled by [NextAuth.js](https://next-auth.js.org/) at `/api/auth/[...nextauth]`.

### `POST /api/auth/signin`

Sign in with credentials (email and password).

#### Request Body

```json
{
  "email": "admin@someshwarsutar.com",
  "password": "Admin@123"
}
```

#### Successful Response

Returns a session cookie and redirects (or returns `url`) on success.

#### Error Response

Returns `{ "error": "CredentialsSignin" }` if the credentials are invalid.

### Session Object

After a successful login, the session includes the user's role:

```json
{
  "user": {
    "name": "Super Admin",
    "email": "admin@someshwarsutar.com",
    "role": "ADMIN"
  },
  "expires": "2026-07-01T00:00:00.000Z"
}
```

### `POST /api/auth/signout`

Signs the current user out and clears the session.

---

## Error Handling

All endpoints return standard HTTP status codes:

| Status | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `400 Bad Request` | Invalid query parameters |
| `401 Unauthorized` | Authentication required |
| `403 Forbidden` | Insufficient permissions |
| `404 Not Found` | Resource not found |
| `500 Internal Server Error` | Unexpected server error |
