import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'api',
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        handleError(error);
    }
);

export const webService = {
    get: <T = unknown>(url: string) => apiClient.get<T>(url),
    post: <T = unknown>(url: string, data: unknown) => apiClient.post<T>(url, data),
    put: <T = unknown>(url: string, data: unknown) => apiClient.put<T>(url, data),
    delete: <T = unknown>(url: string) => apiClient.delete<T>(url),
};

// Generic error handler
const handleError = (error: AxiosError) => {
    if (error.response) {
        console.error(`HTTP Error: ${error.response.status} - ${error.response.statusText}`);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up request:', error.message);
    }
};



