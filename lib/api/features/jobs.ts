import { baseApi, BaseApi } from "../base-api";

export type Category =
    | 'engineering' | 'design' | 'marketing' | 'sales'
    | 'finance' | 'hr' | 'operations' | 'product'
    | 'customer_support' | 'other';

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    category: Category;
    description: string;
    created_at: string;
    created_by: number;
    applications_count: number;
}

export interface JobResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

function createJobsApi(api: BaseApi = baseApi) {
    return {
        getAll: async (params?: { page?: number; search?: string; location?: string; category?: string }) => {
            const response = await api.get<JobResponse<Job[]>>("/job", { params });
            return response.data;
        },
        getById: async (id: number) => {
            const response = await api.get<JobResponse<Job>>(`/job/${id}`);
            return response.data;
        },
        getMyJobs: async () => {
            const response = await api.get<JobResponse<Job[]>>("/job/user/my-jobs");
            return response.data;
        },
        create: async (payload: Omit<Job, "id" | "created_at" | "created_by" | "applications_count">) => {
            const response = await api.post<JobResponse<Job>>("/job", payload);
            return response.data;
        },
        update: async (id: number, payload: Partial<Job>) => {
            const response = await api.put<JobResponse<Job>>(`/job/${id}`, payload);
            return response.data;
        },
        delete: async (id: number) => {
            const response = await api.delete<JobResponse<null>>(`/job/${id}`);
            return response.data;
        },
    };
}

export const jobsApi = createJobsApi();