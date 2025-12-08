# Agent Guidelines for Maintena Backend

## Commands

- **Dev server**: `bun run --watch src/index.ts`
- **Database seed**: `bun run src/database/seeds/index.ts`
- **Format code**: `prettier --write .`
- **Single test**: No test framework configured yet

## Code Style

- **Language**: TypeScript (strict mode, ES2021 target)
- **Package manager**: Bun
- **Framework**: Elysia.js + TypeORM + MySQL
- **Imports**: External libs first, then local imports
- **Formatting**: Prettier (double quotes, semicolons, 2-space indent, 80 width)
- **Naming**: camelCase functions/vars, PascalCase classes, snake_case DB columns, kebab-case files
- **Types**: Strict typing, use `Static<typeof schema>` for Elysia validation
- **Error handling**: Throw `createError(message, code)` responses
- **Architecture**: Repository pattern, async/await, service layer with route handlers
- **Entities**: TypeORM with decorators, camelCase properties, snake_case columns

## Project Structure

```
src/
├── core/                    # Core app config and utilities
├── database/               # Database layer
│   ├── entities/          # TypeORM entities
│   ├── seeds/            # Database seeders
│   └── data-source.ts    # Database connection
├── modules/               # Feature-based modules
│   └── [module-name]/
│       ├── [module].route.ts      # Route definitions
│       ├── [module].service.ts    # Business logic
│       ├── [module].schema.ts     # Validation schemas
│       ├── [module].middleware.ts # Module middleware (optional)
│       └── [module].constant.ts   # Constants (optional)
├── server/                # Server setup
├── types/                 # Type definitions
└── index.ts              # App entry point
```

### Module Structure

- **Routes**: Export default function returning Elysia instance with prefix
- **Services**: Pure functions with business logic, use repository pattern
- **Schemas**: Elysia validation schemas using `t` (type definitions)
- **Middleware**: Module-specific middleware when needed
- **Registration**: Import route functions in `server/elysia.ts` and use `.use()`
