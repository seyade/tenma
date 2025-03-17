## TEN.MA - backend

### Stack

- Node.js
- Express
- Typescript
- Postgresql
- Prisma
- GraphQL

#### Prisma Usage

- `npm i prisma @prisma/client`
  - install Prisma packages and CLI
- `npx prisma init`
  - Create schema file for models
- `npx prisma migrate dev --name init`
  - This creates sql setup ready for database, e.g CREATE TABLE (...)
- `npx prisma generate`
  - generates prisma client and its types
