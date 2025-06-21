// User Service - Clean API Layer
import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/users`,
      timeout: 10000,
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  /**
   * Get paginated list of users
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search term
   * @param {string} params.role - Filter by role
   * @param {string} params.status - Filter by status
   * @returns {Promise<Object>} Users data with pagination
   */
  async getUsers(params = {}) {
    try {
      const response = await this.api.get('/', { params });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User data
   */
  async getUserById(userId) {
    try {
      const response = await this.api.get(`/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  }

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    try {
      const response = await this.api.post('/', userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create user');
    }
  }

  /**
   * Update user
   * @param {Object} params - Update parameters
   * @param {string} params.id - User ID
   * @returns {Promise<Object>} Updated user
   */
  async updateUser({ id, ...userData }) {
    try {
      const response = await this.api.put(`/${id}`, userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  }

  /**
   * Delete user
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
      await this.api.delete(`/${userId}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  }

  /**
   * Update user status
   * @param {string} userId - User ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated user
   */
  async updateUserStatus(userId, status) {
    try {
      const response = await this.api.patch(`/${userId}/status`, { status });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user status');
    }
  }

  /**
   * Reset user password
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Reset result
   */
  async resetPassword(userId) {
    try {
      const response = await this.api.post(`/${userId}/reset-password`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password');
    }
  }

  /**
   * Get user roles
   * @returns {Promise<Array>} Available roles
   */
  async getRoles() {
    try {
      const response = await this.api.get('/roles');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch roles');
    }
  }

  /**
   * Get user permissions
   * @param {string} userId - User ID
   * @returns {Promise<Array>} User permissions
   */
  async getUserPermissions(userId) {
    try {
      const response = await this.api.get(`/${userId}/permissions`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user permissions');
    }
  }
}

export const userService = new UserService();

