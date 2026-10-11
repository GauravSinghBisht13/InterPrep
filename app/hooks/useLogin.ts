import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../gateways/login";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
