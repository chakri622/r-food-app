import { getCurrentUser } from "@/lib/appwrite";
import { User } from "./../type.d";

import * as Sentry from "@sentry/react-native";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  fetchAuthenticatedUser: () => Promise<void>;
  clearUser: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  user: null,
  setUser: (user) => set({ user }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      // Fetch user data from API or other source
      const user = await getCurrentUser();
      if (!user) {
        set({ user: null, isAuthenticated: false });
        return;
      }
      set({ user: user as User, isAuthenticated: true });
    } catch (error) {
      Sentry.captureException(error);
      console.error("Failed to fetch user:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
