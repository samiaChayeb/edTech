const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetcher<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error ${res.status}`);
  }

  return res.json();
}

// ── Auth ──
export const authApi = {
  login: (email: string, password: string) =>
    fetcher('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: { email: string; password: string; firstName: string; lastName: string; role?: string }) =>
    fetcher('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  refresh: (refreshToken: string) =>
    fetcher('/api/auth/refresh', { method: 'POST', token: refreshToken }),
  logout: (token: string) =>
    fetcher('/api/auth/logout', { method: 'POST', token }),
  forgotPassword: (email: string) =>
    fetcher('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token: string, password: string) =>
    fetcher('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword: password }) }),
};

// ── Courses ──
export const coursesApi = {
  list: (token?: string) => fetcher('/api/courses', { token }),
  get: (id: string, token?: string) => fetcher(`/api/courses/${id}`, { token }),
  create: (data: any, token: string) =>
    fetcher('/api/courses', { method: 'POST', body: JSON.stringify(data), token }),
  enroll: (courseId: string, token: string) =>
    fetcher(`/api/courses/${courseId}/enroll`, { method: 'POST', token }),
};

// ── Classrooms ──
export const classroomsApi = {
  list: (token: string) => fetcher('/api/classrooms', { token }),
  get: (id: string, token: string) => fetcher(`/api/classrooms/${id}`, { token }),
  create: (data: any, token: string) =>
    fetcher('/api/classrooms', { method: 'POST', body: JSON.stringify(data), token }),
  join: (id: string, token: string) =>
    fetcher(`/api/classrooms/${id}/join`, { method: 'POST', token }),
  messages: (id: string, token: string) => fetcher(`/api/classrooms/${id}/messages`, { token }),
};

// ── Payments ──
export const paymentsApi = {
  pay: (courseId: string, token: string) =>
    fetcher(`/api/payments/course/${courseId}`, { method: 'POST', token }),
  list: (token: string) => fetcher('/api/payments', { token }),
};
