// Crea las secciones del medio. Ejecuta: npm run db:seed
import { PrismaClient } from "@prisma/client";
import { CATEGORIES } from "../lib/config";

const prisma = new PrismaClient();
async function main() {
  let order = 0;
  for (const [slug, c] of Object.entries(CATEGORIES)) {
    await prisma.category.upsert({ where: { slug }, update: { name: c.name, description: c.desc, order }, create: { slug, name: c.name, description: c.desc, order } });
    order++;
  }
  await prisma.author.upsert({ where: { id: "redaccion" }, update: {}, create: { id: "redaccion", name: "Redacción Sociedad al Límite" } });
  console.log("Secciones creadas.");
}
main().finally(() => prisma.$disconnect());
