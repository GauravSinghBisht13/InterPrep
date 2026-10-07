export async function analyzeResume(resume, jobDescription) {
  const formData = new FormData();
  console.log("data coming ", resume);

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  const response = await fetch("http://localhost:3001/api/analyse", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyse resume");
  }

  return data;
}
