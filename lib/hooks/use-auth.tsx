"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/features/auth";
import { clearAccessToken } from "@/lib/auth/token-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // 1. Handle mounting to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: response, isLoading, error } = useQuery({
        queryKey: ["auth-me"],
        queryFn: () => authApi.me(),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    const user = response?.data;

    useEffect(() => {
        if (user) {
            localStorage.setItem("user_profile", JSON.stringify(user));
        }
    }, [user]);

    const logout = () => {
        clearAccessToken();
        localStorage.removeItem("user_profile");
        queryClient.clear();
        router.push("/login");
        router.refresh();
    };

    return {
        user,
        // If not mounted, keep isLoading true to prevent flickering/mismatch
        isLoading: isLoading || !mounted,
        isLoggedIn: !!user,
        logout,
    };
}