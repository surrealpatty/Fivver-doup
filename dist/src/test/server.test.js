"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/test/sample.test.ts
const services_1 = require("../models/services"); // Ensure Service model is imported
describe('Service Creation Tests', () => {
    it('should create a service with required fields', async () => {
        // Add the missing `role` field to serviceData
        const serviceData = {
            id: 'someId', // Replace with an actual ID or logic to generate one
            title: 'Web Development', // Example title
            description: 'Full-stack web development', // Example description
            price: 100, // Example price
            userId: 'someUserId', // Replace with an actual user ID or logic to generate one
            role: 'user' // Add the required `role` field
        };
        // Create the service and expect a successful creation
        const service = await services_1.Service.create(serviceData);
        // Check if the service was created successfully
        expect(service).toHaveProperty('id');
        expect(service.title).toBe(serviceData.title);
        expect(service.role).toBe(serviceData.role); // Verify that the role is correctly set
    });
});
