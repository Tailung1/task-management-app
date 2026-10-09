type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Request failed");
  }

  return data as T;
};
