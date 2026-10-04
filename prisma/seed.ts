import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const test = await prisma.test.create({
    data: {
      title: "Role of the Parliament",
      category: "Legal & Parliamentary",
      language: "English",
      difficulty: "BEGINNER",
      duration: 60,

      passage:
        "The Parliament of India is the supreme legislative body of the country. It consists of the President and the two Houses, namely the Council of States and the House of the People. Every law of the land must be passed by both Houses before it receives the assent of the President. The members of the House of the People are directly elected by the citizens of India and represent the will of the people.",

      status: "PUBLISHED",

      createdBy: "development-admin",
    },
  });

  console.log("Created test:");
  console.log(test);
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });