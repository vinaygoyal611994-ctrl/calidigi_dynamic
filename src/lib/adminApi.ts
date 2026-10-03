export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token)
}

export function removeToken() {
  localStorage.removeItem('admin_token')
}

async function request(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(path, { ...options, headers })
  if (res.status === 401) {
    removeToken()
    window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }
  return res
}

export const adminApi = {
  login: (username: string, password: string) =>
    request('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/api/admin/me'),
  getStats: () => request('/api/admin/stats'),

  getContacts: (params = '') => request(`/api/admin/contacts${params}`),
  getContact: (id: number) => request(`/api/admin/contacts/${id}`),
  deleteContact: (id: number) => request(`/api/admin/contacts/${id}`, { method: 'DELETE' }),
  updateContactStatus: (id: number, status: string) =>
    request(`/api/admin/contacts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  getBlogs: (params = '') => request(`/api/admin/blogs${params}`),
  getBlog: (id: number) => request(`/api/admin/blogs/${id}`),
  createBlog: (data: object) => request('/api/admin/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: number, data: object) =>
    request(`/api/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: number) => request(`/api/admin/blogs/${id}`, { method: 'DELETE' }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    request('/api/admin/change-password', { method: 'POST', body: JSON.stringify(data) }),

  getPages: () => request('/api/admin/pages'),
  getPage: (id: number) => request(`/api/admin/pages/${id}`),
  createPage: (data: object) => request('/api/admin/pages', { method: 'POST', body: JSON.stringify(data) }),
  updatePage: (id: number, data: object) => request(`/api/admin/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePage: (id: number) => request(`/api/admin/pages/${id}`, { method: 'DELETE' }),
}
