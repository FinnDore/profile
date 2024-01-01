import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server.mjs';

const libsql = createClient({
    url: `${process.env.DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`
});

export const adapter = new PrismaLibSQL(libsql);
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log:
            env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error']
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
