import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';

/**
 * Axios instance configured to match Flutter's ApiHandler
 * Handles authentication tokens and request/response interceptors
 */
class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor - adds auth token to headers
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem(API_CONFIG.TOKEN_KEY);

                if (token && config.headers) {
                    config.headers['x-auth-token'] = token;
                }

                console.log(`🔑 [API] ${config.method?.toUpperCase()} ${config.url}`, {
                    hasToken: !!token,
                });

                return config;
            },
            (error) => {
                console.error('❌ [API] Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor - handles errors globally
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(`✅ [API] Response from ${response.config.url}:`, response.data);
                return response;
            },
            (error) => {
                if (error.response) {
                    const { status, data } = error.response;

                    console.error(`❌ [API] Error ${status}:`, data);

                    // Handle 401 Unauthorized - token expired
                    if (status === 401) {
                        console.warn('🔒 [API] Unauthorized - clearing token');
                        localStorage.removeItem(API_CONFIG.TOKEN_KEY);
                        // Optionally redirect to login
                        window.location.href = '/login';
                    }

                    // Return error message from backend
                    const message = data?.message || data?.error || 'An error occurred';
                    return Promise.reject(new Error(message));
                } else if (error.request) {
                    console.error('❌ [API] No response received:', error.request);
                    return Promise.reject(new Error('Network error - no response from server'));
                } else {
                    console.error('❌ [API] Request setup error:', error.message);
                    return Promise.reject(error);
                }
            }
        );
    }

    /**
     * GET request
     */
    async get<T = any>(url: string): Promise<T> {
        const response = await this.axiosInstance.get<T>(url);
        return response.data;
    }

    /**
     * POST request
     */
    async post<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }

    /**
     * PUT request
     */
    async put<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    /**
     * PATCH request
     */
    async patch<T = any>(url: string, data?: any): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data);
        return response.data;
    }

    /**
     * DELETE request
     */
    async delete<T = any>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url);
        return response.data;
    }

    /**
     * Upload file with multipart/form-data
     */
    async upload<T = any>(url: string, formData: FormData): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    /**
     * Get the underlying axios instance for advanced usage
     */
    getInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
