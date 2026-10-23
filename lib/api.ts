/**
 * Frontend API client for interacting with the Express backend service.
 * Includes credentials for secure HTTP-only cookie authentication.
 */

function resolveApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'https://akshitha-edutech.onrender.com/api/v1';
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  if (!trimmed.endsWith('/api/v1')) {
    return `${trimmed}/api/v1`;
  }
  return trimmed;
}

export const API_BASE_URL = resolveApiBaseUrl();

const TOKEN_STORAGE_KEY = 'akshitha_auth_token';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors in restricted browser contexts
  }
}

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
  const token = getAuthToken();

  const config: RequestInit = {
    ...rest,
    credentials: 'include', // Passes HTTP-only cookies when supported
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? bodyData : bodyData ? JSON.stringify(bodyData) : undefined,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // If unauthorized, clear invalid token
      if (response.status === 401 && typeof window !== 'undefined') {
        setAuthToken(null);
      }
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
    login: async (data: { email: string; password: string }) => {
      const res = await apiClient<{ success: boolean; data: { user: any; token?: string } }>('/auth/login', {
        method: 'POST',
        bodyData: data,
      });
      if (res?.data?.token) {
        setAuthToken(res.data.token);
      }
      return res;
    },
    register: async (data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      role: 'jobseeker' | 'employer';
      terms: boolean;
    }) => {
      const res = await apiClient<{ success: boolean; data: { user: any; token?: string } }>('/auth/register', {
        method: 'POST',
        bodyData: data,
      });
      if (res?.data?.token) {
        setAuthToken(res.data.token);
      }
      return res;
    },
    logout: async () => {
      try {
        return await apiClient<{ success: boolean }>('/auth/logout', {
          method: 'POST',
        });
      } finally {
        setAuthToken(null);
      }
    },
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
