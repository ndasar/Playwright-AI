/**
 * User data model
 * Defines the structure of user objects
 */
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
}

/**
 * User request payload for creating/updating users
 */
export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  website?: string;
}
