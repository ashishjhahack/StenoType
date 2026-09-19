import Link from "next/link";
import {
  Keyboard,
  Headphones,
  Gauge,
  TrendingUp,
  BookOpenText,
  Target,
} from "lucide-react";

export const metadata = {
  title: "About — StenoType",
  description:
    "Learn what StenoType is, who it is for, and how it helps you master shorthand typing and dictation speed.",
  openGraph: {
    title: "About — StenoType",
    description:
      "How StenoType helps you master shorthand typing and dictation speed.",
  },
};

const FEATURES = [
  {
    icon: Keyboard,
    title: "Real exam-style typing tests",
    body: "Passages modelled on actual stenographer skill tests, evaluated word-by-word exactly the way examiners do — so your score here means something out there.",
  },
  {
    icon: Headphones,
    title: "Dictation practice",
    body: "Train your ear-to-hand speed with dictation passages at controlled difficulty levels, from beginner drills up to 120 WPM court-grade material.",
  },
  {
    icon: Gauge,
    title: "Accurate speed & accuracy scoring",
    body: "Net WPM, gross WPM, error count and accuracy percentage — computed per attempt with the standard steno evaluation formula.",
  },
  {
    icon: TrendingUp,
    title: "Progress dashboard",
    body: "Every attempt is saved. Watch your speed curve climb, spot weak days, and keep your practice streak alive.",
  },
  {
    icon: BookOpenText,
    title: "Curated passage library",
    body: "Legal, parliamentary, office correspondence, and current-affairs passages in graded difficulty across English and Hindi.",
  },
  {
    icon: Target,
    title: "Built for focus",
    body: "A calm, dark-blue workspace with zero clutter. Designed to keep your eyes comfortable through long practice sessions.",
  },
];

const STEPS = [
  { n: "01", title: "Pick a passage", body: "Choose from the practice library by category, language and difficulty." },
  { n: "02", title: "Type against the clock", body: "Transcribe the passage as fast and as accurately as you can." },
  { n: "03", title: "Review your score", body: "See word-level errors highlighted and your net WPM instantly." },
  { n: "04", title: "Track your growth", body: "Open the dashboard to see speed trends, streaks and history." },
];

function TypingIllustration() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="mx-auto h-auto w-full max-w-sm text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* desk surface */}
      <ellipse cx="160" cy="158" rx="140" ry="10" className="fill-muted/40" />

      {/* keyboard body */}
      <rect
        x="60"
        y="90"
        width="200"
        height="56"
        rx="10"
        className="fill-card stroke-current"
        strokeWidth="2"
      />

      {/* keyboard keys grid */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={72 + col * 24}
            y={100 + row * 15}
            width="18"
            height="10"
            rx="2.5"
            className="fill-current opacity-70"
          />
        ))
      )}

      {/* screen / monitor behind */}
      <rect
        x="95"
        y="22"
        width="130"
        height="58"
        rx="8"
        className="fill-card stroke-current"
        strokeWidth="2"
      />
      <rect x="106" y="34" width="70" height="6" rx="3" className="fill-current opacity-60" />
      <rect x="106" y="46" width="100" height="6" rx="3" className="fill-current opacity-40" />
      <rect x="106" y="58" width="55" height="6" rx="3" className="fill-current opacity-40" />

      {/* monitor stand */}
      <rect x="150" y="80" width="20" height="10" className="fill-current opacity-60" />

      {/* typing hands (simplified) */}
      <path
        d="M85 118c-6-4-14-2-16 4-2 6 2 12 10 12h10"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M235 118c6-4 14-2 16 4 2 6-2 12-10 12h-10"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* floating cyan accent dots (motion / speed cue) */}
      <circle cx="270" cy="60" r="4" className="fill-current opacity-80" />
      <circle cx="285" cy="72" r="3" className="fill-current opacity-50" />
      <circle cx="50" cy="60" r="4" className="fill-current opacity-80" />
      <circle cx="36" cy="72" r="3" className="fill-current opacity-50" />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            About StenoType
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Master shorthand speed,{" "}
            <span className="text-primary">one passage at a time</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            StenoType is a focused practice space for stenography aspirants.
            Whether you're preparing for SSC Stenographer, court reporter
            exams, or state recruitment tests, consistent timed practice is
            what moves your speed — and StenoType makes that practice
            measurable.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/practice"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a practice test
            </Link>
            <Link
              href="/progress"
              className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              View your dashboard
            </Link>
          </div>
        </div>

        {/* CENTERED TYPING ILLUSTRATION */}
        <div className="mt-16">
          <TypingIllustration />
        </div>

        {/* FEATURES */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            Everything you need to get faster
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            How it works
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="font-mono text-sm font-semibold text-primary">
                  {s.n}
                </div>
                <h3 className="mt-2 font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Speed comes from repetition.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ten focused minutes a day beats an occasional marathon session.
            Take your first test now — your dashboard starts counting from
            today.
          </p>
          <Link
            href="/practice"
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Take a test now
          </Link>
        </div>
      </div>
    </div>
  );
}