"use client";

import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileSearch,
  FileText,
  FileUp,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
  Target,
  Search,
  Zap,
} from "lucide-react";

const ATSResumeCheck = () => {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    setResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleAnalyze = () => {
    if (!resume || !jobDescription.trim()) return;

    setIsAnalyzing(true);

    // Replace this with your API call
    setTimeout(() => {
      setIsAnalyzing(false);

      console.log("Analyze:", {
        resume,
        jobDescription,
      });
    }, 2000);
  };

  const removeResume = () => {
    setResume(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isReady = resume && jobDescription.trim();

  return (
    <main className="min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Main violet glow */}
        <div className="absolute left-1/2 top-[-320px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[160px]" />

        {/* Blue right glow */}
        <div className="absolute right-[-250px] top-[500px] h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[150px]" />

        {/* Violet left glow */}
        <div className="absolute left-[-300px] top-[950px] h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[150px]" />

        {/* Subtle grid */}
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
          HEADER
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex w-[92%] max-w-[1400px] items-center justify-between py-4">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <Sparkles size={18} />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Interprep
              </h1>

              <p className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600 sm:block">
                AI Career Intelligence
              </p>
            </div>
          </div>

          {/* ATS Status */}

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              ATS Analysis
            </span>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="mx-auto w-[92%] max-w-[1100px] pb-24">
        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="relative pb-14 pt-20 text-center sm:pt-24">
          {/* Glow */}

          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

          {/* Badge */}

          <div className="relative mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur">
            <Sparkles size={13} className="text-violet-400" />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Resume Intelligence
            </span>
          </div>

          {/* Heading */}

          <h1 className="relative text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Check your resume's
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              ATS compatibility.
            </span>
          </h1>

          {/* Description */}

          <p className="relative mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            Upload your resume and add the job description. Interprep compares
            both to identify your ATS score, missing keywords, strengths, and
            opportunities to improve.
          </p>

          {/* Small stats */}

          <div className="relative mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            <MiniBadge icon={<Target size={12} />} text="ATS Score" />

            <MiniBadge icon={<Search size={12} />} text="Keyword Matching" />

            <MiniBadge icon={<Zap size={12} />} text="AI Suggestions" />
          </div>
        </section>

        {/* =======================================================
            MAIN ATS PANEL
        ======================================================= */}

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d12] shadow-2xl shadow-black/30">
          {/* Top gradient line */}

          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

          {/* Ambient glow */}

          <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[120px]" />

          <div className="relative p-5 sm:p-8 lg:p-10">
            {/* ===================================================
                STEPS
            =================================================== */}

            <div className="mb-10 flex justify-center">
              <div className="flex items-center">
                {/* STEP 1 */}

                <StepIndicator
                  active={!!resume}
                  number="01"
                  label="Upload Resume"
                />

                {/* Connector */}

                <div
                  className={`mx-4 h-px w-10 transition sm:mx-7 sm:w-20 ${
                    resume ? "bg-violet-500/60" : "bg-white/10"
                  }`}
                />

                {/* STEP 2 */}

                <StepIndicator
                  active={!!jobDescription.trim()}
                  number="02"
                  label="Job Description"
                />
              </div>
            </div>

            {/* ===================================================
                STEP 1
            =================================================== */}

            <div>
              {/* Heading */}

              <div className="mb-5 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-[10px] font-semibold text-violet-300">
                      01
                    </div>

                    <h2 className="text-xl font-medium">Upload your resume</h2>
                  </div>

                  <p className="mt-2 text-xs text-zinc-600 sm:text-sm">
                    Upload the latest version of your resume.
                  </p>
                </div>

                <span className="hidden rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-zinc-600 sm:block">
                  PDF · DOC · DOCX
                </span>
              </div>

              {/* Upload */}

              {!resume ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group cursor-pointer rounded-[26px] border border-dashed p-8 text-center transition duration-300 sm:p-12 ${
                    dragActive
                      ? "border-violet-400 bg-violet-500/[0.08]"
                      : "border-white/10 bg-white/[0.015] hover:border-violet-500/40 hover:bg-violet-500/[0.035]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />

                  {/* Upload icon */}

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-violet-400 shadow-xl shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
                    <UploadCloud size={27} />
                  </div>

                  <h3 className="mt-5 text-lg font-medium">
                    {dragActive
                      ? "Drop your resume here"
                      : "Drag & drop your resume"}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-600">
                    or click anywhere to choose a file from your system
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 transition group-hover:border-violet-500/30 group-hover:text-white">
                    <FileUp size={14} className="text-violet-400" />
                    Browse Files
                  </div>

                  <p className="mt-5 text-[10px] font-medium text-zinc-700">
                    Maximum recommended file size: 5MB
                  </p>
                </div>
              ) : (
                /* Uploaded Resume */

                <div className="rounded-[26px] border border-emerald-500/20 bg-emerald-500/[0.035] p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <FileText size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-zinc-200">
                          {resume.name}
                        </p>

                        <CheckCircle2
                          size={15}
                          className="shrink-0 text-emerald-400"
                        />
                      </div>

                      <p className="mt-1 text-xs text-zinc-600">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB · Ready for
                        analysis
                      </p>
                    </div>

                    <button
                      onClick={removeResume}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-500 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ===================================================
                DIVIDER
            =================================================== */}

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />

              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-700">
                Next step
              </span>

              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* ===================================================
                STEP 2
            =================================================== */}

            <div>
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-[10px] font-semibold text-blue-300">
                    02
                  </div>

                  <h2 className="text-xl font-medium">
                    Paste the job description
                  </h2>
                </div>

                <p className="mt-2 text-xs text-zinc-600 sm:text-sm">
                  Add the job description you're applying for.
                </p>
              </div>

              {/* Textarea */}

              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/20 transition focus-within:border-violet-500/30 focus-within:bg-black/30 focus-within:ring-4 focus-within:ring-violet-500/5">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder={`Paste the complete job description here...

Example:
We are looking for a Frontend Developer with experience in React.js, JavaScript, TypeScript, Redux and REST APIs...`}
                  className="min-h-[220px] w-full resize-none bg-transparent p-6 text-sm leading-7 text-zinc-300 outline-none placeholder:text-zinc-700"
                />

                <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.015] px-5 py-3">
                  <span className="text-[10px] font-medium text-zinc-700">
                    {jobDescription.length} characters
                  </span>

                  {jobDescription.trim() && (
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 size={13} />
                      Job description added
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ===================================================
                ANALYZE BUTTON
            =================================================== */}

            <div className="mt-10">
              <button
                disabled={!isReady || isAnalyzing}
                onClick={handleAnalyze}
                className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 py-4 text-sm font-medium transition duration-300 ${
                  isReady && !isAnalyzing
                    ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20"
                    : "cursor-not-allowed border border-white/5 bg-white/[0.04] text-zinc-600"
                }`}
              >
                {/* Button shine */}

                {isReady && !isAnalyzing && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
                )}

                <span className="relative flex items-center gap-3">
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing your resume...
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      Analyze My Resume
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-zinc-700">
                Your resume will be analyzed against the job description to
                generate your personalized ATS report.
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            FEATURES
        ======================================================= */}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              title: "ATS Score",
              text: "Know your compatibility",
            },
            {
              icon: FileSearch,
              title: "Missing Keywords",
              text: "Find what you're missing",
            },
            {
              icon: Sparkles,
              title: "AI Suggestions",
              text: "Get actionable improvements",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-white/[0.035]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-500 transition group-hover:text-violet-400">
                <Icon size={16} />
              </div>

              <div>
                <p className="text-xs font-medium text-zinc-300">{title}</p>

                <p className="mt-0.5 text-[10px] text-zinc-700">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* =======================================================
            FOOTNOTE
        ======================================================= */}

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-zinc-700">
          <FileSearch size={12} />
          Resume Intelligence powered by Interprep AI
        </div>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-white/5 bg-[#07070a] py-6">
        <div className="mx-auto flex w-[92%] max-w-[1200px] items-center justify-center">
          <p className="text-center text-xs text-zinc-700">
            © 2026 Interprep · Crafted by{" "}
            <span className="font-medium text-zinc-400">
              Gaurav Singh Bisht
            </span>{" "}
            · All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

/* =============================================================
   STEP INDICATOR
============================================================= */

function StepIndicator({ active, number, label }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
          active
            ? "bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20"
            : "border border-white/10 bg-white/[0.03] text-zinc-600"
        }`}
      >
        {active ? <Check size={17} /> : number}
      </div>

      <div className="hidden sm:block">
        <p
          className={`text-[10px] font-medium uppercase tracking-wider ${
            active ? "text-violet-400" : "text-zinc-700"
          }`}
        >
          Step {number}
        </p>

        <p className="text-xs font-medium text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

/* =============================================================
   MINI BADGE
============================================================= */

function MiniBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] text-zinc-600">
      <span className="text-violet-400">{icon}</span>

      {text}
    </div>
  );
}

export default ATSResumeCheck;
