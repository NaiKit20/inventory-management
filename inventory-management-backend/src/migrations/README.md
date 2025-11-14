# Database Migrations

This directory contains TypeORM migrations for the Inventory Management system.

## Migration Commands

### Run Migrations
Execute all pending migrations:
```bash
npm run migration:run
```

### Revert Migrations
Revert the most recently executed migration:
```bash
npm run migration:revert
```

### Generate Migration
Generate a new migration based on entity changes:
```bash
npm run migration:generate -- src/migrations/MigrationName
```

### Create Empty Migration
Create a new empty migration file:
```bash
npm run migration:create -- src/migrations/MigrationName
```

## Existing Migrations

### 1731571447000-SeedInitialGoodsName.ts
Seeds initial goods data into the GOODS_NAME table with 10 sample products:
- G001: Laptop (25,000.00)
- G002: Mouse (500.00)
- G003: Keyboard (1,200.00)
- G004: Monitor (8,000.00)
- G005: USB Cable (150.00)
- G006: Headphones (2,500.00)
- G007: Webcam (3,500.00)
- G008: Microphone (4,000.00)
- G009: Desk Chair (6,500.00)
- G010: Standing Desk (15,000.00)

## Important Notes

1. The `synchronize: true` option in `app.module.ts` should be set to `false` in production when using migrations.
2. Always test migrations in a development environment before running in production.
3. Migrations use the same database connection settings as the main application.
4. The `ON CONFLICT DO NOTHING` clause prevents duplicate inserts if the migration is run multiple times.
