"use client";
 
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Gauge, Target, AlertTriangle } from "lucide-react";
import type { Difficulty } from "@/app/generated/prisma/client";
 
type TestDetail = {
  id: string;
  title: string;
  category: string;
  language: string;
  difficulty: Difficulty;
  targetWpm: number;
  duration: number; // seconds
  passage: string;
};
 
function formatDifficulty(difficulty: string) {
  return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}
 
function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
 
export default function TypingTest({ test }: { test: TestDetail }) {
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(test.duration);
  const [isFinished, setIsFinished] = useState(false);
 
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
 
  // Countdown, starts only once the user has typed their first character.
  useEffect(() => {
    if (!startedAt || isFinished) return;
 
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
 
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startedAt, isFinished]);
 
  const elapsedSeconds = startedAt ? test.duration - timeLeft : 0;
 
  const { grossWpm, accuracy, errors } = useMemo(() => {
    if (input.length === 0) {
      return { grossWpm: null as number | null, accuracy: null as number | null, errors: 0 };
    }
 
    let mismatches = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== test.passage[i]) mismatches++;
    }
 
    const accuracyValue = Math.round(
      ((input.length - mismatches) / input.length) * 100
    );
 
    const minutesElapsed = elapsedSeconds / 60;
    const wpmValue =
      minutesElapsed > 0 ? Math.round(input.length / 5 / minutesElapsed) : 0;
 
    return { grossWpm: wpmValue, accuracy: accuracyValue, errors: mismatches };
  }, [input, elapsedSeconds, test.passage]);
 
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
 
    if (!startedAt && value.length > 0) {
      setStartedAt(Date.now());
    }
 
    setInput(value);
  }
 
  function handleReset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setInput("");
    setStartedAt(null);
    setTimeLeft(test.duration);
    setIsFinished(false);
  }
 
  function handleSubmit() {
    if (!startedAt || isFinished) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsFinished(true);
  }
 
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* BACK LINK */}
        <Link
          href="/practice"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All tests
        </Link>
 
        {/* HEADER */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              {test.title}
            </h1>
            <p className="mt-1 text-muted-foreground">{test.category}</p>
          </div>
 
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
              {test.language}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
              {formatDifficulty(test.difficulty)}
            </span>
            <span className="rounded-full border border-primary bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {Math.round(test.duration / 60)} min
            </span>
          </div>
        </div>
 
        {/* STATS */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              TIME LEFT
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
          </div>
 
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" />
              GROSS WPM
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {grossWpm === null ? "—" : grossWpm}
            </div>
          </div>
 
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              ACCURACY
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {accuracy === null ? "—" : `${accuracy}%`}
            </div>
          </div>
 
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" />
              ERRORS
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">
              {input.length === 0 ? "—" : errors}
            </div>
          </div>
        </div>
 
        {/* PASSAGE */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <p className="whitespace-pre-wrap font-mono text-lg leading-relaxed text-muted-foreground">
            {test.passage}
          </p>
        </div>
 
        {/* INPUT */}
        <div className="mt-6">
          <textarea
            value={input}
            onChange={handleChange}
            disabled={isFinished}
            rows={6}
            placeholder="Start typing the passage here… timer starts on your first key."
            className="w-full resize-none rounded-2xl border-2 border-primary bg-background/50 p-6 font-mono text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
 
        {/* ACTIONS */}
        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Reset
          </button>
 
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!startedAt || isFinished}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit
          </button>
        </div>
 
        {isFinished && (
          <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-center text-sm font-medium text-primary">
            Time's up — {grossWpm} WPM, {accuracy}% accuracy, {errors} error
            {errors === 1 ? "" : "s"}.
          </div>
        )}
      </div>
    </section>
  );
}