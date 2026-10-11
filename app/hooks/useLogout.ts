import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../gateways/logout";

export function useLogout() {
  return useMutation({
    mutationFn: logoutApi,
  });
}
