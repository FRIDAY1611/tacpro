import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Try multiple possible db locations (Hostinger may place it differently)
function findDbPath(): string {
  const candidates = [
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(process.cwd(), 'dev.db'),
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return p
    }
  }
  // fallback to prisma location even if not found (let Prisma report the error)
  return candidates[0]
}

const dbPath = findDbPath()

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
})

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}
