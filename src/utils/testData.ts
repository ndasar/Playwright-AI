/**
 * Test Data - Contains all mock/test data used across tests
 * Centralized data management for easy maintenance and updates
 */

export const TEST_USERS = {
  validUser: {
    email: 'user@example.com',
    password: 'SecurePassword123!',
    name: 'John Doe',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword',
    name: 'Invalid User',
  },
  testUser: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    website: 'https://example.com',
    company: {
      name: 'Test Company',
    },
  },
};

export const TEST_CREDENTIALS = {
  admin: {
    username: 'admin@example.com',
    password: 'AdminPassword123!',
  },
  user: {
    username: 'user@example.com',
    password: 'UserPassword123!',
  },
};

export const TEST_URLS = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  apiUrl: process.env.API_URL || 'https://api.example.com',
  loginUrl: '/login',
  homeUrl: '/home',
  dashboardUrl: '/dashboard',
};

export const TIMEOUTS = {
  short: 3000,
  medium: 5000,
  long: 10000,
  extraLong: 15000,
};

export const API_ENDPOINTS = {
  users: '/users',
  posts: '/posts',
  comments: '/comments',
  products: '/products',
};
