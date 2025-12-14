import { useState, useMemo, useCallback } from "react"; 
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useMutation } from "@tanstack/react-query";
import { loginUser, type AuthResponse } from "@/api/authApi";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthResponse | null>(null);

    const { mutate: login, isPending: isLoading, error } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setIsAuthenticated(true);
            setUser(data);
        },
        onError: (err) => {
            console.error("Login failed", err);
            setIsAuthenticated(false);
            setUser(null);
        }
    });

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        isAuthenticated,
        name: user?.username ?? "",
        email: user?.email ?? "",
        id: user?.id ?? "",
        login,
        logout,
        isLoading,
        error
    }), [isAuthenticated, user, login, logout, isLoading, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
