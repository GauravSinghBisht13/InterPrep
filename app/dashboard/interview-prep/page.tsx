"use client";

import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  BrainCircuit,
  BriefcaseBusiness,
  Mic,
  MessageSquareText,
  ChartNoAxesCombined,
  Target,
} from "lucide-react";

const roles = [
  {
    title: "Frontend Developer",
    description: "React, JavaScript, TypeScript, CSS and browser fundamentals.",
    icon: Code2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Full Stack Developer",
    description: "Frontend, Node.js, REST APIs, databases and system design.",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Software Engineer",
    description: "DSA, problem-solving, OOP and technical fundamentals.",
    icon: BrainCircuit,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
  },
  {
    title: "Behavioral Interview",
    description: "Projects, teamwork, communication and real-world scenarios.",
    icon: BriefcaseBusiness,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Set Your Interview Goals",
    description:
      "Choose your target role, experience level, interview duration and topics you want to practice.",
    icon: Target,
    side: "left",
  },
  {
    number: "02",
    title: "AI Builds Your Interview Plan",
    description:
      "AI analyzes your resume and job description to create a personalized interview plan and question set.",
    icon: BrainCircuit,
    side: "right",
  },
  {
    number: "03",
    title: "Practice with Your AI Interviewer",
    description:
      "Answer questions one by one using your voice or text, just like a real interview.",
    icon: Mic,
    side: "left",
  },
  {
    number: "04",
    title: "Get Feedback and Follow-ups",
    description:
      "AI evaluates your answers and asks relevant follow-up questions based on your responses.",
    icon: MessageSquareText,
    side: "right",
  },
  {
    number: "05",
    title: "Review Your Performance",
    description:
      "Get a performance report with your strengths, improvement areas and a personalized study plan.",
    icon: ChartNoAxesCombined,
    side: "left",
  },
];

export default function InterviewPrepLanding() {
  const router = useRouter();

  const startInterview = (role?: string) => {
    const query = role ? `?role=${encodeURIComponent(role)}` : "";
    router.push(`/dashboard/interview-prep/ai-interview`);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0d12] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_65%)]" />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-300">
              <Sparkles size={15} />
              Your personal AI interview coach
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Prepare for your next interview.
              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Practice with AI.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Simulate real interviews, practice role-specific questions,
              improve your answers and build the confidence to land your next
              opportunity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => startInterview()}
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
              >
                Start Interview
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                How it works
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Personalized questions
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                Voice or text answers
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Actionable feedback
              </span>
            </div>
          </div>

          {/* Interview preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-3xl bg-violet-500/10 blur-3xl" />

            <div className="relative rounded-2xl border border-white/10 bg-[#121218] p-5 shadow-2xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    AI Mock Interview
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Frontend Developer
                  </p>
                </div>

                <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Practice mode
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <BrainCircuit size={19} />
                </div>

                <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="mb-2 text-xs font-medium text-violet-300">
                    AI Interviewer
                  </p>
                  <p className="text-sm leading-6 text-zinc-200">
                    Can you explain how React&apos;s virtual DOM works and how
                    it helps improve rendering performance?
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Mic size={18} />
                </div>

                <div className="flex-1 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-4">
                  <p className="mb-2 text-xs font-medium text-blue-300">
                    Your response
                  </p>
                  <p className="text-sm leading-6 text-zinc-400">
                    Record your answer or type a response. Your answer will be
                    evaluated before the next question.
                  </p>

                  <div className="mt-4 flex items-center gap-1.5">
                    {[12, 20, 28, 16, 24, 32, 18, 26, 12, 22, 30, 16].map(
                      (height, index) => (
                        <span
                          key={index}
                          className="w-1 rounded-full bg-violet-400/70"
                          style={{ height: `${height}px` }}
                        />
                      ),
                    )}
                    <span className="ml-2 text-xs text-zinc-500">
                      Voice response preview
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="text-xs text-zinc-500">
                  Question 1 of your interview
                </span>
                <span className="flex items-center gap-1.5 text-xs text-violet-300">
                  <Sparkles size={13} />
                  Adaptive questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-violet-400">
              Choose your path
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What are you preparing for?
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Select a role to start a focused practice session tailored to the
            skills that matter.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.title}
                onClick={() => startInterview(role.title)}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${role.bg} ${role.color}`}
                  >
                    <Icon size={21} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-600 transition group-hover:text-violet-300"
                  />
                </div>

                <h3 className="mt-5 font-semibold text-white">{role.title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {role.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet-300">
                  Practice now
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* How it works: alternating timeline */}
      <section
        id="how-it-works"
        className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
      >
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-300">
            <Sparkles size={14} />
            Simple process
          </div>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How It{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            From setting your goals to receiving actionable feedback, prepare
            for your next interview in five simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Center line on desktop, left line on mobile */}
          <div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500 to-blue-500 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {steps.map((step) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";

              const content = (
                <div className="rounded-2xl border border-white/[0.08] bg-[#111116]/90 p-5 transition duration-200 hover:border-violet-500/30 hover:bg-white/[0.035] sm:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.18em] text-violet-400">
                      STEP {step.number}
                    </span>
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              );

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-[40px_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] sm:gap-5"
                >
                  {/* Left column */}
                  <div className="hidden sm:block">
                    {isLeft ? (
                      <div className="text-right">{content}</div>
                    ) : null}
                  </div>

                  {/* Center timeline marker */}
                  <div className="relative z-10 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-[#171220] shadow-[0_0_24px_rgba(139,92,246,0.16)] ring-4 ring-[#0d0d12]">
                      <Icon size={17} className="text-violet-300" />
                    </div>
                  </div>

                  {/* Right column; all steps appear here on mobile */}
                  <div>
                    {(!isLeft || true) && (
                      <div className={isLeft ? "sm:hidden" : ""}>{content}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.12] via-[#15121e] to-blue-500/[0.08] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-3/4 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Sparkles size={23} />
            </div>

            <h2 className="text-2xl font-semibold sm:text-3xl">
              Your next interview starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base">
              Practice at your own pace, understand where you can improve and
              walk into your next interview with confidence.
            </p>

            <button
              onClick={() => startInterview()}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
            >
              Start Your Interview
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
