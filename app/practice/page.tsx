"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Languages, Gauge, Clock, Play } from "lucide-react";

type Test = {
  id: string;
  category: string;
  language: "English" | "Hindi";
  level: "Beginner" | "Intermediate" | "Advanced";
  wpm: 60 | 80 | 100 | 120;
  title: string;
  description: string;
} & (
  | { fixedMinutes: number; minuteOptions?: never }
  | { minuteOptions: number[]; fixedMinutes?: never }
);

const TESTS: Test[] = [
  {
    id: "role-of-the-parliament",
    category: "Legal & Parliamentary",
    language: "English",
    level: "Beginner",
    wpm: 60,
    title: "Role of the Parliament",
    description:
      "The Parliament of India is the supreme legislative body of the country. It consists of the President and the two Houses, namely the Council of States…",
    fixedMinutes: 1,
  },
  {
    id: "digital-india-initiative",
    category: "Current Affairs",
    language: "English",
    level: "Intermediate",
    wpm: 80,
    title: "Digital India Initiative",
    description:
      "The Digital India programme was launched with a vision to transform the country into a digitally empowered society and knowledge economy. Under thi…",
    fixedMinutes: 2,
  },
  {
    id: "office-correspondence",
    category: "Office Letters",
    language: "English",
    level: "Beginner",
    wpm: 60,
    title: "Office Correspondence",
    description:
      "Dear Sir, with reference to your letter dated the tenth of this month, I am directed to inform you that your application for leave has been approved by th…",
    minuteOptions: [1, 2, 3],
  },
  {
    id: "budget-speech-extract",
    category: "Legal & Parliamentary",
    language: "English",
    level: "Advanced",
    wpm: 100,
    title: "Budget Speech Extract",
    description:
      "Honourable Speaker, I rise to present the budget for the coming financial year. The economy has shown remarkable resilience in the face of global uncertaint…",
    fixedMinutes: 3,
  },
  {
    id: "swatantrata-diwas-bhashan",
    category: "Current Affairs",
    language: "Hindi",
    level: "Intermediate",
    wpm: 80,
    title: "स्वतंत्रता दिवस भाषण",
    description:
      "प्रिय देशवासियों, आज हम अपने देश की स्वतंत्रता के गौरवशाली इतिहास को याद करने के लिए यहाँ एकत्रित हुए हैं। यह दिन हमें बलिदानों की याद दिलाता है…",
    minuteOptions: [2, 3, 5],
  },
  {
    id: "karyalayin-patra",
    category: "Office Letters",
    language: "Hindi",
    level: "Beginner",
    wpm: 60,
    title: "कार्यालयीन पत्र",
    description:
      "महोदय, आपके पत्र दिनांक दस तारीख के संदर्भ में, मुझे यह सूचित करने का निर्देश दिया गया है कि आपका अवकाश आवेदन स्वीकृत कर लिया गया है…",
    fixedMinutes: 1,
  },
  {
    id: "climate-change-brief",
    category: "Current Affairs",
    language: "English",
    level: "Advanced",
    wpm: 120,
    title: "Climate Change Brief",
    description:
      "Rising global temperatures continue to reshape weather patterns, agriculture, and coastal ecosystems. Policymakers face mounting pressure to accelerate the transition…",
    minuteOptions: [3, 5],
  },
  {
    id: "samvidhan-prastavna",
    category: "Legal & Parliamentary",
    language: "Hindi",
    level: "Intermediate",
    wpm: 80,
    title: "संविधान की प्रस्तावना",
    description:
      "हम भारत के लोग, भारत को एक संपूर्ण प्रभुत्व-संपन्न समाजवादी पंथनिरपेक्ष लोकतंत्रात्मक गणराज्य बनाने के लिए दृढ़संकल्पित हैं…",
    fixedMinutes: 2,
  },
  {
    id: "annual-report-summary",
    category: "Business",
    language: "English",
    level: "Advanced",
    wpm: 100,
    title: "Annual Report Summary",
    description:
      "The company recorded steady revenue growth this fiscal year, driven by strong performance across its core business segments and disciplined cost management…",
    minuteOptions: [2, 3, 5],
  },
  {
    id: "rashtriya-shiksha-niti",
    category: "Current Affairs",
    language: "Hindi",
    level: "Advanced",
    wpm: 120,
    title: "राष्ट्रीय शिक्षा नीति",
    description:
      "राष्ट्रीय शिक्षा नीति का उद्देश्य भारत की शिक्षा प्रणाली में व्यापक सुधार लाना है, जिसमें स्कूली शिक्षा से लेकर उच्च शिक्षा तक के हर पहलू को शामिल किया गया है…",
    fixedMinutes: 3,
  },
];

const LANGUAGES = ["All", "English", "Hindi"] as const;
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const SPEEDS = ["All", 60, 80, 100, 120] as const;

function FilterGroup<T extends string | number>({
  icon: Icon,
  label,
  options,
  active,
  onChange,
}: {
  icon: typeof Languages;
  label: string;
  options: readonly T[];
  active: T;
  onChange: (value: T) => void;
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
              {typeof option === "number" ? `${option} WPM` : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>("All");

  // Per-test selected duration, only relevant for tests with minuteOptions.
  const [selectedMinutes, setSelectedMinutes] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        TESTS.filter((t) => t.minuteOptions).map((t) => [t.id, t.minuteOptions![0]])
      )
  );

  const filteredTests = useMemo(() => {
    return TESTS.filter((test) => {
      if (language !== "All" && test.language !== language) return false;
      if (level !== "All" && test.level !== level) return false;
      if (speed !== "All" && test.wpm !== speed) return false;
      return true;
    });
  }, [language, level, speed]);

  function handleStart(test: Test) {
    const minutes = test.fixedMinutes ?? selectedMinutes[test.id];
    router.push(`/practice/${test.id}?minutes=${minutes}`);
  }

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
              options={LANGUAGES}
              active={language}
              onChange={setLanguage}
            />
            <FilterGroup
              icon={Gauge}
              label="Level"
              options={LEVELS}
              active={level}
              onChange={setLevel}
            />
            <FilterGroup
              icon={Clock}
              label="Speed"
              options={SPEEDS}
              active={speed}
              onChange={setSpeed}
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
                {test.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {test.level}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {test.wpm} WPM
                  </span>

                  {test.fixedMinutes ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {test.fixedMinutes} min
                    </span>
                  ) : (
                    <select
                      value={selectedMinutes[test.id]}
                      onChange={(e) =>
                        setSelectedMinutes((prev) => ({
                          ...prev,
                          [test.id]: Number(e.target.value),
                        }))
                      }
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      {test.minuteOptions!.map((m) => (
                        <option key={m} value={m}>
                          {m} min
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleStart(test)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Play className="h-4 w-4" />
                  Start
                </button>
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