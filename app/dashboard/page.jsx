"use client";

import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  FileText,
  Gauge,
  Layers3,
  Lightbulb,
  Mic2,
  Search,
  Sparkles,
  Target,
  Upload,
  Video,
  Zap,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function InterprepDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Main glow */}
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[150px]" />

        {/* Blue glow */}
        <div className="absolute right-[-250px] top-[500px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

        {/* Left glow */}
        <div className="absolute left-[-250px] top-[1100px] h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[140px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <Sparkles size={17} />
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-tight">
                Interprep
              </p>

              <p className="hidden text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:block">
                Career Intelligence
              </p>
            </div>
          </div>

          {/* Status */}

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs text-zinc-500 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            AI Career Assistant Active
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Bell size={17} />

              <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
            </button>

            <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-2.5 text-sm transition hover:bg-white/[0.06]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-semibold">
                G
              </div>

              <span className="hidden text-zinc-300 sm:block">Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="mx-auto max-w-[1500px] px-6 pb-20 lg:px-10">
        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="relative pb-24 pt-20 lg:pt-28">
          <div className="max-w-4xl">
            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 backdrop-blur">
              <Sparkles size={13} className="text-violet-400" />
              Your personalized career workspace
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Prepare smarter.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Interview stronger.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
              Analyze your resume, understand your ATS performance and practice
              role-specific interviews with an AI that understands where you
              want to go.
            </p>
          </div>

          {/* Metrics */}

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            <HeroMetric
              icon={<Gauge size={16} />}
              value="87"
              label="ATS Score"
            />

            <HeroMetric
              icon={<BriefcaseBusiness size={16} />}
              value="12"
              label="Roles Explored"
            />

            <HeroMetric
              icon={<Bot size={16} />}
              value="08"
              label="AI Sessions"
            />

            <HeroMetric
              icon={<Target size={16} />}
              value="92%"
              label="Profile Match"
            />
          </div>
        </section>

        {/* =======================================================
            CAREER TOOLKIT
        ======================================================= */}

        <section>
          <SectionHeader
            eyebrow="YOUR CAREER TOOLKIT"
            title="Everything you need to become interview-ready."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            {/* =================================================
                ATS CARD
            ================================================= */}

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] p-7 transition duration-500 hover:border-violet-500/20 lg:p-9">
              {/* Glow */}

              <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px]" />

              <div className="relative">
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
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
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-zinc-600 transition group-hover:text-violet-300"
                  />
                </div>

                {/* ATS content */}

                <div className="mt-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
                  {/* Score */}

                  <div className="flex items-center gap-6">
                    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/10">
                      <div className="absolute inset-2 rounded-full border-[7px] border-white/5" />

                      <div
                        className="absolute inset-2 rounded-full border-[7px] border-transparent border-t-violet-500 border-r-blue-500"
                        style={{
                          transform: "rotate(35deg)",
                        }}
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

                  {/* Analysis */}

                  <div className="space-y-5">
                    <ProgressRow
                      label="Required Skills"
                      value="92%"
                      width="92%"
                    />

                    <ProgressRow label="Keywords" value="84%" width="84%" />

                    <ProgressRow label="Experience" value="90%" width="90%" />

                    <ProgressRow
                      label="Role Relevance"
                      value="86%"
                      width="86%"
                    />
                  </div>
                </div>

                {/* Bottom */}

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

                  {/* ATS BUTTON */}

                  <button
                    onClick={() => router.push("/ats-check")}
                    className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
                  >
                    Explore ATS Analysis
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                AI INTERVIEW CARD
            ================================================= */}

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] p-7 transition duration-500 hover:border-blue-500/20 lg:p-9">
              {/* Glow */}

              <div className="absolute bottom-[-120px] right-[-80px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

              <div className="relative">
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-blue-400">
                        <Video size={19} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                          AI Interviewer
                        </p>

                        <h3 className="mt-1 text-xl font-medium">
                          Practice with AI
                        </h3>
                      </div>
                    </div>
                  </div>

                  <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    LIVE
                  </span>
                </div>

                {/* Mock interview */}

                <div className="mt-9 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                      <Bot size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-zinc-600">Interprep AI</p>

                      <p className="mt-1 text-sm font-medium">
                        Frontend Engineer
                      </p>
                    </div>
                  </div>

                  {/* Question */}

                  <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <p className="text-xs text-zinc-600">Interview question</p>

                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Tell me about a performance issue you solved in React.
                    </p>
                  </div>

                  {/* Audio */}

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04]">
                      <Mic2 size={15} className="text-zinc-500" />
                    </div>

                    <div className="flex flex-1 items-center gap-1">
                      {[18, 27, 12, 32, 22, 36, 17, 28, 20, 34].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="w-1 rounded-full bg-gradient-to-t from-violet-500/50 to-blue-400/80"
                            style={{
                              height: `${height}px`,
                            }}
                          />
                        ),
                      )}
                    </div>

                    <span className="text-[10px] text-zinc-600">Listening</span>
                  </div>
                </div>

                {/* Button */}

                <button className="group mt-6 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.05]">
                  Start AI Interview
                  <ArrowRight
                    size={15}
                    className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            ATS DEEP DIVE
        ======================================================= */}

        <section className="mt-28">
          <div className="grid items-start gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Left */}

            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-medium text-violet-400">
                RESUME INTELLIGENCE
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Know exactly
                <br />
                <span className="text-zinc-600">where you stand.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                Don't guess whether your resume is good enough. Interprep
                compares your profile against the requirements of the role you
                actually want.
              </p>

              {/* Tags */}

              <div className="mt-8 flex flex-wrap gap-2">
                <Tag icon={<FileText size={12} />} text="Resume" />

                <Tag icon={<Search size={12} />} text="Keywords" />

                <Tag icon={<Target size={12} />} text="Skills" />

                <Tag icon={<Gauge size={12} />} text="ATS" />
              </div>
            </div>

            {/* Timeline */}

            <div className="relative">
              {/* Vertical line */}

              <div className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-violet-500/50 via-white/10 to-transparent" />

              <TimelineStep
                number="01"
                icon={<Upload size={17} />}
                title="Upload resume + job description"
                description="Give Interprep the context it needs to understand your current profile and the position you're targeting."
                label="INPUT"
              />

              <TimelineStep
                number="02"
                icon={<FileSearch size={17} />}
                title="AI analyzes your profile"
                description="Your skills, experience, keywords, role relevance and resume structure are evaluated against the target job."
                label="ANALYSIS"
              />

              <TimelineStep
                number="03"
                icon={<Gauge size={17} />}
                title="Get your complete report"
                description="See your score, missing keywords, skill gaps and practical recommendations to improve your chances."
                label="RESULT"
              />
            </div>
          </div>
        </section>

        {/* =======================================================
            AI INTERVIEW
        ======================================================= */}

        <section className="relative mt-32 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b10]">
          {/* Glow */}

          <div className="absolute left-1/2 top-[-200px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-500/8 blur-[120px]" />

          <div className="relative p-7 sm:p-10 lg:p-14">
            {/* Heading */}

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs text-violet-300">
                <Bot size={13} />
                AI Interview Preparation
              </div>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Practice for the role.
                <br />
                <span className="text-zinc-600">
                  Not just another question list.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500">
                Choose your target role, configure your interview and let AI
                simulate a realistic interview experience with instant feedback.
              </p>
            </div>

            {/* Search */}

            <div className="mt-10 max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <Search size={17} className="text-zinc-600" />

                <input
                  type="text"
                  placeholder="Search a role — e.g. Frontend Engineer"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-700"
                />

                <kbd className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-zinc-600 sm:block">
                  ⌘ K
                </kbd>
              </div>
            </div>

            {/* Roles */}

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Frontend Engineer",
                "React Developer",
                "Full Stack Developer",
                "Software Engineer",
              ].map((role) => (
                <button
                  key={role}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-zinc-200"
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Interview flow */}

            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <InterviewStep
                number="01"
                icon={<BriefcaseBusiness size={18} />}
                title="Choose your Role"
                description="3000+ roles"
              />

              <InterviewStep
                number="02"
                icon={<Layers3 size={18} />}
                title="Set Round & Difficulty"
                description="4 round types"
              />

              <InterviewStep
                number="03"
                icon={<Video size={18} />}
                title="Practice with AI"
                description="AI video interview"
              />

              <InterviewStep
                number="04"
                icon={<Zap size={18} />}
                title="Get Instant Feedback"
                description="AI performance report"
              />
            </div>

            {/* CTA */}

            <div className="mt-12 flex flex-col gap-5 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-medium">
                  Ready for your next interview?
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  Practice once. Walk in more confident.
                </p>
              </div>

              <button className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200">
                Start AI Interview
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================
            FOOTER
        ======================================================= */}

        <footer className="mt-20 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <Sparkles size={12} />
              </div>

              <span className="font-medium text-zinc-400">Interprep</span>
            </div>

            <p>
              © 2026 Interprep · Crafted by Gaurav Singh Bisht · All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* =============================================================
   HERO METRIC
============================================================= */

function HeroMetric({ icon, value, label }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="text-zinc-600 transition group-hover:text-violet-400">
          {icon}
        </div>

        <ArrowUpRight
          size={13}
          className="text-zinc-800 transition group-hover:text-zinc-500"
        />
      </div>

      <p className="mt-5 text-xl font-semibold">{value}</p>

      <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-600">
        {label}
      </p>
    </div>
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.18em] text-violet-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/* =============================================================
   PROGRESS ROW
============================================================= */

function ProgressRow({ label, value, width }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-zinc-500">{label}</span>

        <span className="text-zinc-300">{value}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
          style={{
            width: width,
          }}
        />
      </div>
    </div>
  );
}

/* =============================================================
   TAG
============================================================= */

function Tag({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-500">
      <span className="text-zinc-600">{icon}</span>

      {text}
    </div>
  );
}

/* =============================================================
   TIMELINE STEP
============================================================= */

function TimelineStep({ number, icon, title, description, label }) {
  return (
    <div className="group relative flex gap-6 pb-12 last:pb-0">
      {/* Icon */}

      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0b0b10] text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.08)]">
        {icon}
      </div>

      {/* Content */}

      <div className="pt-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium tracking-[0.18em] text-zinc-700">
            {number}
          </span>

          <span className="rounded-full border border-white/5 px-2 py-0.5 text-[9px] tracking-wider text-zinc-600">
            {label}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-medium">{title}</h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   INTERVIEW STEP
============================================================= */

function InterviewStep({ number, icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400 transition group-hover:text-violet-400">
          {icon}
        </div>

        <span className="text-[10px] text-zinc-700">{number}</span>
      </div>

      <h3 className="mt-7 text-sm font-medium">{title}</h3>

      <p className="mt-2 text-xs text-zinc-600">{description}</p>

      <ChevronRight
        size={14}
        className="absolute bottom-5 right-5 text-zinc-800 transition group-hover:translate-x-1 group-hover:text-zinc-500"
      />
    </div>
  );
}
