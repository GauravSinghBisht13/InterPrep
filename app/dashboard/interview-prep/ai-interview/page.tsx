"use client";

import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  FileUp,
  Search,
  Sparkles,
  Target,
  Upload,
  X,
} from "lucide-react";

const ROLES = [
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "Node.js Developer",
  "Software Engineer",
  "Software Development Engineer (SDE)",
  "Java Developer",
  "Python Developer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Other",
];

const EXPERIENCE_LEVELS = [
  { label: "Fresher", description: "Just starting out" },
  { label: "0–2 years", description: "Early career" },
  { label: "2–5 years", description: "Mid-level" },
  { label: "5+ years", description: "Experienced" },
];

const INTERVIEW_TYPES = [
  { label: "Technical", description: "Core concepts" },
  { label: "Coding / DSA", description: "Problems & algorithms" },
  { label: "Behavioral / HR", description: "Experience & teamwork" },
  { label: "System Design", description: "Architecture & scalability" },
  { label: "Project Discussion", description: "Projects & decisions" },
];

const DURATIONS = [
  { label: "15 min", value: 15, description: "Quick practice" },
  { label: "30 min", value: 30, description: "Short session" },
  { label: "45 min", value: 45, description: "Standard session" },
  { label: "1 hour", value: 60, description: "Deep practice" },
  { label: "90 min", value: 90, description: "Full simulation" },
];

const DIFFICULTIES = [
  { label: "Beginner", description: "Build your fundamentals" },
  { label: "Intermediate", description: "Real-world questions" },
  { label: "Advanced", description: "Challenging questions" },
  { label: "Adaptive", description: "Adjusts to your answers" },
];

export type InterviewSetupData = {
  role: string;
  experienceLevel: string;
  interviewTypes: string[];
  durationMinutes: number;
  difficulty: string;
  resume: File;
  jobDescription: string;
};

type InterviewSetupFormProps = {
  onSubmit?: (data: InterviewSetupData) => void | Promise<void>;
};

export default function InterviewSetupForm({
  onSubmit,
}: InterviewSetupFormProps) {
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [experience, setExperience] = useState("0–2 years");
  const [interviewTypes, setInterviewTypes] = useState<string[]>(["Technical"]);
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState("Adaptive");
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [difficultyOpen, setDifficultyOpen] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeError, setResumeError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredRoles = useMemo(() => {
    const query = roleSearch.trim().toLowerCase();

    if (!query) return ROLES;

    return ROLES.filter((item) => item.toLowerCase().includes(query));
  }, [roleSearch]);

  const toggleInterviewType = (type: string) => {
    setInterviewTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );

    setErrors((current) => ({
      ...current,
      interviewTypes: "",
    }));
  };

  const selectRole = (selectedRole: string) => {
    setRole(selectedRole);
    setRoleSearch(selectedRole);
    setRoleDropdownOpen(false);

    setErrors((current) => ({
      ...current,
      role: "",
    }));
  };

  const handleResumeChange = (file?: File) => {
    setResumeError("");
    setErrors((current) => ({ ...current, resume: "" }));

    if (!file) return;

    if (file.type !== "application/pdf") {
      setResumeError("Please upload your resume as a PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError("Your resume must be 5 MB or smaller.");
      return;
    }

    if (file.size === 0) {
      setResumeError("The selected PDF is empty.");
      return;
    }

    setResume(file);
    setSuccessMessage("");
    setSubmitError("");
  };

  const removeResume = () => {
    setResume(null);
    setResumeError("");

    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!role.trim()) {
      nextErrors.role = "Please select your target role.";
    }

    if (interviewTypes.length === 0) {
      nextErrors.interviewTypes = "Select at least one interview type.";
    }

    if (!resume) {
      nextErrors.resume = "Your resume is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    if (!resume) return;

    if (!onSubmit) {
      setSubmitError(
        "The form is ready, but interview creation has not been connected to your backend yet.",
      );
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        role,
        experienceLevel: experience,
        interviewTypes,
        durationMinutes: duration,
        difficulty,
        resume,
        jobDescription: jobDescription.trim(),
      });

      setSuccessMessage("Your interview setup was submitted.");
    } catch {
      setSubmitError("We couldn't start your interview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0d12] px-4 py-10 text-white sm:px-6 sm:py-14">
      {/* Background effects */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-[600px] h-72 w-72 rounded-full bg-blue-600/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-10 text-center sm:mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-2 text-sm text-violet-300">
            <Sparkles size={15} />
            Your personalized AI interview
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Let's set up your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              interview.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Tell us what you're preparing for. We'll tailor the interview to
            your experience, goals and target role.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            {/* 01 — Target role */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Target size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium tracking-widest text-violet-400">
                    STEP 01
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">
                    What role are you targeting?
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Search for a role or enter your own.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="text"
                    value={roleSearch}
                    onChange={(event) => {
                      setRoleSearch(event.target.value);
                      setRole("");
                      setRoleDropdownOpen(true);
                      setErrors((current) => ({
                        ...current,
                        role: "",
                      }));
                    }}
                    onFocus={() => setRoleDropdownOpen(true)}
                    onBlur={() => {
                      window.setTimeout(() => setRoleDropdownOpen(false), 150);
                    }}
                    placeholder="e.g. Frontend Developer"
                    autoComplete="off"
                    aria-label="Search target role"
                    aria-expanded={roleDropdownOpen}
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d12] py-3.5 pl-11 pr-11 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                  />

                  <ChevronDown
                    size={17}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition ${
                      roleDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {roleDropdownOpen && (
                  <div className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#17171f] p-1.5 shadow-2xl">
                    {filteredRoles.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectRole(item)}
                        className={`flex w-full items-center justify-between rounded-lg px-3.5 py-3 text-left text-sm transition hover:bg-violet-500/10 ${
                          role === item
                            ? "bg-violet-500/10 text-violet-300"
                            : "text-zinc-300"
                        }`}
                      >
                        {item}
                        {role === item && <Check size={16} />}
                      </button>
                    ))}

                    {filteredRoles.length === 0 && (
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectRole(roleSearch.trim())}
                        disabled={!roleSearch.trim()}
                        className="w-full rounded-lg px-3.5 py-3 text-left text-sm text-violet-300 hover:bg-violet-500/10 disabled:opacity-40"
                      >
                        Use "{roleSearch.trim()}" as a custom role
                      </button>
                    )}
                  </div>
                )}
              </div>

              {role && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/[0.07] px-3 py-2 text-sm text-violet-300">
                  <BriefcaseBusiness size={15} />
                  {role}
                  <button
                    type="button"
                    onClick={() => {
                      setRole("");
                      setRoleSearch("");
                    }}
                    aria-label="Clear selected role"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {errors.role && (
                <p className="mt-2 text-sm text-red-400">{errors.role}</p>
              )}
            </section>

            {/* 02 — Experience */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs font-medium tracking-widest text-violet-400">
                  STEP 02
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  What's your experience level?
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Choose one option that best describes you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {EXPERIENCE_LEVELS.map((item) => {
                  const selected = experience === item.label;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setExperience(item.label)}
                      aria-pressed={selected}
                      className={`relative rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-violet-500/60 bg-violet-500/[0.10]"
                          : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                          <Check size={12} />
                        </span>
                      )}

                      <span
                        className={`block text-sm font-semibold ${
                          selected ? "text-violet-300" : "text-zinc-200"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="mt-2 block text-xs text-zinc-500">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 03 — Interview type */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs font-medium tracking-widest text-violet-400">
                  STEP 03
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  What do you want to practice?
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Select one or more interview types.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {INTERVIEW_TYPES.map((item) => {
                  const selected = interviewTypes.includes(item.label);

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleInterviewType(item.label)}
                      aria-pressed={selected}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-violet-500/50 bg-violet-500/[0.08]"
                          : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          selected
                            ? "border-violet-500 bg-violet-500 text-white"
                            : "border-zinc-600"
                        }`}
                      >
                        {selected && <Check size={13} />}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-zinc-200">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-500">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {errors.interviewTypes && (
                <p className="mt-3 text-sm text-red-400">
                  {errors.interviewTypes}
                </p>
              )}

              <p className="mt-4 text-xs text-zinc-500">
                Selected: {interviewTypes.length}{" "}
                {interviewTypes.length === 1 ? "type" : "types"}
              </p>
            </section>

            {/* 04 — Duration and difficulty */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs font-medium tracking-widest text-violet-400">
                  STEP 04
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  Customize your session
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Set the duration and question difficulty.
                </p>
              </div>
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Clock3 size={16} className="text-violet-300" />
                  Interview duration
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {DURATIONS.map((item) => {
                    const selected = duration === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setDuration(item.value)}
                        aria-pressed={selected}
                        className={`rounded-xl border p-3 text-center transition ${
                          selected
                            ? "border-violet-500/60 bg-violet-500/10"
                            : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <span
                          className={`block text-base font-semibold ${
                            selected ? "text-violet-300" : "text-zinc-200"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-500">
                          {item.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="relative mt-2">
                <label className="mb-2 block text-sm font-medium text-white">
                  Difficulty Level
                </label>

                <button
                  type="button"
                  onClick={() => setDifficultyOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#15151d] px-4 py-3 text-left text-sm text-white transition hover:border-violet-500/50 focus:border-violet-500 focus:outline-none"
                >
                  <span>{difficulty || "Select difficulty"}</span>

                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${
                      difficultyOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {difficultyOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#15151d] p-1 shadow-xl shadow-black/30">
                    {["Beginner", "Intermediate", "Advanced", "Adaptive"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setDifficulty(option);
                            setDifficultyOpen(false);
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            difficulty === option
                              ? "bg-violet-500/15 text-violet-300"
                              : "text-gray-300 hover:bg-violet-500/10 hover:text-violet-300"
                          }`}
                        >
                          {option}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* 05 — Mandatory resume upload */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium tracking-widest text-violet-400">
                    STEP 05
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">
                    Upload your resume
                    <span className="ml-2 text-sm text-red-400">*</span>
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Your AI interviewer will use your experience, projects and
                    skills to personalize its questions.
                  </p>
                </div>
              </div>

              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(event) =>
                  handleResumeChange(event.target.files?.[0])
                }
              />

              {resume ? (
                <div className="flex items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-500/[0.07] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {resume.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {(resume.size / (1024 * 1024)).toFixed(2)} MB · PDF
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeResume}
                    aria-label="Remove resume"
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className={`group flex w-full flex-col items-center rounded-xl border border-dashed p-8 text-center transition ${
                    errors.resume || resumeError
                      ? "border-red-500/50 bg-red-500/[0.03]"
                      : "border-white/15 bg-white/[0.015] hover:border-violet-500/50 hover:bg-violet-500/[0.03]"
                  }`}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/15">
                    <Upload size={22} />
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    Click to upload your resume
                  </span>
                  <span className="mt-2 text-xs text-zinc-500">
                    PDF format only · Maximum file size 5 MB
                  </span>
                </button>
              )}

              {(errors.resume || resumeError) && (
                <p className="mt-3 text-sm text-red-400">
                  {resumeError || errors.resume}
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-zinc-500">
                Uploading your resume allows AI to ask relevant questions about
                your actual skills and projects.
              </p>
            </section>

            {/* 06 — Job description */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#121218]/90 p-5 sm:p-7">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-xs font-medium tracking-widest text-violet-400">
                    STEP 06
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">
                    Add the job description
                    <span className="ml-2 text-xs font-normal text-zinc-500">
                      Optional
                    </span>
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Preparing for a specific opening? Paste the job description
                    to make your interview more relevant.
                  </p>
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={6}
                maxLength={15000}
                placeholder="Paste the job description here...

Example:
Required skills: React, TypeScript, Node.js
Responsibilities: Build scalable applications, work with APIs..."
                className="w-full resize-y rounded-xl border border-white/10 bg-[#0d0d12] px-4 py-3.5 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
              />

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-zinc-500">
                  We'll use it to align questions with the role.
                </p>
                <span className="shrink-0 text-xs text-zinc-500">
                  {jobDescription.length.toLocaleString()}/15,000
                </span>
              </div>
            </section>
          </div>

          {/* Submission feedback */}
          {submitError && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm leading-6 text-red-300"
            >
              {submitError}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 text-sm text-emerald-300"
            >
              {successMessage}
            </div>
          )}

          {/* Submit */}
          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.04] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-white">Ready to begin?</p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Your AI interview will be tailored to your selections.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Preparing interview..." : "Start Interview"}
                {!submitting && <ArrowRight size={17} />}
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              <span className="text-red-400">*</span> Resume upload is required.
              Your interview begins after the setup is successfully submitted.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
