import Link from "next/link";
import { Languages, ArrowRight } from "lucide-react";

const POPULAR_TESTS = [
  {
    slug: "role-of-the-parliament",
    language: "English",
    level: "Beginner",
    title: "Role of the Parliament",
    description:
      "The Parliament of India is the supreme legislative body of the country. It consists of the President…",
    wpm: 60,
    minutes: 1,
  },
  {
    slug: "digital-india-initiative",
    language: "English",
    level: "Intermediate",
    title: "Digital India Initiative",
    description:
      "The Digital India programme was launched with a vision to transform the country into a digitally…",
    wpm: 80,
    minutes: 2,
  },
  {
    slug: "office-correspondence",
    language: "English",
    level: "Beginner",
    title: "Office Correspondence",
    description:
      "Dear Sir, with reference to your letter dated the tenth of this month, I am directed to inform you…",
    wpm: 60,
    minutes: 1,
  },
];

export default function PopularTests() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">
              Popular tests
            </h2>
            <p className="mt-1 text-muted-foreground">
              Jump straight into a passage.
            </p>
          </div>

          <Link
            href="/practice"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:opacity-80 sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {POPULAR_TESTS.map((test) => (
            <Link
              key={test.slug}
              href={`/practice/${test.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Languages className="h-3.5 w-3.5" />
                {test.language} · {test.level}
              </div>

              <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary">
                {test.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {test.description}
              </p>

              <div className="mt-5 flex gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  {test.wpm} WPM
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  {test.minutes} min
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE "VIEW ALL" */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/practice"
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}