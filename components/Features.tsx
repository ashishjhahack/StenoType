import { Timer, Headphones, Target, LineChart } from "lucide-react";

const FEATURES = [
  {
    icon: Timer,
    title: "Timed Typing Tests",
    description:
      "Exam-style passages with a live timer, WPM and accuracy as you type.",
  },
  {
    icon: Headphones,
    title: "Dictation Practice",
    description:
      "Listen at 60–120 WPM, take it down in shorthand, then transcribe and get checked.",
  },
  {
    icon: Target,
    title: "Word-by-Word Checking",
    description:
      "Every mistake is highlighted exactly the way examiners evaluate steno scripts.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Your history is saved so you can watch speed and accuracy climb over time.",
  },
];

export default function Features() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />

              <h3 className="mt-4 text-lg font-bold text-foreground">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}