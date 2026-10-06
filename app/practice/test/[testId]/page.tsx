import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TypingTest from "@/components/TypingTest";

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;

  const test = await prisma.test.findFirst({
    where: { id: testId, status: "PUBLISHED" },
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

  if (!test) {
    notFound();
  }

  return <TypingTest test={test} />;
}