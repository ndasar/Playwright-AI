import { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './baseApiClient';
import { User } from '../models/userModel';

/**
 * User API Client - Handles all user-related API operations
 * Extends BaseApiClient for common HTTP methods
 */
export class UserApiClient extends BaseApiClient {
  private readonly usersEndpoint = '/users';

  constructor(apiContext: APIRequestContext, baseUrl: string) {
    super(apiContext, baseUrl);
  }

  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>(this.usersEndpoint);
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: number): Promise<User> {
    return this.get<User>(`${this.usersEndpoint}/${userId}`);
  }

  /**
   * Create a new user
   */
  async createUser(userData: Partial<User>): Promise<User> {
    return this.post<User>(this.usersEndpoint, userData);
  }

  /**
   * Update user by ID
   */
  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    return this.put<User>(`${this.usersEndpoint}/${userId}`, userData);
  }

  /**
   * Delete user by ID
   */
  async deleteUser(userId: number): Promise<void> {
    await this.delete(`${this.usersEndpoint}/${userId}`);
  }
}
