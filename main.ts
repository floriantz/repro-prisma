import {PrismaClient, Prisma} from "@prisma/client"

async function main() {
    const client = new PrismaClient();
    const ids = [
        '422b72f9-2ec9-4482-8a2f-527251af5606',
        'ee5f92a7-1741-48d4-b8c3-517e9621453a',
        'f873ef12-2c4d-4bb4-b497-060272db35d2',
        '82886ff1-dba1-4785-a35b-6c6b1a4ec849',
        'ffa933a8-0723-412a-9839-431ce58441fe',
    ];
    await client.repro.createMany({data: ids.map(id => ({id})), skipDuplicates: true});
    try {
        const rows = await client.$queryRaw<{ id: string }[]>(Prisma.sql`
          SELECT id
          FROM repro
          WHERE id IN (${Prisma.join(ids)});
        `);
        console.log(rows);
    } catch (err) {
        console.log(err)
    }

    const rows = await client.$queryRaw<{ id: string }[]>(Prisma.sql`
      SELECT id
      FROM repro
      WHERE id = ANY (ARRAY[${Prisma.join(ids)}]::uuid[]);
    `)
    console.log(rows);
}

main();


