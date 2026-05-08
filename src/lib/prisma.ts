import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const dbUrl = process.env.DATABASE_URL || ile:${path.join(process.cwd(), 'prisma', 'dev.db')}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
})

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}