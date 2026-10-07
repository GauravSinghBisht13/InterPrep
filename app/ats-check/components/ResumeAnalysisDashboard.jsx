"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import generateAnalysisReport from "../../utils/generateAnalysisReport";

import {
  AlertCircle,
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Code2,
  GraduationCap,
  Lightbulb,
  Loader2,
  Minus,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   Small reusable components
========================================================= */

function ProgressBar({ value = 0, className = "" }) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-800 ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-700"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
        }}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    matched: {
      label: "Matched",
      icon: Check,
      classes: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },

    partially_matched: {
      label: "Partial",
      icon: Minus,
      classes: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    },

    missing: {
      label: "Missing",
      icon: X,
      classes: "border-red-500/20 bg-red-500/10 text-red-400",
    },
  };

  const item = config[status] || config.missing;

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${item.classes}`}
    >
      <Icon size={12} />
      {item.label}
    </span>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <Icon size={18} className="text-violet-400" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>

        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

/* =========================================================
   Circular score
========================================================= */

function ScoreRing({ score }) {
  const radius = 82;

  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 100);

  const progress = (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {/* Glow */}
      <div className="absolute inset-8 rounded-full bg-violet-600/20 blur-3xl" />

      <svg
        width="230"
        height="230"
        viewBox="0 0 230 230"
        className="relative -rotate-90"
      >
        {/* Background */}
        <circle
          cx="115"
          cy="115"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          className="text-slate-800"
        />

        {/* Progress */}
        <circle
          cx="115"
          cy="115"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-1000"
        />

        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />

            <stop offset="50%" stopColor="#6366f1" />

            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold tracking-tight text-white">
          {safeScore}
        </span>

        <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Match Score
        </span>

        <div className="mt-3 flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
          <TrendingUp size={12} />
          Strong Match
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Main dashboard
========================================================= */

export default function ResumeAnalysisDashboard({ analysis }) {
  const router = useRouter();

  /*
    Reference used to capture the complete dashboard
    for the PDF report.
  */
  const reportRef = useRef(null);

  const [downloading, setDownloading] = useState(false);

  /*
    Expected shape:

    {
      ats: {
        atsScore: 84,
        breakdown: {
          keywordMatch: 75,
          skillsMatch: 72,
          experienceAlignment: 100,
          responsibilityAlignment: 88,
          educationAlignment: 100,
          resumeQuality: 90
        }
      },

      matched_skills: [],
      partially_matched_skills: [],
      missing_skills: [],
      strengths: [],
      weaknesses: [],
      recommendations: [],

      experience: {},
      education: {},
      responsibilities: {},
      resume_quality: {}
    }
  */

  const data = analysis?.data || analysis || {};

  const ats = data.ats || {};

  const breakdown = ats.breakdown || {};

  const score = ats.atsScore ?? 0;

  const matchedSkills = data.matched_skills || [];

  const partialSkills = data.partially_matched_skills || [];

  const missingSkills = data.missing_skills || [];

  const strengths = data.strengths || [];

  const weaknesses = data.weaknesses || [];

  const recommendations = data.recommendations || [];

  const responsibilities = data.responsibilities || {};

  const experience = data.experience || {};

  const education = data.education || {};

  const resumeQuality = data.resume_quality || {};

  const responsibilityTotal = responsibilities.total || 0;

  const responsibilityMatched = responsibilities.matched || 0;

  const responsibilityPartial = responsibilities.partially_matched || 0;

  const responsibilityMissing = responsibilities.missing || 0;

  const responsibilityPercentage =
    responsibilityTotal > 0
      ? Math.round(
          ((responsibilityMatched + responsibilityPartial * 0.5) /
            responsibilityTotal) *
            100,
        )
      : 0;

  const scoreItems = [
    {
      label: "Keyword match",
      value: breakdown.keywordMatch || 0,
    },

    {
      label: "Skills match",
      value: breakdown.skillsMatch || 0,
    },

    {
      label: "Experience",
      value: breakdown.experienceAlignment || 0,
    },

    {
      label: "Responsibilities",
      value: breakdown.responsibilityAlignment || 0,
    },

    {
      label: "Education",
      value: breakdown.educationAlignment || 0,
    },

    {
      label: "Resume quality",
      value: breakdown.resumeQuality || 0,
    },
  ];

  /* =========================================================
     Analyze Again
  ========================================================= */

  const handleAnalyzeAgain = () => {
    router.push("/ats-check");
  };

  /* =========================================================
     Download PDF Report
  ========================================================= */

  const handleDownloadReport = async () => {
    if (downloading) return;

    try {
      setDownloading(true);

      await generateAnalysisReport(data);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main ref={reportRef} className="min-h-screen bg-[#070711] text-white">
      {/* =====================================================
          Background
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ===================================================
            Header
        ==================================================== */}

        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          {/* Header title */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles size={13} />
              AI Resume Intelligence
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Resume Analysis
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              See how closely your resume aligns with the target job and exactly
              where you can improve.
            </p>
          </div>

          {/* =================================================
              Top Right Actions
          ================================================== */}

          <div className="flex flex-wrap items-center gap-2">
            {/* Analyze Again */}
            <button
              type="button"
              onClick={handleAnalyzeAgain}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
            >
              <ArrowUpRight size={15} />
              Analyze Again
            </button>

            {/* Download Report */}
            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <ArrowDownToLine size={15} />
                  Download Report
                </>
              )}
            </button>
          </div>
        </header>

        {/* ===================================================
            HERO SCORE
        ==================================================== */}

        <section className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[360px_1fr]">
            {/* Score */}
            <div className="relative flex flex-col items-center justify-center border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <ScoreRing score={score} />

              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-white">
                  Your resume is performing well
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                  Focus on missing skills and partially matched requirements to
                  improve your score.
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-white">Score breakdown</h2>

                  <p className="mt-1 text-xs text-slate-500">
                    How InterPrep calculated your match
                  </p>
                </div>

                <BarChart3 size={20} className="text-slate-600" />
              </div>

              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {scoreItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {item.label}
                      </span>

                      <span className="text-sm font-semibold text-white">
                        {item.value}%
                      </span>
                    </div>

                    <ProgressBar value={item.value} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            QUICK STATS
        ==================================================== */}

        <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            icon={CheckCircle2}
            label="Matched skills"
            value={matchedSkills.length}
            description="Strong alignment"
            type="success"
          />

          <StatCard
            icon={CircleAlert}
            label="Partial skills"
            value={partialSkills.length}
            description="Needs clarification"
            type="warning"
          />

          <StatCard
            icon={X}
            label="Missing skills"
            value={missingSkills.length}
            description="Potential gaps"
            type="danger"
          />

          <StatCard
            icon={Target}
            label="Responsibilities"
            value={`${responsibilityPercentage}%`}
            description="Role alignment"
            type="primary"
          />
        </section>

        {/* ===================================================
            SKILLS
        ==================================================== */}

        <section className="mb-6 grid gap-6 lg:grid-cols-3">
          {/* Matched */}
          <SkillCard
            title="Matched skills"
            subtitle="Already demonstrated in your resume"
            icon={CheckCircle2}
            iconClass="text-emerald-400"
            borderClass="border-emerald-500/10"
            skills={matchedSkills}
            status="matched"
          />

          {/* Partial */}
          <SkillCard
            title="Partially matched"
            subtitle="You may have related experience"
            icon={CircleAlert}
            iconClass="text-amber-400"
            borderClass="border-amber-500/10"
            skills={partialSkills}
            status="partially_matched"
          />

          {/* Missing */}
          <SkillCard
            title="Missing skills"
            subtitle="Not found in your resume"
            icon={X}
            iconClass="text-red-400"
            borderClass="border-red-500/10"
            skills={missingSkills}
            status="missing"
          />
        </section>

        {/* ===================================================
            EXPERIENCE + EDUCATION
        ==================================================== */}

        <section className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Experience */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <SectionHeader
              icon={BriefcaseBusiness}
              title="Experience alignment"
              subtitle="How your experience compares with the role"
            />

            <div className="grid grid-cols-2 gap-3">
              <InfoBox
                label="Required"
                value={`${experience.required_years ?? 0} yrs`}
              />

              <InfoBox
                label="Your experience"
                value={`${experience.candidate_years ?? 0} yrs`}
              />
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="mb-2 flex items-center gap-2">
                {experience.status === "matched" ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                  <AlertCircle size={16} className="text-amber-400" />
                )}

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Alignment
                </span>
              </div>

              <p className="text-sm leading-6 text-slate-300">
                {data.experience_alignment ||
                  "No experience alignment information available."}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <SectionHeader
              icon={GraduationCap}
              title="Education alignment"
              subtitle="Education requirement analysis"
            />

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                  education.matched ? "bg-emerald-500/10" : "bg-red-500/10"
                }`}
              >
                {education.matched ? (
                  <CheckCircle2 size={25} className="text-emerald-400" />
                ) : (
                  <X size={25} className="text-red-400" />
                )}
              </div>

              <div>
                <p className="font-medium text-white">
                  {education.matched
                    ? "Education requirement satisfied"
                    : "Education requirement not satisfied"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {education.evidence || "No education evidence available."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESPONSIBILITIES
        ==================================================== */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <SectionHeader
            icon={Code2}
            title="Responsibility alignment"
            subtitle="How closely your experience matches the actual work"
          />

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniMetric label="Total" value={responsibilityTotal} />

            <MiniMetric
              label="Matched"
              value={responsibilityMatched}
              valueClass="text-emerald-400"
            />

            <MiniMetric
              label="Partial"
              value={responsibilityPartial}
              valueClass="text-amber-400"
            />

            <MiniMetric
              label="Missing"
              value={responsibilityMissing}
              valueClass="text-red-400"
            />
          </div>

          <div className="space-y-3">
            {(responsibilities.details || []).map((item, index) => (
              <div
                key={`${item.responsibility}-${index}`}
                className="group rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20 hover:bg-white/[0.035]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.responsibility}
                      </p>

                      {item.evidence && (
                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          {item.evidence}
                        </p>
                      )}
                    </div>
                  </div>

                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            STRENGTHS / WEAKNESSES
        ==================================================== */}

        <section className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.025] p-6">
            <SectionHeader
              icon={Award}
              title="Your strengths"
              subtitle="What makes your profile stand out"
            />

            <div className="space-y-3">
              {strengths.length === 0 ? (
                <EmptyState text="No strengths identified." />
              ) : (
                strengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Check size={14} className="text-emerald-400" />
                    </div>

                    <p className="text-sm leading-5 text-slate-300">{item}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.025] p-6">
            <SectionHeader
              icon={CircleAlert}
              title="Potential weaknesses"
              subtitle="Areas that may reduce your match score"
            />

            <div className="space-y-3">
              {weaknesses.length === 0 ? (
                <EmptyState text="No major weaknesses identified." />
              ) : (
                weaknesses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.03] p-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                      <X size={14} className="text-red-400" />
                    </div>

                    <p className="text-sm leading-5 text-slate-300">{item}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            RESUME QUALITY
        ==================================================== */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <SectionHeader
            icon={Sparkles}
            title="Resume quality"
            subtitle="Structure, readability and presentation"
          />

          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-6">
              <div className="text-5xl font-bold text-white">
                {resumeQuality.score || 0}
              </div>

              <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Quality score
              </div>

              <div className="mt-4 w-full">
                <ProgressBar value={resumeQuality.score || 0} />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  What works
                </p>

                <div className="space-y-2">
                  {(resumeQuality.strengths || []).map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 text-xs leading-5 text-slate-400"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Improve this
                </p>

                <div className="space-y-2">
                  {(resumeQuality.improvements || []).map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 text-xs leading-5 text-slate-400"
                    >
                      <ArrowUpRight
                        size={14}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            AI RECOMMENDATIONS
        ==================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.09] via-indigo-500/[0.04] to-cyan-500/[0.04] p-6 sm:p-8">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="relative">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15">
                  <Lightbulb size={21} className="text-violet-300" />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    AI improvement plan
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Practical changes that can improve your match
                  </p>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                <Zap size={13} />
                Personalized
              </div>
            </div>

            <div className="grid gap-3">
              {recommendations.length === 0 ? (
                <EmptyState text="No additional recommendations were generated." />
              ) : (
                recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-500/20 hover:bg-white/[0.035]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xs font-bold text-violet-300">
                      {index + 1}
                    </div>

                    <p className="flex-1 text-sm leading-6 text-slate-300">
                      {item}
                    </p>

                    <ChevronRight
                      size={17}
                      className="mt-1 text-slate-700 transition group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-600">
          <Sparkles size={12} />
          InterPrep AI Resume Intelligence
          <span>•</span>
          Estimated match score, not a guaranteed ATS result
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   Stat Card
========================================================= */

function StatCard({ icon: Icon, label, value, description, type }) {
  const styles = {
    success: "text-emerald-400 bg-emerald-500/10",

    warning: "text-amber-400 bg-amber-500/10",

    danger: "text-red-400 bg-red-500/10",

    primary: "text-violet-400 bg-violet-500/10",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.04]">
      <div
        className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${styles[type]}`}
      >
        <Icon size={17} />
      </div>

      <p className="text-2xl font-bold text-white">{value}</p>

      <p className="mt-1 text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-1 text-[11px] text-slate-600">{description}</p>
    </div>
  );
}

/* =========================================================
   Skill Card
========================================================= */

function SkillCard({
  title,
  subtitle,
  icon: Icon,
  iconClass,
  borderClass,
  skills,
  status,
}) {
  return (
    <div className={`rounded-2xl border ${borderClass} bg-white/[0.025] p-5`}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Icon size={17} className={iconClass} />

            <h2 className="text-sm font-semibold text-white">{title}</h2>
          </div>

          <p className="mt-1 text-[11px] text-slate-600">{subtitle}</p>
        </div>

        <span className="rounded-full bg-white/5 px-2 py-1 text-xs font-semibold text-slate-400">
          {skills.length}
        </span>
      </div>

      <div className="space-y-2.5">
        {skills.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs text-slate-600">
            No items found
          </div>
        ) : (
          skills.map((skill, index) => {
            const skillName =
              typeof skill === "string"
                ? skill
                : skill?.skill || "Unknown skill";

            const evidence = typeof skill === "object" ? skill?.evidence : null;

            return (
              <div
                key={`${skillName}-${index}`}
                className="rounded-xl border border-white/10 bg-black/20 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {skillName}
                    </p>

                    {evidence && (
                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        {evidence}
                      </p>
                    )}
                  </div>

                  <StatusBadge status={status} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* =========================================================
   Info Box
========================================================= */

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-[11px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

/* =========================================================
   Mini Metric
========================================================= */

function MiniMetric({ label, value, valueClass = "text-white" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-[11px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

/* =========================================================
   Empty State
========================================================= */

function EmptyState({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs text-slate-600">
      {text}
    </div>
  );
}
