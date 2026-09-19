import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "60,000+", label: "Words practiced" },
  { value: "500+", label: "Active learners" },
  { value: "100%", label: "Exam-accurate scoring" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* BADGE */}
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Built for steno aspirants
        </div>

        {/* HEADING */}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Type faster. Transcribe cleaner.{" "}
          <span className="text-primary">Clear the steno exam.</span>
        </h1>

        {/* SUBTEXT */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A calm, dark workspace for practising shorthand dictation and
          transcription typing — with exam-accurate word-by-word evaluation.
        </p>

        {/* CTAS */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a practice test
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dictation"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Try dictation
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-6 py-6"
            >
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}