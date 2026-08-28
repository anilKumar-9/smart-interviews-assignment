import { apiRequest } from './api';

export const taskService = {
  // Fetch tasks with filters, search, sort, and pagination
  getTasks: async (params = {}) => {
    const query = new URLSearchParams();
    
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.priority && params.priority !== 'All') query.append('priority', params.priority);
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.sort) query.append('sort', params.sort);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await apiRequest(`/tasks${queryString}`, { method: 'GET' });
    return res;
  },

  // Get single task by ID
  getTaskById: async (id) => {
    const res = await apiRequest(`/tasks/${id}`, { method: 'GET' });
    return res.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const res = await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return res.data;
  },

  // Update existing task
  updateTask: async (id, taskData) => {
    const res = await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return res.data;
  },

  // Fast patch for status change / completion toggle
  updateTaskStatus: async (id, status) => {
    const res = await apiRequest(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const res = await apiRequest(`/tasks/${id}`, { method: 'DELETE' });
    return res.data;
  },
};
