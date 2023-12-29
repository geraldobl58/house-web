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

  try {
    await db.bathroom.createMany({
      data: [
        { quantity: 1 },
        { quantity: 2 },
        { quantity: 3 },
        { quantity: 4 },
        { quantity: 5 },
      ],
    });
  } catch (error) {
    console.error("Error seeding default type of bathroom", error);
  } finally {
    await db.$disconnect();
  }

  try {
    await db.bedroom.createMany({
      data: [
        { quantity: 1 },
        { quantity: 2 },
        { quantity: 3 },
        { quantity: 4 },
        { quantity: 5 },
      ],
    });
  } catch (error) {
    console.error("Error seeding default type of bedroom", error);
  } finally {
    await db.$disconnect();
  }

  try {
    await db.garage.createMany({
      data: [
        { quantity: 1 },
        { quantity: 2 },
        { quantity: 3 },
        { quantity: 4 },
        { quantity: 5 },
      ],
    });
  } catch (error) {
    console.error("Error seeding default type of garage", error);
  } finally {
    await db.$disconnect();
  }
}

main();
