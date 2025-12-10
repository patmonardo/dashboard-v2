# Prisma Migrations Guide

## What Are Migrations?

Migrations are **version-controlled SQL snapshots** of your database schema changes. They track the evolution of your database structure over time.

## Your Current Setup

### Migration Status
```bash
$ dotenv pnpm prisma migrate status
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "dashboard_v3", schema "public" at "localhost:5432"

1 migration found in prisma/migrations

Database schema is up to date!
```

### Your Migration
**File**: `prisma/migrations/20250304210655_init/migration.sql`

This single "init" migration creates:
- **Enum**: `InvoiceStatus` (PENDING, PAID, OVERDUE, DRAFT)
- **Tables**: User, Customer, Invoice, Revenue
- **Indexes**: Unique constraints on User.email, Customer.email
- **Foreign Key**: Invoice → Customer relationship

## How Migrations Work in Prisma 7

### 1. Creating New Migrations (When Schema Changes)

**Workflow**:
```bash
# 1. Edit prisma/schema.prisma (add/modify models)
# 2. Run:
dotenv pnpm prisma migrate dev --name <description>

# Example:
dotenv pnpm prisma migrate dev --name "add_product_table"
```

**What happens**:
- Prisma compares your schema.prisma with the database
- Generates a new migration file with SQL changes
- **Automatically applies it** to the database
- Regenerates the Prisma Client

### 2. Applying Existing Migrations (In Production)

```bash
dotenv pnpm prisma migrate deploy
```

**Use case**: CI/CD pipelines, deployment servers
- Applies all unapplied migrations
- Does NOT regenerate Client (it's already built)

### 3. Checking Migration Status

```bash
dotenv pnpm prisma migrate status
```

**Output shows**:
- Which migrations exist locally
- Which have been applied to the database
- Whether schema is "up to date"

### 4. Resetting (Dev Only - DESTRUCTIVE)

```bash
dotenv pnpm prisma migrate reset
```

**WARNING**: 
- Drops ALL data
- Resets database schema
- Re-runs all migrations from scratch
- Only use in local development!

## Prisma Config Location (Prisma 7 Change)

**Before (Prisma 5)**:
```prisma
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

**Now (Prisma 7)**:
```typescript
// prisma.config.ts at PROJECT ROOT
export default {
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://..."
  },
};
```

**Key point**: Config file moved from `prisma/` to root because Prisma CLI looks for it there.

## Your Current Data

**Seed data loaded from**: `prisma/backups/seed_data.sql`

```
Customers: 6
Invoices:  13
Revenue:   12
```

## Common Migration Scenarios

### Scenario 1: Add a new field to Customer

```prisma
model Customer {
  id        String   @id
  name      String
  email     String   @unique
  phone     String   // NEW
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```bash
dotenv pnpm prisma migrate dev --name "add_phone_to_customer"
```

**Result**: New file `20250310_add_phone_to_customer/migration.sql` with:
```sql
ALTER TABLE "Customer" ADD COLUMN "phone" TEXT NOT NULL DEFAULT '';
```

### Scenario 2: Create a new table

```prisma
model Product {
  id    String @id
  name  String
  price Int
}
```

```bash
dotenv pnpm prisma migrate dev --name "create_product_table"
```

**Result**: Migration with `CREATE TABLE "Product"...`

### Scenario 3: Drop a field (careful!)

```prisma
// Remove this line:
// phone String
```

```bash
dotenv pnpm prisma migrate dev --name "remove_phone_from_customer"
```

**Result**: Migration with `ALTER TABLE "Customer" DROP COLUMN "phone";`

## Why Migrations Matter

1. **Version Control**: Every schema change is tracked in git
2. **Reproducibility**: New developers run `migrate deploy` to get identical schema
3. **Deployment Safety**: Migrations can be reviewed before applying to production
4. **Rollback Strategy**: You can examine old migrations to understand schema evolution
5. **Collaboration**: Team members see exactly what changed and when

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | **Source of truth** - describes your data models |
| `prisma/prisma.config.ts` | Prisma 7 config - database connection URL |
| `prisma/migrations/` | Historical record of all schema changes |
| `prisma/migrations/migration_lock.toml` | Prevents concurrent migrations |
| `.env` | Environment variables (DATABASE_URL) |
| `prisma.config.ts` | Root-level config for Prisma 7 |

## Next Steps

1. **Explore the data** in Prisma Studio (http://localhost:51212)
2. **Try creating a migration** when you modify `schema.prisma`
3. **Understand the relationship** between schema.prisma → migrations → database
4. **Plan for codegen**: Future migrations can be auto-generated from Cypher queries on FormDB

---

**Prisma 7 Docs**: https://www.prisma.io/docs/orm/prisma-migrate/getting-started
