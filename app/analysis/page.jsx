"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import ResumeAnalysisDashboard from "../ats-check/components/ResumeAnalysisDashboard";

export default function AnalysisPage() {
  const router = useRouter();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnalysis = sessionStorage.getItem("interprep_analysis");

    if (!storedAnalysis) {
      router.replace("/analyze");
      return;
    }

    try {
      const parsedAnalysis = JSON.parse(storedAnalysis);

      console.log("Analysis loaded:", parsedAnalysis);

      setAnalysis(parsedAnalysis);
    } catch (error) {
      console.error("Failed to parse analysis:", error);

      sessionStorage.removeItem("interprep_analysis");

      router.replace("/analyze");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070711] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Loader2 size={24} className="animate-spin text-violet-400" />
          </div>

          <p className="text-sm text-slate-400">Preparing your analysis...</p>
        </div>
      </main>
    );
  }

  if (!analysis) {
    return null;
  }

  return <ResumeAnalysisDashboard analysis={analysis} />;
}
