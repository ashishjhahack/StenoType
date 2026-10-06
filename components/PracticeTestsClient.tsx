"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Languages, Gauge, Clock, Play } from "lucide-react";
import type { Difficulty } from "@/app/generated/prisma/client";

type TestCard = {
  id: string;
  title: string;
  category: string;
  language: string;
  difficulty: Difficulty;
  targetWpm: number;
  duration: number; // seconds
  passage: string;
};

const LEVELS = ["All", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

function formatDifficulty(difficulty: string) {
  return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

function FilterGroup<T extends string | number>({
  icon: Icon,
  label,
  options,
  active,
  onChange,
  renderLabel,
}: {
  icon: typeof Languages;
  label: string;
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
  renderLabel: (value: T) => string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label.toUpperCase()}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === active;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {renderLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PracticeTestsClient({ tests = [] }: { tests: TestCard[] }) {
  const languageOptions = useMemo(
    () => ["All", ...Array.from(new Set(tests.map((t) => t.language)))],
    [tests]
  );

  const speedOptions = useMemo(
    () => [
      "All" as const,
      ...Array.from(new Set(tests.map((t) => t.targetWpm))).sort((a, b) => a - b),
    ],
    [tests]
  );

  const [language, setLanguage] = useState<string>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [speed, setSpeed] = useState<string | number>("All");

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (language !== "All" && test.language !== language) return false;
      if (level !== "All" && test.difficulty !== level) return false;
      if (speed !== "All" && test.targetWpm !== speed) return false;
      return true;
    });
  }, [tests, language, level, speed]);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-foreground">
          Practice Tests
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pick a passage. The timer starts on your first keystroke.
        </p>

        {/* FILTER BAR */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FilterGroup
              icon={Languages}
              label="Language"
              options={languageOptions}
              active={language}
              onChange={setLanguage}
              renderLabel={(v) => v}
            />
            <FilterGroup
              icon={Gauge}
              label="Level"
              options={LEVELS}
              active={level}
              onChange={setLevel}
              renderLabel={(v) => (v === "All" ? "All" : formatDifficulty(v))}
            />
            <FilterGroup
              icon={Clock}
              label="Speed"
              options={speedOptions}
              active={speed}
              onChange={setSpeed}
              renderLabel={(v) => (v === "All" ? "All" : `${v} WPM`)}
            />
          </div>
        </div>

        {/* TEST CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {test.category}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  {test.language}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-foreground">
                {test.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {test.passage}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {formatDifficulty(test.difficulty)}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {test.targetWpm} WPM
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {Math.round(test.duration / 60)} min
                  </span>
                </div>

                <Link
                  href={`/practice/test/${test.id}`}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Play className="h-4 w-4" />
                  Start
                </Link>
              </div>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No tests match these filters. Try widening your selection.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}