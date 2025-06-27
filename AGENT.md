# Agent Instructions for Next.js Vercel Dashboard

## Build/Lint/Test Commands

- `pnpm run dev` - Start development server with turbo
- `pnpm run build` - Build for production (runs db:push first)
- `pnpm run lint` - Lint with Next.js ESLint
- `pnpm run db:push` - Run Sequelize migrations
- `pnpm run db:pull` - Generate models from database schema

## Architecture

- **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Sequelize ORM
- **Database**: PostgreSQL/MySQL with Sequelize models in `server/database/models/`
- **State Management**: Redux Toolkit with slices in `lib/store/slices/`
- **Authentication**: Firebase Auth with JWT tokens
- **Email**: React Email templates in `server/emails/`

## Code Style Guidelines

- **Imports**: Use path aliases (`@app/*`, `@/lib/*`, `@/components/*`, `@context/*`, `@/server/*`)
- **Components**: PascalCase filenames, destructured props, React FC pattern
- **Styling**: Tailwind classes with Radix UI themes, custom CSS variables for colors
- **Types**: Interface definitions, strict TypeScript disabled but use types where helpful
- **Logging**: Use custom `logger()` from `@/lib/logger` instead of console.log
- **Error Handling**: Client-side with try/catch, server actions pattern for API routes
