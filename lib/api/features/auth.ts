import { setAccessToken } from "@/lib/auth/token-store";
import { baseApi, BaseApi } from "../base-api";

export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            created_at: string;
        };
    };
};

function createAuthApi(api: BaseApi = baseApi) {
    return {
        login: async (payload: any) => {
            const response = await api.post<LoginResponse>("/auth/login", payload);

            if (response.data.data.token) {
                setAccessToken(response.data.data.token);
            }

            return response.data;
        },
        createAccount: async (payload: any) => {
            const response = await api.post<LoginResponse>("/auth/register", payload);

            if (response.data.data.token) {
                setAccessToken(response.data.data.token);
            }

            return response.data;
        },
        me: async () => {
            const response = await api.get("/auth/profile");
            return response.data;
        }
    };
}

export const authApi = createAuthApi();
