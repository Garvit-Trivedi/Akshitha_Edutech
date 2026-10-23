/**
 * Frontend API client for interacting with the Express backend service.
 * Includes credentials for secure HTTP-only cookie authentication.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  public statusCode: number;
  public errors?: Record<string, string>;

  constructor(message: string, statusCode: number, errors?: Record<string, string>) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  bodyData?: Record<string, any> | FormData;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { bodyData, headers, ...rest } = options;
  const isFormData = bodyData instanceof FormData;

  const config: RequestInit = {
    ...rest,
    credentials: 'include', // Automatically passes HTTP-only cookies
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: isFormData ? bodyData : bodyData ? JSON.stringify(bodyData) : undefined,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.message || `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status, data?.errors);
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      err?.message || 'Unable to connect to the server. Please check your connection.',
      500
    );
  }
}

// Typed API modules
export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient<{ success: boolean; data: { user: any } }>('/auth/login', {
        method: 'POST',
        bodyData: data,
      }),
    register: (data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      role: 'jobseeker' | 'employer';
      terms: boolean;
    }) =>
      apiClient<{ success: boolean; data: { user: any } }>('/auth/register', {
        method: 'POST',
        bodyData: data,
      }),
    logout: () =>
      apiClient<{ success: boolean }>('/auth/logout', {
        method: 'POST',
      }),
    me: () =>
      apiClient<{ success: boolean; data: { user: any } }>('/auth/me', {
        method: 'GET',
      }),
  },
  jobs: {
    list: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.set(key, String(val));
        }
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return apiClient<{ success: boolean; total: number; data: any[] }>(`/jobs${qs}`, {
        method: 'GET',
      });
    },
    get: (id: string) =>
      apiClient<{ success: boolean; data: { job: any; related: any[] } }>(`/jobs/${id}`, {
        method: 'GET',
      }),
    create: (data: Record<string, any>) =>
      apiClient<{ success: boolean; data: { job: any } }>('/jobs', {
        method: 'POST',
        bodyData: data,
      }),
    apply: (jobId: string, formData: FormData) =>
      apiClient<{ success: boolean; message: string }>(`/jobs/${jobId}/applications`, {
        method: 'POST',
        bodyData: formData,
      }),
  },
  companies: {
    list: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val) query.set(key, String(val));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return apiClient<{ success: boolean; data: any[] }>(`/companies${qs}`, {
        method: 'GET',
      });
    },
  },
  counselling: {
    submit: (data: Record<string, any>) =>
      apiClient<{ success: boolean; message: string }>('/counselling-requests', {
        method: 'POST',
        bodyData: data,
      }),
  },
  contact: {
    submit: (data: Record<string, any>) =>
      apiClient<{ success: boolean; message: string }>('/contact', {
        method: 'POST',
        bodyData: data,
      }),
  },
  jobFairs: {
    list: () =>
      apiClient<{ success: boolean; data: any[] }>('/job-fairs', {
        method: 'GET',
      }),
    register: (fairId: string, data: { name: string; email: string; phone: string }) =>
      apiClient<{ success: boolean; data: { registration: any } }>(`/job-fairs/${fairId}/register`, {
        method: 'POST',
        bodyData: data,
      }),
  },
  admin: {
    stats: () =>
      apiClient<{ success: boolean; data: { stats: any } }>('/admin/stats', {
        method: 'GET',
      }),
    users: (role?: string) =>
      apiClient<{ success: boolean; data: any[] }>(`/admin/users${role ? `?role=${role}` : ''}`, {
        method: 'GET',
      }),
    verifyEmployer: (id: string, isVerified: boolean) =>
      apiClient<{ success: boolean; data: { user: any } }>(`/admin/employers/${id}/verify`, {
        method: 'PATCH',
        bodyData: { isVerified },
      }),
    listCounselling: () =>
      apiClient<{ success: boolean; data: any[] }>('/counselling-requests', {
        method: 'GET',
      }),
    updateCounselling: (id: string, status: string) =>
      apiClient<{ success: boolean; data: { request: any } }>(`/counselling-requests/${id}/status`, {
        method: 'PATCH',
        bodyData: { status },
      }),
    listContact: () =>
      apiClient<{ success: boolean; data: any[] }>('/contact', {
        method: 'GET',
      }),
    updateContact: (id: string, status: string) =>
      apiClient<{ success: boolean; data: { message: any } }>(`/contact/${id}/status`, {
        method: 'PATCH',
        bodyData: { status },
      }),
    createJobFair: (data: Record<string, any>) =>
      apiClient<{ success: boolean; data: { fair: any } }>('/job-fairs', {
        method: 'POST',
        bodyData: data,
      }),
    deleteJobFair: (id: string) =>
      apiClient<{ success: boolean }>((`/job-fairs/${id}`), {
        method: 'DELETE',
      }),
    closeJob: (id: string) =>
      apiClient<{ success: boolean }>((`/jobs/${id}`), {
        method: 'DELETE',
      }),
  },
};
