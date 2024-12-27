// src/test/service.test.d.ts

// Import necessary modules or mock data (adjust the path as needed)
import { createService, getServices } from 'src/services/service'; // Example path, replace it as needed

// Define mock service with more specific typing
declare const mockService: {
  name: string;
  description: string;
};

// Define function signatures for createService and getServices
declare const createService: (...args: unknown[]) => unknown; // Replace 'unknown' with more specific types if needed
declare const getServices: () => unknown[]; // Replace 'unknown[]' with the actual return type if known
