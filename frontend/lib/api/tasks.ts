import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Add token to all requests
axios.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  byCategory: Array<{ _id: string; count: number }>;
}

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  createTask: async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },

  getStats: async (): Promise<TaskStats> => {
    try {
      const response = await axios.get(`${API_URL}/tasks/stats`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
};
