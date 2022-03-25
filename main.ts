import {v4 as uuid} from "uuid"
import {PrismaClient} from "@prisma/client"

async function main() {
    const client = new PrismaClient();
    const id = uuid();
    const created = await client.repro.create({data: {id}});
    console.log(`provided id: ${id}, created id: ${created.id}`)
}

main();


