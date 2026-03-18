import { baseApi, BaseApi } from "../base-api";

export type ApplicationStatus = 'submitted' | 'pending' | 'selected' | 'rejected';

export interface Application {
    id: number;
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
    status: ApplicationStatus;
    created_at: string;
    job_id: number;
    user_id: number;
    job?: { title: string; company: string }; // Useful for "My Applications" list
}

export interface AppResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

function createApplicationApi(api: BaseApi = baseApi) {
    return {
        // User Routes
        apply: async (payload: { job_id: number; name: string; email: string; resume_link: string; cover_note?: string }) => {
            const response = await api.post<AppResponse<Application>>("/application", payload);
            return response.data;
        },
        getMyApplications: async () => {
            const response = await api.get<AppResponse<Application[]>>("/application/user/my-applications");
            return response.data;
        },
        withdraw: async (id: number) => {
            const response = await api.delete<AppResponse<null>>(`/application/${id}`);
            return response.data;
        },

        // Admin/Creator Routes
        getAll: async () => {
            const response = await api.get<AppResponse<Application[]>>("/application");
            return response.data;
        },
        getById: async (id: number) => {
            const response = await api.get<AppResponse<Application>>(`/application/${id}`);
            return response.data;
        },
        getJobApplications: async (jobId: number) => {
            const response = await api.get<AppResponse<Application[]>>(`/application/job/${jobId}/applications`);
            return response.data;
        },
        updateStatus: async (id: number, status: ApplicationStatus) => {
            const response = await api.patch<AppResponse<Application>>(`/application/${id}/status`, { status });
            return response.data;
        },
    };
}

export const applicationApi = createApplicationApi();