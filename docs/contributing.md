# Contributing

Thank you for your interest in contributing to My Blog App!

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/my-nextjs-app.git
   cd my-nextjs-app
   ```
3. Follow the [Getting Started guide](user-manual/getting-started.md) to set up your local environment.

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `feat/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `docs/<name>` | Documentation updates |
| `chore/<name>` | Maintenance tasks |

Always branch off `main` and open a pull request back to `main`.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <short description>

Examples:
feat(posts): add category filter to post list
fix(auth): handle null user in authorize callback
docs(readme): update deployment instructions
```

Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`

## Code Style

- **TypeScript**: All new code must be TypeScript. Avoid `any` where possible.
- **Linting**: Run `npm run lint` before committing. CI will block PRs with lint errors.
- **Formatting**: Use Prettier (add it to the project if not already configured).

## Database Changes

If your change requires a schema update:

1. Edit `prisma/schema.prisma`.
2. Create a migration: `npx prisma migrate dev --name describe-your-change`
3. Commit both the updated `schema.prisma` and the new migration files.

## Pull Request Checklist

- [ ] Code builds without errors (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] All new behaviour is covered by tests (if a test suite is added)
- [ ] Migration files are committed alongside schema changes
- [ ] Documentation is updated if the change affects user-facing behaviour

## Reporting Bugs

Open an issue on [GitHub](https://github.com/SomeshwarSutar/my-nextjs-app/issues) with:

- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Environment (OS, Node.js version, browser)

## Suggesting Features

Open a [GitHub Discussion](https://github.com/SomeshwarSutar/my-nextjs-app/discussions) or an issue labelled `enhancement`.
