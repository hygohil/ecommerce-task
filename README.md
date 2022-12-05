## Description

[Nest](https://github.com/nestjs/nest) + [TypeScript](https://github.com/microsoft/TypeScript) starter repository.

### Production-ready REST API:

- Logging System
- Advanced ESLint/TSLint config. (e.g: auto-fix will remove unused imports)
- Shared services/constants/helpers
- Middlewares/Interceptors implementation example.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma (ORM)

```bash
# IDE for your database
$ npx prisma studio

# run migrations (apply schema changes)
$ npm run run:migrations  #OR
$ npx prisma migrate dev

# run migrations on CI/CD
$ npx prisma migrate deploy

# apply db schema changes to the prisma client
$ npm run run:generate  #OR
$ npx prisma generate
```

## Code Style

Sync your IDE with project eslintrc.js.

Check Run `ESLint --fix` on save
