import { APIRequestContext, expect } from '@playwright/test';

/**
 * Base API Client - Provides common HTTP methods and error handling
 * All API clients should extend this class
 */
export class BaseApiClient {
  protected apiContext: APIRequestContext;
  protected baseUrl: string;

  constructor(apiContext: APIRequestContext, baseUrl: string) {
    this.apiContext = apiContext;
    this.baseUrl = baseUrl;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await this.apiContext.get(url, options);
      this.validateResponse(response.status());
      return await response.json();
    } catch (error) {
      throw new Error(`GET request failed for ${url}: ${error}`);
    }
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, options?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await this.apiContext.post(url, {
        data,
        ...options,
      });
      this.validateResponse(response.status());
      return await response.json();
    } catch (error) {
      throw new Error(`POST request failed for ${url}: ${error}`);
    }
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, options?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await this.apiContext.put(url, {
        data,
        ...options,
      });
      this.validateResponse(response.status());
      return await response.json();
    } catch (error) {
      throw new Error(`PUT request failed for ${url}: ${error}`);
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await this.apiContext.delete(url, options);
      this.validateResponse(response.status());
      return await response.json().catch(() => ({}));
    } catch (error) {
      throw new Error(`DELETE request failed for ${url}: ${error}`);
    }
  }

  /**
   * Validate HTTP response status
   */
  protected validateResponse(status: number): void {
    if (status < 200 || status >= 300) {
      throw new Error(`HTTP Error: ${status}`);
    }
  }
}
