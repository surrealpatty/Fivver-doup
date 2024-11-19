// src/types/index.d.ts

// Define types for request objects with custom properties
export interface UserRequest extends Express.Request {
  user: {
    id: number;
    email: string;
    username: string;
    // Add any other user properties you might need
  };
}

// Custom type for handling service creation attributes
export interface ServiceCreationAttributes {
  name: string;
  description: string;
  price: number;
  // Add other service-related fields as needed
}

// Custom type for representing the user object in the database or wherever needed
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  // Add additional fields if necessary, like roles or status
}

// Custom type for service object
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  // Add any other fields related to the service
}

// Custom type for review object
export interface Review {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment?: string;
  // Other fields related to reviews
}

// Type for the response returned by the API when creating an entity
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

// Example of a custom error type
export interface ApiError {
  status: 'error';
  message: string;
  details?: string;
}
