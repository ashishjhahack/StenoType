import { prisma } from "@/lib/prisma";
import PracticeTestsClient from "@/components/PracticeTestsClient";

export default async function PracticePage() {
  const tests = await prisma.test.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      category: true,
      language: true,
      difficulty: true,
      targetWpm: true,
      duration: true,
      passage: true,
    },
  });

  return <PracticeTestsClient tests={tests} />;
}