import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, status, fetchStatus } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
  });

  const isLoading = status === "pending" && fetchStatus === "fetching";
  const isAuthenticated = status === "success" && !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
