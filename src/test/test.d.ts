// src/test/test.d.ts

// Import necessary modules
import request from 'supertest'; // Import supertest as usual
import { app } from '../index'; // Import app (adjust the path if needed)

// Declare the types (no need to use `declare` here since we're importing them)
export {}; // Ensure the file is treated as a module

// Optionally, you can define types for `app` if it's not already correctly inferred
// If you're using Express, you could define the type as Express.Application
// This is only necessary if the app type isn't already inferred correctly by TypeScript
// import { Application } from 'express';
// declare const app: Application; // Uncomment if needed
