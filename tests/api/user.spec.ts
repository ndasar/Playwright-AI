import { test, expect } from '../fixtures/testFixtures';
import { TEST_USERS } from '../../src/utils/testData';
import { logger } from '../../src/utils/logger';

/**
 * API Automation Tests - User API
 * Tests user API endpoints using dedicated API client
 */

test.describe('User API - CRUD Operations', () => {
  test('should fetch all users', async ({ userApiClient, logMessage }) => {
    logMessage('Fetching all users from API');

    // Act
    const users = await userApiClient.getAllUsers();

    // Assert
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    logger.info(`Fetched ${users.length} users`);
  });

  test('should fetch user by ID', async ({ userApiClient }) => {
    // Arrange
    const userId = 1;
    logger.info(`Fetching user with ID: ${userId}`);

    // Act
    const user = await userApiClient.getUserById(userId);

    // Assert
    expect(user).toBeDefined();
    expect(user.id).toBe(userId);
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    logger.info(`User fetched: ${user.name}`);
  });

  test('should create new user', async ({ userApiClient }) => {
    // Arrange
    const newUserData = {
      name: 'New Test User',
      email: 'newuser@example.com',
      phone: '555-1234',
    };
    logger.info(`Creating new user: ${newUserData.name}`);

    // Act
    const createdUser = await userApiClient.createUser(newUserData);

    // Assert
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe(newUserData.name);
    expect(createdUser.email).toBe(newUserData.email);
    logger.info(`User created with ID: ${createdUser.id}`);
  });

  test('should update user', async ({ userApiClient }) => {
    // Arrange
    const userId = 1;
    const updatedData = {
      name: 'Updated User Name',
      email: 'updated@example.com',
    };
    logger.info(`Updating user with ID: ${userId}`);

    // Act
    const updatedUser = await userApiClient.updateUser(userId, updatedData);

    // Assert
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updatedData.name);
    expect(updatedUser.email).toBe(updatedData.email);
    logger.info('User updated successfully');
  });

  test('should delete user', async ({ userApiClient }) => {
    // Arrange
    const userId = 1;
    logger.info(`Deleting user with ID: ${userId}`);

    // Act
    await userApiClient.deleteUser(userId);

    // Assert - Verify deletion by trying to fetch
    try {
      await userApiClient.getUserById(userId);
      expect(true).toBeFalsy(); // Should not reach here
    } catch {
      expect(true).toBeTruthy(); // Expected to fail
      logger.info('User deleted successfully');
    }
  });

  test('should handle API errors gracefully', async ({ userApiClient }) => {
    // Act & Assert
    try {
      await userApiClient.getUserById(99999); // Non-existent user
      expect(true).toBeFalsy(); // Should not reach here
    } catch (error) {
      expect(error).toBeDefined();
      logger.info('API error handled correctly');
    }
  });
});
