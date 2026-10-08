"use client";

import { useEffect, useState } from "react";
import {
  Check,
  FileSearch,
  KeyRound,
  Sparkles,
  UserRoundCheck,
  BriefcaseBusiness,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Reading your resume",
    description: "Extracting your resume content",
    icon: FileSearch,
  },
  {
    id: 2,
    title: "Finding keywords",
    description: "Identifying important job requirements",
    icon: KeyRound,
  },
  {
    id: 3,
    title: "Matching your skills",
    description: "Comparing skills with the job description",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Checking experience",
    description: "Evaluating experience and responsibilities",
    icon: BriefcaseBusiness,
  },
  {
    id: 5,
    title: "Generating insights",
    description: "Preparing your personalized analysis",
    icon: UserRoundCheck,
  },
];

export default function AnalysisLoading() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => {
        if (current >= steps.length - 1) {
          return current;
        }

        return current + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-4 text-white">
      {/* Background glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

      {/* Loading Card */}

      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d12]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        {/* Top gradient */}

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        {/* Header */}

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
            <Sparkles size={21} className="animate-pulse" />
          </div>

          <h1 className="mt-4 text-lg font-semibold tracking-tight">
            Analyzing your resume
          </h1>

          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            Interprep is comparing your resume with the job description.
          </p>
        </div>

        {/* Progress */}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Analysis progress
            </span>

            <span className="text-[10px] font-medium text-violet-400">
              {Math.min(
                Math.round(((activeStep + 1) / steps.length) * 100),
                100,
              )}
              %
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Steps */}

        <div className="mt-6 space-y-2">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = index < activeStep;
            const active = index === activeStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500 ${
                  active
                    ? "border-violet-500/20 bg-violet-500/[0.06]"
                    : completed
                      ? "border-emerald-500/10 bg-emerald-500/[0.025]"
                      : "border-white/5 bg-white/[0.015]"
                }`}
              >
                {/* Status */}

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${
                    completed
                      ? "bg-emerald-500/10 text-emerald-400"
                      : active
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-white/[0.03] text-zinc-700"
                  }`}
                >
                  {completed ? (
                    <Check size={15} />
                  ) : active ? (
                    <Icon size={15} className="animate-pulse" />
                  ) : (
                    <Icon size={14} />
                  )}
                </div>

                {/* Text */}

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-medium ${
                      completed
                        ? "text-emerald-300"
                        : active
                          ? "text-zinc-200"
                          : "text-zinc-600"
                    }`}
                  >
                    {step.title}
                  </p>

                  {active && (
                    <p className="mt-0.5 truncate text-[10px] text-zinc-600">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Active loader */}

                {active && (
                  <div className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}

        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
          This may take a few moments
        </div>
      </div>
    </main>
  );
}
