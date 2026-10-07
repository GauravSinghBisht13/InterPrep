"use client";

import { useMutation } from "@tanstack/react-query";
import { analyzeWithAI } from "../apis/analyzeWithAI";

export function useAnalyseResume() {
  return useMutation({
    mutationFn: ({ resume, jobDescription }) =>
      analyzeWithAI(resume, jobDescription),
  });
}
