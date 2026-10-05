"use client";

import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO:
    // Connect your login API here
    console.log({
      email,
      password,
    });
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute right-[-150px] top-[40%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
      </div>

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10 lg:px-8">
        <div className="grid w-full max-w-5xl items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:block">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
                <Sparkles size={19} />
              </div>

              <span className="text-xl font-semibold tracking-tight">
                Interprep
              </span>
            </div>

            {/* Heading */}
            <div className="mt-16">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
                Welcome back
              </p>

              <h1 className="max-w-xl text-5xl font-semibold leading-[1.1] tracking-tight">
                Your next opportunity
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  starts with preparation.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-zinc-400">
                Sign in to analyze your resume, discover skill gaps, match your
                profile with job requirements, and prepare for your next
                interview with AI.
              </p>
            </div>

            {/* Mini Features */}
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <MiniFeature
                title="ATS Analysis"
                description="Know your resume score"
              />

              <MiniFeature
                title="JD Matching"
                description="Find missing keywords"
              />

              <MiniFeature
                title="Skill Gaps"
                description="Know what to improve"
              />

              <MiniFeature
                title="AI Interviews"
                description="Practice your answers"
              />
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md justify-self-center lg:justify-self-end">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                <Sparkles size={17} />
              </div>

              <span className="text-xl font-semibold">Interprep</span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
              {/* Card Header */}
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <LockKeyhole size={19} className="text-violet-400" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Sign in to continue your career preparation.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition group-focus-within:text-violet-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-violet-500/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs text-violet-400 transition hover:text-violet-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="group relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition group-focus-within:text-violet-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-11 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-violet-500/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-zinc-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:shadow-violet-500/30 active:scale-[0.99]"
                >
                  Sign in
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-zinc-600">New to Interprep?</span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Signup */}
              <button
                type="button"
                onClick={() => {
                  // TODO:
                  // router.push("/signup")
                  redirect("/signup");
                }}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                Create an account
              </button>

              {/* Privacy */}
              <p className="mt-6 text-center text-[11px] leading-5 text-zinc-600">
                By continuing, you agree to Interprep's{" "}
                <span className="text-zinc-500 hover:text-zinc-300">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-zinc-500 hover:text-zinc-300">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* Bottom Text */}
            <p className="mt-6 text-center text-xs text-zinc-600">
              Your career. Your preparation. Your next opportunity.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* Mini Feature */
/* -------------------------------- */

function MiniFeature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-500/20 hover:bg-white/[0.04]">
      <p className="text-sm font-medium text-zinc-300">{title}</p>

      <p className="mt-1 text-xs text-zinc-600">{description}</p>
    </div>
  );
}
