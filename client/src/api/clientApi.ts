type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

type ResponseDecoder<T> = (value: unknown) => T;

export class ApiError extends Error {
  public readonly status: number | undefined;

  constructor(message: string, status?: number, options?: ErrorOptions) {
    super(message, options);
    this.name = "ApiError";
    this.status = status;
  }
}

function getApiBaseUrl(): URL {
  const configuredUrl =
    import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5001/api" : "");

  if (!configuredUrl) {
    throw new Error("VITE_API_URL must be configured for production.");
  }

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch (error) {
    throw new Error("VITE_API_URL must be an absolute HTTP(S) URL.", { cause: error });
  }

  if (
    (url.protocol !== "http:" && url.protocol !== "https:") ||
    (!import.meta.env.DEV && url.protocol !== "https:") ||
    // Custom Vite environment variables exposed to frontend code must start with VITE_.
    // Example: VITE_API_URL
    // DEV is a built-in Vite variable, so it doesn't need the VITE_ prefix.
    url.username ||
    url.password ||
    url.search ||
    url.hash
    // username/password: https://user:pass@example.com
    // Credentials in URLs are discouraged; use authentication headers instead.
    // search: https://example.com/api?page=2 (starts with ?)
    // hash: https://example.com/docs#installation (starts with #)
    // These URL properties return non-empty strings when present.
  ) {
    throw new Error(
      "VITE_API_URL must be an absolute HTTP(S) URL without credentials, query, or fragment.",
    );
  }

  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  // Normalize pathname to end with exactly one trailing slash.
  return url;
}

function getErrorMessage(data: unknown): string | undefined {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  return undefined;
}

const apiClient = async <T>(
  path: string,
  decode: ResponseDecoder<T>,
  options: RequestOptions = {},
): Promise<T> => {
  const url = new URL(path.replace(/^\/+/, ""), getApiBaseUrl());
  const headers = new Headers(options.headers);

  headers.set("Accept", headers.get("Accept") ?? "application/json");

  if (!headers.has("Authorization")) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const body = options.body === undefined ? undefined : JSON.stringify(options.body);
  if (body !== undefined) {
    headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      method: options.method ?? (body === undefined ? "GET" : "POST"),
      headers,
      body,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(
      "Unable to connect to the server. Check your connection and try again.",
      undefined,
      { cause: error },
    );
  }

  const responseText = await response.text();
  let payload: unknown;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch (error) {
      if (response.ok) {
        throw new ApiError("The server returned an invalid JSON response.", response.status, {
          cause: error,
        });
      }
    }
  }

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload) ?? `Request failed (${response.status})`,
      response.status,
    );
  }

  try {
    return decode(payload);
  } catch (error) {
    throw new ApiError("The server returned data in an unexpected format.", response.status, {
      cause: error,
    });
  }
};

export default apiClient;
