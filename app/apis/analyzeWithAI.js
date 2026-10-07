export async function analyzeWithAI(resume, jobDescription) {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  const response = await fetch("http://localhost:3001/api/analyse", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || "AI API request failed");
  }

  const data = await response.json();

  return data;
}
