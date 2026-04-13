type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * A simple fetch method for executing HTTP methods.
 * @param url The endpoint to call
 * @param method The HTTP method
 * @param body Optional payload
 */
export async function execute<T>(
  url: string, 
  method: Method, 
  body?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}