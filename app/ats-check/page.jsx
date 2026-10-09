"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  FileUp,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
  BriefcaseBusiness,
  ScanSearch,
} from "lucide-react";

import { useAnalyseResume } from "../hooks/analyse";
import AnalysisLoading from "./components/AnalysisLoading";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ATSResumeCheck() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const { mutate, isPending, error } = useAnalyseResume();

  const isReady = Boolean(resume && jobDescription.trim());

  // Validate and select resume
  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Your resume must be smaller than 5 MB.");
      return;
    }

    setResume(file);
  };

  // Handle drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  // Remove selected resume
  const removeResume = () => {
    setResume(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Call existing API through TanStack Query
  const handleAnalyze = () => {
    if (!isReady || isPending) return;

    mutate(
      {
        resume,
        jobDescription,
      },
      {
        onSuccess: (result) => {
          sessionStorage.setItem("interprep_analysis", JSON.stringify(result));

          router.push("/analysis");
        },

        onError: (err) => {
          console.error("Resume analysis failed:", err);
        },
      },
    );
  };

  // Preserve your existing loading component
  if (isPending) {
    return <AnalysisLoading />;
  }

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#07070a] text-white lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 -top-40 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[160px]" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-500/8 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 shrink-0    px-5 pt-5 sm:px-8 sm:pt-6 lg:px-12 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between pb-4">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <Sparkles size={19} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Interprep
              </h1>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                AI Career intelligence
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 sm:px-4 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-violet-400 opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-[10px] font-semibold tracking-wide text-zinc-400 sm:text-xs">
              RESUME ANALYZER
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-7 sm:px-8 sm:py-8 lg:min-h-0 lg:px-12 lg:py-4">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur">
            <ScanSearch size={13} className="text-violet-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Your next opportunity starts here
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-tight">
            Make your resume{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              stand out.
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-zinc-500 sm:text-sm">
            Match your experience to the role and discover what to improve.
          </p>
        </div>

        {/* Form card */}
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d12]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5 lg:p-6">
          {/* Accent line */}
          <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1px_1fr] lg:gap-5">
            {/* Step 1: Upload resume */}
            <section className="flex min-w-0 flex-col rounded-[20px] border border-white/10 bg-white/[0.015] p-4 sm:p-5 lg:min-h-[330px] lg:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <FileText size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-400">
                      Step 01
                    </p>

                    <h3 className="text-sm font-semibold text-zinc-200 sm:text-base">
                      Upload your resume
                    </h3>
                  </div>
                </div>

                {resume && (
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-emerald-400"
                  />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />

              {!resume ? (
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  className={`group flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition duration-200 lg:py-5 ${
                    dragActive
                      ? "border-violet-400 bg-violet-500/[0.08]"
                      : "border-white/10 bg-white/[0.015] hover:border-violet-500/40 hover:bg-violet-500/[0.035]"
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-violet-400 transition group-hover:scale-105 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
                    <UploadCloud size={25} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-zinc-200">
                    {dragActive
                      ? "Drop your resume here"
                      : "Drag & drop your resume"}
                  </p>

                  <p className="mt-1.5 text-xs text-zinc-500">
                    or choose a PDF from your computer
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-zinc-300 transition group-hover:border-violet-500/30 group-hover:text-white">
                    <FileUp size={14} className="text-violet-400" />
                    Browse files
                  </span>

                  <p className="mt-3 text-[10px] text-zinc-600">
                    PDF format · Maximum 5 MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.035] px-4 py-7 text-center lg:py-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <FileText size={25} />
                  </div>

                  <p className="mt-3 max-w-full truncate text-sm font-semibold text-zinc-200">
                    {resume.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {(resume.size / 1024 / 1024).toFixed(2)} MB · Ready to
                    analyze
                  </p>

                  <button
                    type="button"
                    onClick={removeResume}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X size={13} />
                    Remove file
                  </button>
                </div>
              )}
            </section>

            {/* Desktop divider */}
            <div className="hidden bg-white/5 lg:block" />

            {/* Step 2: Job description */}
            <section className="flex min-w-0 flex-col rounded-[20px] border border-white/10 bg-white/[0.015] p-4 sm:p-5 lg:min-h-[330px] lg:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <BriefcaseBusiness size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-400">
                    Step 02
                  </p>

                  <h3 className="text-sm font-semibold text-zinc-200 sm:text-base">
                    Add the job description
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition focus-within:border-violet-500/30 focus-within:bg-black/30 focus-within:ring-4 focus-within:ring-violet-500/5">
                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  disabled={isPending}
                  placeholder={`Paste the job description here...\n\nFor example, required skills, responsibilities, qualifications and experience.`}
                  className="min-h-[200px] w-full flex-1 resize-y bg-transparent p-4 text-sm leading-6 text-zinc-300 outline-none placeholder:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 lg:min-h-0 lg:resize-none"
                />

                <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.015] px-4 py-2.5">
                  <span className="text-[10px] text-zinc-600">
                    {jobDescription.length} characters
                  </span>

                  {jobDescription.trim() && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 size={12} />
                      Description added
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-[10px] leading-4 text-zinc-600">
                Include the complete description for a more useful comparison.
              </p>
            </section>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-300"
            >
              <X size={16} className="mt-0.5 shrink-0 text-red-400" />

              <div>
                <p className="font-semibold text-red-200">Analysis failed</p>

                <p className="mt-1 text-xs leading-5 text-red-400/80">
                  {error.message || "Something went wrong. Please try again."}
                </p>
              </div>
            </div>
          )}

          {/* Analyze button */}
          <div className="mx-auto mt-4 max-w-[560px] sm:mt-5">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!isReady || isPending}
              className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-5 py-3.5 text-sm font-semibold transition duration-300 ${
                isReady && !isPending
                  ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20"
                  : "cursor-not-allowed border border-white/5 bg-white/[0.04] text-zinc-600"
              }`}
            >
              {isReady && !isPending && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100 group-hover:duration-700" />
              )}

              <span className="relative flex items-center gap-3">
                {isPending ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Analyzing your resume...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Analyze my resume
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </span>
            </button>

            <p className="mt-2 text-center text-[10px] leading-4 text-zinc-600">
              Your resume is compared with the job description to generate your
              personalized match report.
            </p>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-600 lg:mt-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
            <Check size={12} />
          </span>
          Evidence-based insights · Actionable recommendations
        </div>
      </section>
    </main>
  );
}
