import { config } from "./config";
export interface IResponse<T> {
  errorMessage?: string;
  data?: T | null;
}

interface IErrorResponse {
	message: string;
}

export const action = async <T>(
  url: string,
  init?: RequestInit,
  overrideBaseURL?: boolean
): Promise<IResponse<T>> => {
  try {
    const urlBase = overrideBaseURL ? url : `${config.baseURL}/${url}`;

    const response: Response = await fetch(urlBase, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

		if (!response.ok) {
			const responseData: IErrorResponse = await response.json();
			return {
				errorMessage: responseData.message,
			};
		}

		const responseData: T = await response.json();

    return {
      data: responseData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        data: null,
        errorMessage: error.message,
      };
    }

    return {
      errorMessage: "Internal server error",
    };
  }
};

async function get<T>(
  url: string,
  init?: RequestInit,
  overrideBaseURL?: boolean
): Promise<IResponse<T>> {
  return await action<T>(url, { ...init, method: "GET" }, overrideBaseURL);
}

async function post<T>(
  url: string,
  init?: RequestInit,
  overrideBaseURL?: boolean
): Promise<IResponse<T>> {
  return await action<T>(url, { ...init, method: "POST" }, overrideBaseURL);
}

async function put<T>(
  url: string,
  init?: RequestInit,
  overrideBaseURL?: boolean
): Promise<IResponse<T>> {
  return await action<T>(url, { ...init, method: "PUT" }, overrideBaseURL);
}

async function del<T>(
  url: string,
  init?: RequestInit,
  overrideBaseURL?: boolean
): Promise<IResponse<T>> {
  return await action<T>(url, { ...init, method: "DELETE" }, overrideBaseURL);
}

export const api = {
  get,
  post,
  put,
  del,
};
