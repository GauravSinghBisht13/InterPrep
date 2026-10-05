"use client";

import {
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  Target,
  Brain,
  Search,
  ShieldCheck,
  Zap,
  ChevronRight,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function Home() {
  function login() {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-[#07070a] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute right-[-200px] top-[500px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-[-200px] top-[800px] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
            <Sparkles size={18} />
          </div>

          <span className="text-xl font-semibold tracking-tight">
            Interprep
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>

          <a href="#interview" className="transition hover:text-white">
            Interview Prep
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="hidden px-4 py-2 text-sm text-zinc-300 transition hover:text-white sm:block"
            onClick={login}
          >
            Login
          </button>

          <button
            onClick={login}
            className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Get Started
            <ArrowRight
              size={15}
              className="transition group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center lg:px-8 lg:pt-28">
        {/* Badge */}
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 backdrop-blur">
          <Sparkles size={14} className="text-violet-400" />
          AI-powered career preparation
          <span className="ml-1 rounded-full bg-violet-500/10 px-2 py-0.5 text-xs text-violet-300">
            New
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Your resume gets you noticed.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            Interprep gets you ready.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          Analyze your resume, optimize it for ATS, discover the keywords
          recruiters are looking for, identify skill gaps, and prepare for
          interviews with an AI that understands your target role.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 font-medium shadow-xl shadow-violet-500/20 transition hover:scale-[1.02] hover:shadow-violet-500/30 sm:w-auto">
            Analyze My Resume
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-zinc-300 transition hover:bg-white/[0.07] sm:w-auto">
            Explore Features
          </button>
        </div>

        {/* Trust */}
        <div className="mt-7 flex items-center justify-center gap-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Check size={13} className="text-emerald-400" />
            AI powered
          </span>

          <span className="flex items-center gap-1.5">
            <Check size={13} className="text-emerald-400" />
            Role specific
          </span>

          <span className="flex items-center gap-1.5">
            <Check size={13} className="text-emerald-400" />
            Actionable insights
          </span>
        </div>

        {/* Product Preview */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12] text-left shadow-2xl shadow-black/50">
            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
              <div className="h-3 w-3 rounded-full bg-red-400/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <div className="h-3 w-3 rounded-full bg-green-400/70" />

              <div className="ml-5 flex-1 rounded-lg bg-white/[0.04] px-4 py-1.5 text-xs text-zinc-600">
                app.interprep.ai/dashboard
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="grid gap-5 p-6 md:grid-cols-[1.1fr_0.9fr]">
              {/* ATS Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Resume Analysis</p>
                    <h3 className="mt-1 text-lg font-medium">
                      Frontend Developer
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-violet-500/40 text-lg font-semibold">
                    87
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ["Keywords", "92%"],
                    ["Experience", "89%"],
                    ["Skills", "94%"],
                    ["Formatting", "83%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                    >
                      <p className="text-xs text-zinc-500">{label}</p>
                      <p className="mt-1 text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  <p className="text-sm font-medium">AI Insights</p>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    "Add TypeScript to your project descriptions",
                    "Mention REST API optimization experience",
                    "Strengthen measurable impact in 2 bullets",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs text-violet-300">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-6 text-zinc-400">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/5 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-violet-400">
              ONE PLATFORM. COMPLETE PREPARATION.
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From resume screening
              <br />
              to interview confidence.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Interprep helps you understand where you stand, what recruiters
              expect, and what you should improve before applying or
              interviewing.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileText size={20} />}
              number="01"
              title="ATS Score"
              description="See how well your resume performs against ATS systems and discover the areas holding it back."
            />

            <FeatureCard
              icon={<Search size={20} />}
              number="02"
              title="Keyword Finder"
              description="Compare your resume with a job description and identify missing skills and keywords."
            />

            <FeatureCard
              icon={<Target size={20} />}
              number="03"
              title="Skill Gap"
              description="Understand which skills your target role expects and where your profile needs improvement."
            />

            <FeatureCard
              icon={<Brain size={20} />}
              number="04"
              title="AI Interview"
              description="Practice adaptive interviews based on your resume, target role, skills and previous answers."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-white/5 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-400">
              HOW INTERPREP WORKS
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Prepare smarter. Not harder.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Step
              number="01"
              title="Upload your resume"
              description="Give Interprep your resume and optionally add the job description you're targeting."
            />

            <Step
              number="02"
              title="Understand your profile"
              description="AI analyzes your experience, skills, keywords, ATS compatibility and gaps against the role."
            />

            <Step
              number="03"
              title="Prepare & improve"
              description="Use personalized recommendations and AI-powered interview preparation to become job-ready."
            />
          </div>
        </div>
      </section>

      {/* Interview Section */}
      <section
        id="interview"
        className="relative border-t border-white/5 py-28"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/[0.04] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
              <Brain size={13} />
              AI Interview Preparation
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Don't just prepare
              <br />
              <span className="text-zinc-500">for questions.</span>
              <br />
              Prepare for your role.
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-zinc-400">
              Interprep builds interviews around your actual experience, target
              position and skill profile. Questions can adapt based on how you
              answer — making every practice session more relevant.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Resume-aware questions",
                "Role-specific technical questions",
                "Adaptive follow-up questions",
                "Personalized performance feedback",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                    <Check size={14} className="text-emerald-400" />
                  </div>

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Interview UI */}
          <div className="rounded-3xl border border-white/10 bg-[#0d0d12] p-5 shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">AI Interviewer</p>

                  <p className="mt-1 text-sm font-medium">Frontend Engineer</p>
                </div>

                <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              <div className="mt-10 rounded-2xl bg-white/[0.03] p-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                    <Sparkles size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">Interprep AI</p>

                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      You mentioned optimizing React performance in your resume.
                      Can you explain one performance issue you encountered and
                      how you solved it?
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs text-zinc-600">Your response</p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
                    <Zap size={15} className="text-zinc-400" />
                  </div>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[65%] rounded-full bg-violet-500" />
                  </div>

                  <span className="text-xs text-zinc-500">Listening...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-xl shadow-violet-500/20">
            <Sparkles size={25} />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl">
            Know where you stand.
            <br />
            <span className="text-zinc-500">Know what to improve.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-zinc-400">
            Upload your resume and let Interprep turn your career preparation
            into a clear, personalized plan.
          </p>

          <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-medium text-black transition hover:bg-zinc-200">
            Get Started for Free
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <Sparkles size={13} />
            </div>

            <span className="font-medium text-zinc-300">Interprep</span>
          </div>

          <p>AI-powered career preparation.</p>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------- */
/* Feature Card */
/* -------------------------------- */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          {icon}
        </div>

        <span className="text-xs text-zinc-600">{number}</span>
      </div>

      <h3 className="mt-6 text-lg font-medium">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-zinc-500">{description}</p>

      <div className="mt-6 flex items-center gap-1 text-xs text-zinc-400 transition group-hover:text-violet-300">
        Learn more
        <ChevronRight
          size={13}
          className="transition group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
}

/* -------------------------------- */
/* How It Works Step */
/* -------------------------------- */

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-medium text-violet-300">
        {number}
      </div>

      <h3 className="text-xl font-medium">{title}</h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}
