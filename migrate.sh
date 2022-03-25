docker exec repro-prisma-mysql-1 mysql --user=user --password=password --database=database -e 'create table repro(`id` varchar(255) NOT NULL DEFAULT (UUID()), primary key(id));'
