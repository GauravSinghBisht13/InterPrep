"use client";

import {
  useState,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";

import { useSignup } from "../hooks/useSignup";

type FormData = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  category: string;
  experience: string;
  designation: string;
  expectedSalary: string;
};

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  icon?: ReactNode;
  suffix?: string;
  required?: boolean;
  min?: string;
  step?: string;
};

type PasswordFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
};

type SectionHeadingProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function Signup() {
  const router = useRouter();
  const signupMutation = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    category: "",
    experience: "",
    designation: "",
    expectedSalary: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!formData.category) {
      setError("Please select your candidate type.");
      return;
    }

    const experience =
      formData.experience === "" ? null : Number(formData.experience);

    const expectedSalary =
      formData.expectedSalary === ""
        ? null
        : Math.round(Number(formData.expectedSalary) * 100000);

    if (
      experience !== null &&
      (!Number.isFinite(experience) || experience < 0)
    ) {
      setError("Please enter valid work experience.");
      return;
    }

    if (
      expectedSalary !== null &&
      (!Number.isFinite(expectedSalary) || expectedSalary < 0)
    ) {
      setError("Please enter a valid expected salary.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.mobile.trim(),
      candidateType:
        formData.category === "fresher"
          ? ("Fresher" as const)
          : ("Experienced" as const),
      experience,
      currentRole: formData.designation.trim() || null,
      expectedSalary,
      password: formData.password,
    };

    signupMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/login?registered=true");
      },
      onError: (err: Error) => {
        setError(err.message || "Signup failed. Please try again.");
      },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute right-[-150px] top-[45%] h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[130px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 px-5 py-10 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <Sparkles size={19} />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Interprep
            </span>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
            <Sparkles size={13} />
            Build your career profile
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Create your profile.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Prepare smarter.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Tell us a little about yourself so Interprep can personalize your
            resume analysis, job matching, skill-gap insights, and AI-powered
            interview preparation.
          </p>
        </div>

        {/* Signup form */}
        <div className="mx-auto mt-14 w-full max-w-[80vw]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-10 flex flex-col gap-3 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your career profile</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  This information helps us personalize your experience.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-zinc-500 sm:flex">
                <LockKeyhole size={13} />
                Your information is secure
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-10">
              {/* Basic information */}
              <section>
                <SectionHeading
                  icon={<User size={16} />}
                  title="Basic information"
                  description="Tell us who you are."
                />

                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InputField
                    label="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Gaurav Singh"
                    icon={<User size={17} />}
                    required
                  />

                  <InputField
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    icon={<Mail size={17} />}
                    required
                  />

                  <InputField
                    label="Mobile number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    icon={<Phone size={17} />}
                    required
                  />
                </div>
              </section>

              {/* Professional profile */}
              <section>
                <SectionHeading
                  icon={<BriefcaseBusiness size={16} />}
                  title="Professional profile"
                  description="Help us understand your career stage."
                />

                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Candidate type
                    </label>

                    <div className="relative">
                      <BriefcaseBusiness
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                      />

                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#101014] pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="fresher">Fresher</option>
                        <option value="experienced">Experienced</option>
                      </select>
                    </div>
                  </div>

                  <InputField
                    label="Total experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    suffix="years"
                    min="0"
                    step="0.1"
                    required
                  />

                  <InputField
                    label="Current role / designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    icon={<BriefcaseBusiness size={17} />}
                    required
                  />

                  <InputField
                    label="Expected salary"
                    name="expectedSalary"
                    type="number"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    suffix="LPA"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </section>

              {/* Account security */}
              <section>
                <SectionHeading
                  icon={<LockKeyhole size={16} />}
                  title="Account security"
                  description="Create a secure password for your account."
                />

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <PasswordField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    placeholder="Create a password"
                  />

                  <PasswordField
                    label="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                    placeholder="Repeat your password"
                  />
                </div>

                {formData.confirmPassword && (
                  <div
                    className={`mt-4 flex items-center gap-2 text-xs ${
                      formData.password === formData.confirmPassword
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {formData.password === formData.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}
              </section>

              {/* API error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="border-t border-white/10 pt-8">
                <button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="group mx-auto flex min-h-13 w-full max-w-md items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:shadow-violet-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {signupMutation.isPending
                    ? "Creating account..."
                    : "Create my Interprep account"}

                  {!signupMutation.isPending && (
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  )}
                </button>

                <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
                  By creating an account, you agree to Interprep&apos;s{" "}
                  <span className="text-zinc-500">Terms of Service</span> and{" "}
                  <span className="text-zinc-500">Privacy Policy</span>.
                </p>
              </div>
            </form>
          </div>

          {/* Login */}
          <div className="py-8 text-center">
            <p className="text-sm text-zinc-500">Already have an account?</p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Sign in to Interprep
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Section heading */
function SectionHeading({ icon, title, description }: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div>
        <h3 className="text-base font-medium text-zinc-200">{title}</h3>
        <p className="mt-1 text-xs text-zinc-600">{description}</p>
      </div>
    </div>
  );
}

/* Reusable input */
function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  suffix,
  required = false,
  min,
  step,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <div className="group relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition group-focus-within:text-violet-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          className={`h-12 w-full rounded-xl border border-white/10 bg-black/20 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-violet-500/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/10 ${
            icon ? "pl-11" : "pl-4"
          } ${suffix ? "pr-14" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* Reusable password input */
function PasswordField({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <div className="group relative">
        <LockKeyhole
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition group-focus-within:text-violet-400"
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          minLength={8}
          className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-11 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-violet-500/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-violet-500/10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-zinc-300"
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}
