const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Apartamento" },
        { name: "Casa" },
        { name: "Comercial" },
        { name: "Rurais" },
        { name: "Terreno" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default type of property", error);
  } finally {
    await db.$disconnect();
  }
}

main();
