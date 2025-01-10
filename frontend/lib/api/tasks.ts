import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Enhanced logging for token and request details
axios.interceptors.request.use((config) => {
  // Try to get token from multiple sources
  const tokenFromCookies = Cookies.get('token');
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = tokenFromCookies || tokenFromLocalStorage;

  console.group('Axios Request Interceptor');
  console.log('API URL:', API_URL);
  console.log('Full Request Config:', {
    method: config.method,
    url: config.url,
    headers: config.headers
  });
  console.log('Token source:', tokenFromCookies ? 'Cookies' : (tokenFromLocalStorage ? 'LocalStorage' : 'None')); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header:', config.headers.Authorization);
  } else {
    console.warn('No authentication token found!');
    // Optionally, redirect to login or handle unauthenticated state
  }
  
  console.groupEnd();
  return config;
}, (error) => {
  console.error('Axios request error:', error);
  return Promise.reject(error);
});

// Enhanced response interceptor for comprehensive error logging
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.group('Axios Response Error');
    console.error('Full Error Object:', error);
    console.error('Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        headers: error.config?.headers
      }
    });
    console.groupEnd();
    return Promise.reject(error);
  }
);

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
  totalStudyTime: number;
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
      console.group('Create Task Request');
      console.log('Task Data:', task);
      
      const response = await axios.post(`${API_URL}/tasks`, task);
      
      console.log('Create Task Response:', response.data);
      console.groupEnd();
      
      return response.data;
    } catch (error: any) {
      console.group('Create Task Error');
      console.error('Full Error:', error);
      
      // More detailed error logging
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
      }
      
      console.groupEnd();
      
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
