import { useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "../hooks/mutations";

/**
 * Convenience hook for common auth operations
 */
export const useAuth = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogoutMutation();

  return {
    user,
    isAuthenticated,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
};
