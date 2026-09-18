import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseHeaders: Record<string, string>;

  constructor(request: APIRequestContext, authToken?: string) {
    this.request = request;
    this.baseHeaders = {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };
  }

  async get(endpoint: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(endpoint, {
      headers: this.baseHeaders,
      params,
    });
  }

  async post(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.post(endpoint, {
      headers: this.baseHeaders,
      data,
    });
  }

  async put(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.put(endpoint, {
      headers: this.baseHeaders,
      data,
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: this.baseHeaders,
    });
  }
}