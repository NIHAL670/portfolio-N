import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

export const getProjects = (params) => api.get('/api/projects', { params });
export const getProjectBySlug = (slug) => api.get(`/api/projects/${slug}`);
export const createProject = (formData) => api.post('/api/projects', formData);
export const updateProject = (id, formData) => api.put(`/api/projects/${id}`, formData);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);
export const toggleProjectVisibility = (id) => api.patch(`/api/projects/${id}/toggle`);

export const submitInquiry = (data) => api.post('/api/inquiries', data);
export const getInquiries = (params) => api.get('/api/inquiries', { params });
export const updateInquiryStatus = (id, status) => api.patch(`/api/inquiries/${id}/status`, { status });
export const deleteInquiry = (id) => api.delete(`/api/inquiries/${id}`);

export const getBlogPosts = () => api.get('/api/blog');
export const getBlogPostBySlug = (slug) => api.get(`/api/blog/${slug}`);
export const createBlogPost = (data) => api.post('/api/blog', data);
export const updateBlogPost = (id, data) => api.put(`/api/blog/${id}`, data);
export const deleteBlogPost = (id) => api.delete(`/api/blog/${id}`);
export const getAllBlogPosts = () => api.get('/api/blog/all');

export const auditWebsite = (url) => api.post('/api/audit', { url });
export const login = (email, password) => api.post('/auth/login', { email, password });
export const getAuthUser = () => api.get('/auth/me');

export default api;
