"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import necessary functions
const { createService, getServices } = require('../controllers/serviceController'); // Adjusted to the correct path
// Mock data
const mockService = {
    name: 'Test Service',
    description: 'Description for test service'
};
describe('Service Functions', () => {
    // Test for creating a service
    test('should create a new service', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming createService function returns the created service with an id
        const result = yield createService(mockService);
        // Check if the result contains the expected properties
        expect(result).toHaveProperty('id'); // Check if the service has an ID
        expect(result.name).toBe(mockService.name); // Check name
        expect(result.description).toBe(mockService.description); // Check description
    }));
    // Test for retrieving all services
    test('should retrieve all services', () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming getServices returns an array of services
        const result = yield getServices();
        // Ensure that the result is an array
        expect(Array.isArray(result)).toBe(true); // Check if the result is an array
        expect(result.length).toBeGreaterThan(0); // Ensure at least one service exists
        expect(result[0]).toHaveProperty('name'); // Check if the first service has a name property
    }));
});
