# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Git
- Never commit and push before ask.

### Package Management
- Use **Bun** as the package manager and runtime (as specified in .cursor rules)
- Install dependencies: `bun install`
- Start development server: `bun dev`

### Code Quality
- Lint code: `bun lint` (uses Biome)
- Fix lint issues: `bun lint:fix`
- Fix unsafe lint issues: `bun lint:unsafe`
- Type check: `bun typecheck`
- Build for production: `bun build`

### Database Operations
- Generate migrations: `bun db:generate`
- Run migrations: `bun db:migrate`
- Push schema to database: `bun db:push`
- Open database studio: `bun db:studio`

### Authentication
- Generate auth secret: `bun auth:secret`
- Generate auth schemas: `bun auth:generate`

### Utility
- Clean project: `bun clear` (removes node_modules, dist, bun.lock, .tanstack)

## Technology Stack

This is a **TanStack Start** full-stack React application with the following core technologies:

### Frontend
- **React 19** with TypeScript
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **TanStack Table** for data tables
- **TanStack Form** for form handling
- **Tailwind CSS** for styling
- **Shadcn UI** components (New York style)
- **Lucide React** for icons

### Backend & Database
- **TanStack Start** server functions
- **Drizzle ORM** with PostgreSQL
- **Better Auth** for authentication (email/password + Google OAuth)
- Database uses snake_case convention

### Build & Tooling
- **Vite** as build tool
- **Biome** for linting and formatting
- **Bun** as runtime and package manager

## Architecture

### Routing Structure
- File-based routing using TanStack Router
- Routes are generated in `src/routeTree.gen.ts`
- Main route groups:
  - `(auth)/` - Authentication pages (login, register, etc.)
  - `(landing)/` - Public landing pages
  - `app/` - Protected application routes (requires authentication)

### Database Schema
Located in `src/lib/db/schema/`:
- `auth.schema.ts` - User authentication tables (auto-generated)
- `project.schema.ts` - Project management
- `task.schema.ts` - Task management with status/priority enums
- `task-comment.schema.ts` - Task comments
- `task-history.schema.ts` - Task history tracking

### Authentication Flow
- Uses Better Auth with Drizzle adapter
- Supports email/password and Google OAuth
- User context is available throughout the app via router context
- Protected routes redirect to landing page if not authenticated

### State Management
- **TanStack Query** for server state with infinite stale time for user data
- **React Query** mutations for data updates with optimistic UI
- Custom hooks in `src/queries/` for reusable query logic

### Component Structure
- UI components in `src/components/ui/` (Shadcn UI)
- **IMPORTANT**: Always use official Shadcn UI components via `bunx shadcn@latest add <component>` instead of manually creating UI components
Please check before install

### Server Functions
- Database functions in `src/lib/functions/projects/`
- Authentication functions in `src/lib/auth/functions/`
- All use server-only imports and proper error handling

## Environment Variables
Required environment variables (all prefixed with `VITE_`):
- `VITE_DATABASE_URL` - PostgreSQL connection string
- `VITE_AUTH_BASE_URL` - Application base URL
- `VITE_AUTH_SECRET` - Better Auth secret
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_GOOGLE_CLIENT_SECRET` - Google OAuth client secret

## Code Style
- 2-space indentation
- 100 character line width
- Semicolons required
- Snake case for database columns
- Camel case for TypeScript/JavaScript
- Path aliases: `@/*` maps to `src/*`
- Separate type imports from value imports (e.g., `import type { ... }` vs `import { ... }`)
- Auto-generated files like `routeTree.gen.ts` are excluded from linting

## Project Structure
This appears to be a project management application with:
- User authentication and project creation
- Task management with status tracking (created → assigned → in_progress → completed, etc.)
- Hierarchical task structure (parent/child tasks)
- Comment and history tracking for tasks
- Dashboard with sidebar navigation and breadcrumbs