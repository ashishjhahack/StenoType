import { config } from "dotenv";

config({ path: ".env.local" });

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const tests = [
  {
    title: "Role of the Parliament",
    category: "Legal & Parliamentary",
    language: "English",
    difficulty: "BEGINNER" as const,
    targetWpm: 60,
    duration: 60,
    passage:
      "The Parliament of India is the supreme legislative body of the country. It consists of the President and the two Houses, namely the Council of States and the House of the People. Every law of the land must be passed by both Houses before it receives the assent of the President. The members of the House of the People are directly elected by the citizens of India and represent the will of the people.",
  },

  {
    title: "Digital India Initiative",
    category: "Current Affairs",
    language: "English",
    difficulty: "INTERMEDIATE" as const,
    targetWpm: 80,
    duration: 120,
    passage:
      "The Digital India programme was launched with a vision to transform the country into a digitally empowered society and knowledge economy. The programme focuses on improving digital infrastructure, providing government services electronically and increasing digital literacy among citizens. It has played an important role in expanding access to online services across the country.",
  },

  {
    title: "Office Correspondence",
    category: "Office Letters",
    language: "English",
    difficulty: "BEGINNER" as const,
    targetWpm: 60,
    duration: 60,
    passage:
      "Dear Sir, with reference to your letter dated the tenth of this month, I am directed to inform you that your application for leave has been approved by the competent authority. You are requested to resume your duties on the date mentioned in the order.",
  },

  {
    title: "Budget Speech Extract",
    category: "Legal & Parliamentary",
    language: "English",
    difficulty: "INTERMEDIATE" as const,
    targetWpm: 80,
    duration: 120,
    passage:
      "Honourable Speaker, I rise to present the budget for the coming financial year. The economy has shown remarkable resilience in the face of global uncertainty. Our priorities remain focused on inclusive growth, employment generation, infrastructure development and strengthening public services.",
  },

  {
    title: "Constitution of India",
    category: "Indian Polity",
    language: "English",
    difficulty: "INTERMEDIATE" as const,
    targetWpm: 80,
    duration: 120,
    passage:
      "The Constitution of India lays down the framework for the political principles, procedures, powers and duties of government institutions. It also guarantees fundamental rights to citizens and establishes the principles that guide the functioning of the democratic system.",
  },

  {
    title: "Fundamental Rights",
    category: "Indian Polity",
    language: "English",
    difficulty: "BEGINNER" as const,
    targetWpm: 60,
    duration: 60,
    passage:
      "Fundamental Rights are guaranteed by the Constitution of India and protect the basic freedoms and dignity of individuals. These rights include equality before law, freedom of speech and expression, protection of life and personal liberty and freedom of religion.",
  },

  {
    title: "Economic Development",
    category: "General Knowledge",
    language: "English",
    difficulty: "ADVANCED" as const,
    targetWpm: 100,
    duration: 120,
    passage:
      "Economic development involves improvements in the standard of living, productivity, employment opportunities and access to essential services. Sustainable development requires a balance between economic progress, social welfare and responsible use of natural resources.",
  },

  {
    title: "Government Administration",
    category: "Government",
    language: "English",
    difficulty: "ADVANCED" as const,
    targetWpm: 100,
    duration: 180,
    passage:
      "Effective public administration is essential for delivering government programmes and services to citizens. Administrative institutions must operate with transparency, accountability and efficiency while ensuring that public resources are used responsibly.",
  },

  {
    title: "राष्ट्रीय विकास",
    category: "General Knowledge",
    language: "Hindi",
    difficulty: "INTERMEDIATE" as const,
    targetWpm: 80,
    duration: 120,
    passage:
      "भारत का विकास देश के नागरिकों के आर्थिक और सामाजिक जीवन को बेहतर बनाने की निरंतर प्रक्रिया है। शिक्षा, स्वास्थ्य, रोजगार, आधारभूत संरचना और तकनीकी प्रगति राष्ट्रीय विकास के महत्वपूर्ण आधार हैं।",
  },

  {
    title: "Parliamentary Democracy",
    category: "Legal & Parliamentary",
    language: "English",
    difficulty: "ADVANCED" as const,
    targetWpm: 120,
    duration: 180,
    passage:
      "Parliamentary democracy is a system of government in which the executive remains accountable to the legislature. The principles of representation, accountability and collective responsibility form an important part of parliamentary government.",
  },
];

async function main() {
  await prisma.test.deleteMany();

  for (const test of tests) {
    const createdTest = await prisma.test.create({
      data: {
        ...test,
        status: "PUBLISHED",
        createdBy: "development-admin",
      },
    });

    console.log(`Created: ${createdTest.title}`);
  }

  console.log(`\nCreated ${tests.length} tests successfully.`);
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