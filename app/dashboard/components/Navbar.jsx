"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Menu, UserRound, LogOut } from "lucide-react";

import { useLogout } from "@/app/hooks/useLogout";

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsProfileMenuOpen(false);
        router.push("/login");
      },
      onError: (err) => {
        console.error("Logout failed:", err);
      },
    });
  };

  const navItems = [
    {
      label: "Analyse Resume",
      href: "/dashboard/analyse-resume",
    },
    {
      label: "Interview Prep",
      href: "/dashboard/interview-prep",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Interprep
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={isProfileMenuOpen}
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pr-3 transition hover:border-violet-400/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-semibold text-white">
              G
            </div>
            <Menu size={19} className="text-zinc-400" />
          </button>

          {isProfileMenuOpen && (
            <>
              <button
                type="button"
                aria-label="Close profile menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsProfileMenuOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#15151f] p-2 shadow-2xl shadow-black/40">
                <div className="border-b border-white/[0.08] px-3 py-3">
                  <p className="text-sm font-medium text-white">Your Account</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Manage your account
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    router.push("/profile");
                  }}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <UserRound size={17} />
                  Profile
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut size={17} />
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
