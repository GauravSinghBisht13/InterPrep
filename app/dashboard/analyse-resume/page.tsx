"use client";

import { useRouter } from "next/navigation";
import {
  Sparkles,
  Gauge,
  BriefcaseBusiness,
  Bot,
  Target,
  FileSearch,
  BrainCircuit,
  FileUp,
  ArrowUpRight,
  CheckCircle2,
  ChartNoAxesCombined,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Zap,
  ScanSearch,
  FileText,
  Search,
  Upload,
} from "lucide-react";

export default function AnalyseResumeLanding() {
  const router = useRouter();

  const metrics = [
    {
      icon: Gauge,
      value: "87",
      label: "ATS Score",
      border: "border-violet-400/20",
      background: "from-violet-500/[0.12]",
      color: "text-violet-400",
    },
    {
      icon: BriefcaseBusiness,
      value: "12",
      label: "Roles Explored",
      border: "border-blue-400/20",
      background: "from-blue-500/[0.12]",
      color: "text-blue-400",
    },
    {
      icon: Bot,
      value: "08",
      label: "AI Sessions",
      border: "border-fuchsia-400/20",
      background: "from-fuchsia-500/[0.12]",
      color: "text-fuchsia-400",
    },
    {
      icon: Target,
      value: "92%",
      label: "Profile Match",
      border: "border-emerald-400/20",
      background: "from-emerald-500/[0.12]",
      color: "text-emerald-400",
    },
  ];

  const progressItems = [
    { label: "Required Skills", value: 92 },
    { label: "Keywords", value: 84 },
    { label: "Experience", value: 90 },
    { label: "Role Relevance", value: 86 },
  ];

  const timelineSteps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload resume + job description",
      description:
        "Give Interprep the context it needs to understand your current profile and the position you're targeting.",
      label: "INPUT",
    },
    {
      number: "02",
      icon: FileSearch,
      title: "AI analyzes your profile",
      description:
        "Your skills, experience, keywords, role relevance, and resume structure are evaluated against the target job.",
      label: "ANALYSIS",
    },
    {
      number: "03",
      icon: Gauge,
      title: "Get your complete report",
      description:
        "See your score, missing keywords, skill gaps, and practical recommendations to improve your chances.",
      label: "RESULT",
    },
  ];

  return (
    <main className="mx-auto max-w-[1500px] px-6 pb-20 text-white lg:px-10">
      {/* HERO SECTION */}
      <section className="relative pb-24 pt-20 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          {/* Hero Content */}
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 backdrop-blur">
              <Sparkles size={13} className="text-violet-400" />
              Your personalized career workspace
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Prepare smarter.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Improve your resume.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
              Analyze your resume, understand your ATS performance, identify
              missing skills, and get actionable recommendations to improve your
              chances of getting shortlisted.
            </p>

            <button
              type="button"
              onClick={() => router.push("/ats-check")}
              className="mt-8 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Analyse My Resume
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className={`rounded-2xl border ${metric.border} bg-gradient-to-br ${metric.background} to-transparent p-1 transition duration-300 hover:border-white/20`}
                >
                  <div className="flex h-full min-h-32 flex-col justify-between rounded-xl bg-[#0d0d12] p-5">
                    <div className={metric.color}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-3xl font-semibold tracking-tight">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAREER TOOLKIT HEADING */}
      <section>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
            Your Career Toolkit
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Understand how your resume performs.
          </h2>
        </div>

        {/* ATS ANALYSIS CARD */}
        <div className="group relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] p-7 transition duration-500 hover:border-violet-500/20 lg:p-9">
          <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px]" />

          <div className="relative">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-violet-400">
                  <FileSearch size={19} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                    Resume Intelligence
                  </p>

                  <h3 className="mt-1 text-xl font-medium">
                    Check your ATS score
                  </h3>
                </div>
              </div>

              <ArrowUpRight
                size={19}
                className="text-zinc-600 transition group-hover:text-violet-300"
              />
            </div>

            {/* Score and Progress */}
            <div className="mt-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
              {/* Score Circle */}
              <div className="flex items-center gap-6">
                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/10">
                  <div className="absolute inset-2 rounded-full border-[7px] border-white/5" />

                  <div
                    className="absolute inset-2 rounded-full border-[7px] border-transparent border-t-violet-500 border-r-blue-500"
                    style={{ transform: "rotate(35deg)" }}
                  />

                  <div className="text-center">
                    <p className="text-4xl font-semibold">87</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-600">
                      Score
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Strong profile
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    Your resume is performing well against the target role.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 size={14} />
                    Above average
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5">
                {progressItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        {item.label}
                      </span>

                      <span className="text-xs font-medium text-zinc-300">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400 transition-all duration-700"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-9 flex flex-col gap-5 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Lightbulb
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <div>
                  <p className="text-xs text-zinc-500">Quick improvement</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    Add measurable impact to two project descriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
    HOW TO ANALYSE YOUR RESUME
======================================================= */}

      <section className="relative mt-32 overflow-hidden py-10 sm:py-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[120px]" />

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-violet-300">
            <Sparkles size={14} />
            RESUME INTELLIGENCE
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Analyse Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Resume
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Turn your resume into a career advantage. Follow three simple steps
            to discover your ATS score, identify skill gaps, and improve your
            chances of getting shortlisted.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-20 max-w-6xl">
          {/* Central vertical line */}
          <div className="absolute bottom-16 left-5 top-5 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500/50 to-blue-500/10 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {/* STEP 1 — LEFT */}
            <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 sm:grid-cols-[1fr_72px_1fr] sm:gap-0">
              {/* Left card */}
              <div className="order-2 min-w-0 sm:order-1 sm:pr-10 sm:text-right">
                <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d14] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-950/20 sm:p-7">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/[0.08] blur-3xl transition group-hover:bg-violet-500/[0.15]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-violet-300">
                        STEP 01 / INPUT
                      </span>
                      <FileUp size={18} className="text-violet-400" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                      Upload Your Resume
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Upload your existing resume and add the job description
                      for the position you're targeting. This gives the AI the
                      context it needs to evaluate your profile.
                    </p>

                    {/* Mini resume preview */}
                    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/30 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                          <FileText size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-zinc-200">
                            Your_Resume.pdf
                          </p>
                          <p className="mt-1 text-[10px] text-zinc-500">
                            Resume document
                          </p>
                        </div>

                        <CheckCircle2 size={17} className="text-emerald-400" />
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
                        <div className="h-1.5 w-4/5 rounded-full bg-white/[0.06]" />
                        <div className="h-1.5 w-3/5 rounded-full bg-white/[0.06]" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-md border border-violet-400/15 bg-violet-500/[0.08] px-2 py-1 text-[10px] text-violet-300">
                          Resume
                        </span>
                        <span className="rounded-md border border-blue-400/15 bg-blue-500/[0.08] px-2 py-1 text-[10px] text-blue-300">
                          Job Description
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center marker */}
              <div className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-violet-400/40 bg-[#100d19] shadow-[0_0_25px_rgba(139,92,246,0.2)] sm:relative sm:left-auto sm:top-7 sm:order-2 sm:mx-auto sm:translate-x-0">
                <Upload size={17} className="text-violet-300" />
              </div>

              {/* Right side label */}
              <div className="hidden sm:order-3 sm:flex sm:items-start sm:pl-10">
                <div className="pt-8">
                  <p className="text-xs font-medium tracking-[0.2em] text-zinc-600">
                    START WITH THE BASICS
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
                    Bring your experience and target role together in one place.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-violet-300">
                    <ShieldCheck size={15} />
                    Your profile, your goals
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 — RIGHT */}
            <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 sm:grid-cols-[1fr_72px_1fr] sm:gap-0">
              {/* Left side label */}
              <div className="hidden sm:order-1 sm:flex sm:items-start sm:justify-end sm:pr-10 sm:text-right">
                <div className="pt-8">
                  <p className="text-xs font-medium tracking-[0.2em] text-zinc-600">
                    UNDERSTAND THE GAPS
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
                    Discover what matches the role and what needs more
                    attention.
                  </p>
                  <div className="mt-5 flex items-center justify-end gap-2 text-xs text-blue-300">
                    <Search size={15} />
                    AI-powered evaluation
                  </div>
                </div>
              </div>

              {/* Center marker */}
              <div className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-blue-400/40 bg-[#0c111c] shadow-[0_0_25px_rgba(59,130,246,0.2)] sm:relative sm:left-auto sm:top-7 sm:order-2 sm:mx-auto sm:translate-x-0">
                <ScanSearch size={17} className="text-blue-300" />
              </div>

              {/* Right card */}
              <div className="order-2 min-w-0 sm:order-3 sm:pl-10">
                <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d14] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-950/20 sm:p-7">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/[0.08] blur-3xl transition group-hover:bg-blue-500/[0.15]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-300">
                        STEP 02 / ANALYSIS
                      </span>
                      <BrainCircuit size={18} className="text-blue-400" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                      Let AI Analyse Your Profile
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Evaluate relevant skills, experience, keywords, and
                      alignment with the job requirements to understand where
                      your resume stands.
                    </p>

                    {/* Mini analysis preview */}
                    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/30 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium text-zinc-200">
                            Profile analysis
                          </p>
                          <p className="mt-1 text-[10px] text-zinc-500">
                            Job requirement matching
                          </p>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                          <Target size={17} />
                        </div>
                      </div>

                      <div className="mt-5 space-y-4">
                        {[
                          {
                            label: "Technical skills",
                            value: "92%",
                            width: "92%",
                          },
                          {
                            label: "Role relevance",
                            value: "78%",
                            width: "78%",
                          },
                          { label: "Keywords", value: "85%", width: "85%" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="mb-2 flex justify-between gap-3 text-[10px]">
                              <span className="text-zinc-400">
                                {item.label}
                              </span>
                              <span className="text-zinc-300">
                                {item.value}
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-400"
                                style={{ width: item.width }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="mt-4 text-[10px] text-zinc-600">
                        Illustrative analysis preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 — LEFT */}
            <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 sm:grid-cols-[1fr_72px_1fr] sm:gap-0">
              {/* Left card */}
              <div className="order-2 min-w-0 sm:order-1 sm:pr-10">
                <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d14] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-xl hover:shadow-emerald-950/20 sm:p-7">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/[0.07] blur-3xl transition group-hover:bg-emerald-500/[0.13]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-emerald-300">
                        STEP 03 / RESULTS
                      </span>
                      <ChartNoAxesCombined
                        size={18}
                        className="text-emerald-400"
                      />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                      Improve With Actionable Insights
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Review your ATS score, identify missing skills and
                      keywords, and use practical suggestions to strengthen your
                      resume for the position.
                    </p>

                    {/* Mini report preview */}
                    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/30 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-emerald-400/70 bg-emerald-400/[0.06]">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-white">
                              87
                            </p>
                            <p className="text-[8px] uppercase tracking-wider text-zinc-500">
                              Score
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">
                            Your report is ready
                          </p>
                          <p className="mt-1 text-xs leading-5 text-zinc-500">
                            Review strengths and improvement areas.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400"
                          />
                          Matched skills identified
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <AlertCircle size={14} className="text-amber-400" />
                          Missing keywords highlighted
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Lightbulb size={14} className="text-violet-400" />
                          Improvement suggestions
                        </div>
                      </div>

                      <p className="mt-4 text-[10px] text-zinc-600">
                        Illustrative report preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center marker */}
              <div className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-400/40 bg-[#0b1512] shadow-[0_0_25px_rgba(52,211,153,0.15)] sm:relative sm:left-auto sm:top-7 sm:order-2 sm:mx-auto sm:translate-x-0">
                <ChartNoAxesCombined size={17} className="text-emerald-300" />
              </div>

              {/* Right side label */}
              <div className="hidden sm:order-3 sm:flex sm:items-start sm:pl-10">
                <div className="pt-8">
                  <p className="text-xs font-medium tracking-[0.2em] text-zinc-600">
                    YOUR NEXT MOVE
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
                    Turn your analysis into a focused plan for improving your
                    resume.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-emerald-300">
                    <Zap size={15} />
                    Clear, practical next steps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-16 flex max-w-2xl items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <Lightbulb size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">
              Better insights. Better applications.
            </p>
            <p className="mt-1 text-xs leading-6 text-zinc-500">
              Use the analysis as guidance to improve how you present your
              skills and experience. Your actual ATS results may vary by
              employer and system.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
