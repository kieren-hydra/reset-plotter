type ApiClientOptions = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: Record<string, unknown> | null;
    headers?: Record<string, string>;
};
const apiClient = async ({url, method, body = null, headers = {}} : ApiClientOptions) => {
    try {
        const options : RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`/api${url}`, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export const webService = {
    get: (url: string) => apiClient({url, method: 'GET'}),
    post: (url: string, body: Record<string, unknown>) => apiClient({url, method: 'POST', body}),
    put: (url: string, body: Record<string, unknown>) => apiClient({url, method: 'PUT', body}),
    delete: (url: string) => apiClient({url, method: 'DELETE'}),
    patch: (url: string, body: Record<string, unknown>) => apiClient({url, method: 'PATCH', body}),
}




