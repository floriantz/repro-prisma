# Minimal reproduction repo for a Prisma behaviour change

## Issue

The issue happened on mysql8+ and the behaviour changed somewhere between prisma `3.8.4` and `3.11.0`.

For a given table of this structure:
````sql
CREATE TABLE repro(
    `id` varchar(255) NOT NULL DEFAULT (UUID()),
    PRIMARY KEY(id)
)
````

When creating a new row with prisma create where we provide the id directly:
```typescript
    const created = await client.repro.create({data: {uuid()});
```

In `3.8.4`, the id will be the one we set explicitely
In `3.11.0`, prisma will ignore the id, and let the DB generate one.

I haven't seen anything in the changelogs documenting this change and this led to some hard to debug issues when bumping Prisma.

## Installation

Requires docker installed.

### Database setup

`docker compose up -d && ./migrate.sh`

### Node project setup

To test the different behaviour, change the prisma version between `3.8.4` and `3.11.0`.

`npm i && npx npx prisma generate --schema prisma/schema.prisma`

### Running the script

`npx ts-node main`

The provided id and created id should be the same.
