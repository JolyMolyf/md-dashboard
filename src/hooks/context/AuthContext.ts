import { createContext } from "react";
import type { LoginCredentials } from "@/api/authApi";

export interface AuthContextType {
    isAuthenticated: boolean;
    name: string;
    email: string;
    id: string;
    login: (credentials: LoginCredentials) => void;
    logout: () => void;
    isLoading: boolean;
    error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
