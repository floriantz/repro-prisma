# Minimal reproduction repo for a Prisma behaviour change

## Issue

The issue happened on postgresql and the behaviour changed somewhere between prisma `3.15.2` and `4.2.1`.

For a given table of this structure:
````sql
CREATE TABLE repro(
    `id` UUIN NOT NULL PRIMARY KEY,
)
````

When querying a list of rows using an IN query clause like so:
```typescript
   const rows = await this.prismaClient.$queryRaw<
    { id: string }[]
    >(Prisma.sql`
      SELECT id
      FROM repro
      WHERE id IN (${Prisma.join(ids)});
    `)
```

This worked fine in `3.15.2` but returns a type error in `4.2.1`:
```json
{
  "code": "P2010",
  "clientVersion": "4.2.1",
  "meta": {
    "code": "42883",
    "message": "db error: ERROR: operator does not exist: uuid = text\nHINT: No operator matches the given name and argument types. You might need to add explicit type casts."
  }
}
```

This query works on the other hand:
```typescript
   const rows = await this.prismaClient.$queryRaw<
    { id: string }[]
    >(Prisma.sql`
      SELECT id
      FROM repro
      WHERE id = ANY (ARRAY[${Prisma.join(ids)}]::uuid[]);
    `)
```

I haven't seen what would cause this in the upgrade guide and it does look like a regression to me.

## Installation

Requires docker installed.

### Database setup

`docker compose up -d && npx prisma migrate dev`

### Running the script

`npx ts-node main`

We should not get an error for the first query.
