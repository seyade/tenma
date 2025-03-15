# Super backend

### Stack

- Node.js
- Express
- Typescript
- Postgres
- Prisma

To use Prisma:

- `npm prisma init` or `npx prisma init`
  - Creates `prisma.schema` file for models and adds additonal info in your `.env`.
- `npx prisma migrate dev --name init`
  - Create sql queries setup matching your models for database, e.g. CREATE TABLE (...).
- `npx prisma generate`
  - Generate types for typescript. Use this after every changes in your models.
