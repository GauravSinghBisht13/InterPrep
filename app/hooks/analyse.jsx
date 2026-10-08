// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { analyzeWithAI } from "../apis/analyzeWithAI";

// export function useAnalyseResume() {
//   return useMutation({
//     mutationFn: ({ resume, jobDescription }) =>
//       analyzeWithAI(resume, jobDescription),
//   });
// }

"use client";

import { useMutation } from "@tanstack/react-query";
import { analyzeWithAI } from "../apis/analyzeWithAI";

export function useAnalyseResume() {
  return useMutation({
    mutationFn: ({ resume, jobDescription }) =>
      analyzeWithAI(resume, jobDescription),

    onMutate: () => {
      console.log("🔥 MUTATION STARTED");
    },

    onSuccess: () => {
      console.log("✅ MUTATION SUCCESS");
    },

    onError: (error) => {
      console.log("❌ MUTATION ERROR", error);
    },

    onSettled: () => {
      console.log("🏁 MUTATION SETTLED");
    },
  });
}
