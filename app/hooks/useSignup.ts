import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../gateways/signup";

export interface SignupPayload {
  name: string;
  email: string;
  phoneNumber: string;
  candidateType: string;
  experience?: number;
  currentRole?: string;
  expectedSalary?: number;
  password: string;
}

async function signupUser(payload: SignupPayload) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}
