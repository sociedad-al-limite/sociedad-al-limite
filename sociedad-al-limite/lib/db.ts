import { PrismaClient } from "@prisma/client";

/** Devuelve el cliente de Prisma solo si hay base de datos configurada. */
const g = globalThis as unknown as { prisma?: PrismaClient };

export function db(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!g.prisma) g.prisma = new PrismaClient();
  return g.prisma;
}
