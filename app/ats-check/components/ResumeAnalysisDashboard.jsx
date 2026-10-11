"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleAlert,
  X,
  Target,
  TrendingUp,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  Loader2,
  ShieldCheck,
  FileText,
  Zap,
  ChevronRight,
  BarChart3,
  RotateCcw,
} from "lucide-react";

import generateAnalysisReport from "../../utils/generateAnalysisReport";

/* =========================================================
   Small reusable components
========================================================= */

function Panel({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.08] bg-[#101019] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/10">
          <Icon size={17} className="text-violet-300" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      {action}
    </div>
  );
}

function ProgressBar({ value = 0 }) {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

function ScoreRing({ score }) {
  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 100);

  return (
    <div
      className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#8b5cf6 ${safeScore * 3.6}deg, #252535 0deg)`,
      }}
    >
      <div className="absolute inset-[7px] rounded-full bg-[#101019]" />

      <div className="relative text-center">
        <div className="text-4xl font-bold tracking-tight text-white">
          {safeScore}
          <span className="text-base text-slate-500">/100</span>
        </div>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
          Match score
        </p>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, tone = "violet" }) {
  const tones = {
    green: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
    red: "bg-red-500/10 text-red-400",
    violet: "bg-violet-500/10 text-violet-300",
  };

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xl font-semibold leading-tight text-white">
          {value}
        </p>
        <p className="mt-1 truncate text-[11px] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    matched: {
      label: "Matched",
      icon: Check,
      className: "bg-emerald-500/10 text-emerald-400",
    },
    partially_matched: {
      label: "Partial",
      icon: CircleAlert,
      className: "bg-amber-500/10 text-amber-400",
    },
    missing: {
      label: "Missing",
      icon: X,
      className: "bg-red-500/10 text-red-400",
    },
  };

  const item = config[status] || config.missing;
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${item.className}`}
    >
      <Icon size={11} />
      {item.label}
    </span>
  );
}

function SkillGroup({ title, skills, tone = "green" }) {
  const colors = {
    green: "border-emerald-500/15 bg-emerald-500/[0.035]",
    amber: "border-amber-500/15 bg-amber-500/[0.035]",
    red: "border-red-500/15 bg-red-500/[0.035]",
  };

  const textColors = {
    green: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400",
  };

  const getSkillName = (skill) =>
    typeof skill === "string"
      ? skill
      : skill?.skill || skill?.name || "Unknown skill";

  return (
    <div className={`rounded-xl border p-4 ${colors[tone]}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className={`text-xs font-semibold ${textColors[tone]}`}>{title}</h3>
        <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] text-slate-400">
          {skills.length}
        </span>
      </div>

      {skills.length === 0 ? (
        <p className="text-xs text-slate-600">None identified</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            const name = getSkillName(skill);
            const evidence = typeof skill === "object" ? skill?.evidence : "";

            return (
              <span
                key={`${name}-${index}`}
                title={evidence || name}
                className="max-w-full truncate rounded-lg border border-white/[0.07] bg-[#0a0a12] px-2.5 py-1.5 text-xs text-slate-300"
              >
                {name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InsightList({ items, emptyText, tone = "green", limit }) {
  const visibleItems =
    typeof limit === "number" ? items.slice(0, limit) : items;

  const tones = {
    green: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    red: "text-red-400 bg-red-500/10",
    violet: "text-violet-300 bg-violet-500/10",
  };

  const Icon =
    tone === "green"
      ? CheckCircle2
      : tone === "red"
        ? CircleAlert
        : tone === "amber"
          ? ArrowUpRight
          : Sparkles;

  if (!items.length) {
    return <p className="text-xs text-slate-500">{emptyText}</p>;
  }

  return (
    <div className="space-y-2.5">
      {visibleItems.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-start gap-2.5">
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${tones[tone]}`}
          >
            <Icon size={12} />
          </div>
          <p className="text-xs leading-5 text-slate-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition ${
        active
          ? "bg-violet-500/15 text-violet-300"
          : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   Main dashboard
========================================================= */

export default function ResumeAnalysisDashboard({ analysis }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [downloading, setDownloading] = useState(false);

  const data = analysis?.data || analysis || {};
  const ats = data.ats || {};
  const breakdown = ats.breakdown || {};

  const score = Number(ats.atsScore ?? 0);

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
    { label: "Keywords", value: breakdown.keywordMatch ?? 0 },
    { label: "Skills", value: breakdown.skillsMatch ?? 0 },
    { label: "Experience", value: breakdown.experienceAlignment ?? 0 },
    {
      label: "Responsibilities",
      value: breakdown.responsibilityAlignment ?? 0,
    },
    { label: "Education", value: breakdown.educationAlignment ?? 0 },
    { label: "Resume quality", value: breakdown.resumeQuality ?? 0 },
  ];

  const handleAnalyzeAgain = () => {
    router.push("/ats-check");
  };

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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills & role fit" },
    { id: "quality", label: "Resume quality" },
  ];

  return (
    <main className="min-h-screen bg-[#080810] text-white">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-violet-300">
              <Sparkles size={14} />
              INTERPREP AI
              <span className="text-slate-700">/</span>
              RESUME INTELLIGENCE
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your resume insights
            </h1>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              A focused view of your job match and the improvements that matter.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAnalyzeAgain}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            >
              <RotateCcw size={14} />
              Analyze Again
            </button>

            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ArrowDownToLine size={14} />
              )}
              {downloading ? "Preparing..." : "Download Report"}
            </button>
          </div>
        </header>

        {/* Main score hero */}
        <Panel className="mb-4 overflow-hidden">
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex items-center gap-5">
              <ScoreRing score={score} />

              <div className="max-w-[210px]">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-2.5 py-1 text-[10px] font-medium text-violet-300">
                  <Target size={12} />
                  Resume match
                </div>

                <h2 className="text-base font-semibold text-white">
                  {score >= 80
                    ? "Strong alignment"
                    : score >= 60
                      ? "Good foundation"
                      : score >= 40
                        ? "Room to improve"
                        : "Needs refinement"}
                </h2>

                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                  {score >= 80
                    ? "Focus on the remaining gaps to make your application stronger."
                    : "Use the insights below to target your most important gaps."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat
                icon={CheckCircle2}
                label="Matched skills"
                value={matchedSkills.length}
                tone="green"
              />
              <MiniStat
                icon={CircleAlert}
                label="Partial skills"
                value={partialSkills.length}
                tone="amber"
              />
              <MiniStat
                icon={X}
                label="Missing skills"
                value={missingSkills.length}
                tone="red"
              />
              <MiniStat
                icon={Target}
                label="Role alignment"
                value={`${responsibilityPercentage}%`}
                tone="violet"
              />
            </div>
          </div>

          {/* Compact score breakdown */}
          <div className="border-t border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 size={15} className="text-slate-500" />
              <p className="text-xs font-semibold text-slate-300">
                Match breakdown
              </p>
              <span className="text-[10px] text-slate-600">
                · Score by category
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
              {scoreItems.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="truncate text-[10px] text-slate-500">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300">
                      {item.value}%
                    </span>
                  </div>
                  <ProgressBar value={item.value} />
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-white/[0.07] bg-[#101019] p-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        {/* =====================================================
            OVERVIEW TAB
        ====================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel className="p-5">
                <SectionTitle
                  icon={ShieldCheck}
                  title="What's working"
                  subtitle="Your strongest signals for this role"
                />

                <InsightList
                  items={strengths}
                  emptyText="No strengths identified."
                  tone="green"
                  limit={4}
                />
              </Panel>

              <Panel className="p-5">
                <SectionTitle
                  icon={Target}
                  title="Priority improvements"
                  subtitle="The areas worth addressing first"
                />

                {weaknesses.length > 0 ? (
                  <InsightList
                    items={weaknesses}
                    emptyText="No major weaknesses identified."
                    tone="red"
                    limit={3}
                  />
                ) : (
                  <InsightList
                    items={recommendations}
                    emptyText="No additional improvements suggested."
                    tone="amber"
                    limit={3}
                  />
                )}
              </Panel>
            </div>

            <Panel className="p-5">
              <SectionTitle
                icon={Zap}
                title="Your next moves"
                subtitle="Actionable suggestions from your analysis"
                action={
                  <span className="rounded-full border border-violet-400/10 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-300">
                    AI insights
                  </span>
                }
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No additional recommendations were generated.
                  </p>
                ) : (
                  recommendations.slice(0, 3).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                    >
                      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-semibold text-violet-300">
                        0{index + 1}
                      </div>
                      <p className="text-xs leading-5 text-slate-300">{item}</p>
                    </div>
                  ))
                )}
              </div>

              {recommendations.length > 3 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("quality")}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-violet-300 transition hover:text-violet-200"
                >
                  Explore more insights
                  <ChevronRight size={14} />
                </button>
              )}
            </Panel>

            <div className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <CircleAlert
                size={14}
                className="mt-0.5 shrink-0 text-slate-500"
              />
              <p className="text-[11px] leading-5 text-slate-500">
                The match score is an estimate based on the provided resume and
                job requirements. It does not guarantee an employer's ATS result
                or an interview.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            SKILLS & ROLE FIT TAB
        ====================================================== */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <Panel className="p-5">
              <SectionTitle
                icon={Sparkles}
                title="Skill match map"
                subtitle="See what aligns and where your resume has gaps"
              />

              <div className="grid gap-3 lg:grid-cols-3">
                <SkillGroup
                  title="Matched"
                  skills={matchedSkills}
                  tone="green"
                />
                <SkillGroup
                  title="Partially matched"
                  skills={partialSkills}
                  tone="amber"
                />
                <SkillGroup title="Missing" skills={missingSkills} tone="red" />
              </div>
            </Panel>

            <Panel className="p-5">
              <SectionTitle
                icon={BriefcaseBusiness}
                title="Experience alignment"
                subtitle="Compare your experience with the role's requirements"
              />

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Required experience
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {experience.required_years ?? 0}
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      years
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Your experience
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {experience.candidate_years ?? 0}
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      years
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Responsibility fit
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-violet-300">
                    {responsibilityPercentage}%
                  </p>
                  <div className="mt-2">
                    <ProgressBar value={responsibilityPercentage} />
                  </div>
                </div>
              </div>

              {data.experience_alignment && (
                <p className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-4 text-xs leading-5 text-slate-400">
                  {data.experience_alignment}
                </p>
              )}
            </Panel>

            <Panel className="p-5">
              <SectionTitle
                icon={Target}
                title="Job responsibilities"
                subtitle={`${responsibilityTotal} requirements assessed`}
              />

              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-emerald-500/[0.06] p-3">
                  <p className="text-lg font-semibold text-emerald-400">
                    {responsibilityMatched}
                  </p>
                  <p className="text-[10px] text-slate-500">Matched</p>
                </div>
                <div className="rounded-lg bg-amber-500/[0.06] p-3">
                  <p className="text-lg font-semibold text-amber-400">
                    {responsibilityPartial}
                  </p>
                  <p className="text-[10px] text-slate-500">Partial</p>
                </div>
                <div className="rounded-lg bg-red-500/[0.06] p-3">
                  <p className="text-lg font-semibold text-red-400">
                    {responsibilityMissing}
                  </p>
                  <p className="text-[10px] text-slate-500">Missing</p>
                </div>
              </div>

              <div className="space-y-2">
                {(responsibilities.details || []).map((item, index) => (
                  <div
                    key={`${item.responsibility}-${index}`}
                    className="flex items-start justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium leading-5 text-slate-200">
                        {item.responsibility}
                      </p>
                      {item.evidence && (
                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {item.evidence}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
                {(responsibilities.details || []).length === 0 && (
                  <p className="text-xs text-slate-500">
                    No responsibility details available.
                  </p>
                )}
              </div>
            </Panel>
          </div>
        )}

        {/* =====================================================
            RESUME QUALITY TAB
        ====================================================== */}
        {activeTab === "quality" && (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel className="p-5">
                <SectionTitle
                  icon={BriefcaseBusiness}
                  title="Experience"
                  subtitle="How your background aligns with the role"
                />

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] p-3">
                    <p className="text-[10px] text-slate-500">Required</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {experience.required_years ?? 0} yrs
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] p-3">
                    <p className="text-[10px] text-slate-500">
                      Your experience
                    </p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {experience.candidate_years ?? 0} yrs
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  {data.experience_alignment ||
                    "No experience alignment details available."}
                </p>
              </Panel>

              <Panel className="p-5">
                <SectionTitle
                  icon={GraduationCap}
                  title="Education"
                  subtitle="Education requirement check"
                />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      education.matched
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {education.matched ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <CircleAlert size={18} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {education.matched
                        ? "Requirement satisfied"
                        : "Needs further review"}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-slate-400">
                      {education.evidence || "No education evidence available."}
                    </p>
                  </div>
                </div>
              </Panel>
            </div>

            <Panel className="p-5">
              <div className="grid gap-5 sm:grid-cols-[150px_1fr] sm:items-center">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
                  <FileText size={20} className="mx-auto text-violet-300" />
                  <p className="mt-3 text-3xl font-bold text-white">
                    {resumeQuality.score ?? 0}
                    <span className="text-sm text-slate-500">/100</span>
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Resume quality
                  </p>
                  <div className="mt-3">
                    <ProgressBar value={resumeQuality.score ?? 0} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 text-xs font-semibold text-emerald-400">
                      What's working
                    </p>
                    <InsightList
                      items={resumeQuality.strengths || []}
                      emptyText="No quality strengths available."
                      tone="green"
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-semibold text-amber-400">
                      Worth improving
                    </p>
                    <InsightList
                      items={resumeQuality.improvements || []}
                      emptyText="No quality improvements suggested."
                      tone="amber"
                    />
                  </div>
                </div>
              </div>
            </Panel>

            <Panel className="p-5">
              <SectionTitle
                icon={Lightbulb}
                title="Full improvement plan"
                subtitle="Recommendations generated from your analysis"
              />

              <InsightList
                items={recommendations}
                emptyText="No additional recommendations were generated."
                tone="violet"
              />

              {weaknesses.length > 0 && (
                <div className="mt-5 border-t border-white/[0.07] pt-5">
                  <p className="mb-3 text-xs font-semibold text-red-400">
                    Additional gaps
                  </p>
                  <InsightList
                    items={weaknesses}
                    emptyText="No additional gaps identified."
                    tone="red"
                  />
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-6 flex flex-wrap items-center justify-center gap-2 pb-3 text-[10px] text-slate-600">
          <Sparkles size={12} />
          InterPrep AI
          <span>·</span>
          Resume insights, not a guaranteed ATS result
        </footer>
      </div>
    </main>
  );
}
